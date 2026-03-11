import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'

// GET - List all combos (admin)
export async function GET() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('combos')
    .select('*, combo_items(id, ebook_id)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ combos: data })
}

// POST - Create combo
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin()
  const body = await request.json()

  // Extract ebook_ids and reviews from body
  const { ebook_ids, reviews, ...comboData } = body

  const { data: combo, error } = await supabase
    .from('combos')
    .insert(comboData)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Insert combo_items
  if (ebook_ids && ebook_ids.length > 0 && combo) {
    const comboItems = ebook_ids.map((ebookId: string, index: number) => ({
      combo_id: combo.id,
      ebook_id: ebookId,
      sort_order: index,
    }))

    await supabase.from('combo_items').insert(comboItems)
  }

  // Insert reviews if provided
  if (reviews && reviews.length > 0 && combo) {
    const reviewsToInsert = reviews.map((r: any) => ({
      combo_id: combo.id,
      rating: r.rating,
      title: r.title,
      content: r.content,
      reviewer_name: r.reviewer_name,
      reviewer_avatar: r.reviewer_avatar,
      reviewer_gender: r.reviewer_gender,
      review_date: r.review_date,
    }))

    await supabase.from('reviews').insert(reviewsToInsert)
  }

  return NextResponse.json({ combo })
}
