import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'

// GET - List reviews (with optional ebook_id filter)
export async function GET(request: NextRequest) {
  const supabase = getSupabaseAdmin()
  const { searchParams } = new URL(request.url)
  const ebookId = searchParams.get('ebook_id')

  let query = supabase
    .from('reviews')
    .select('*, ebooks(title)')
    .order('created_at', { ascending: false })
    .limit(100)

  if (ebookId) {
    query = query.eq('ebook_id', ebookId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, reviews: data })
}

// POST - Create review
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin()
  const body = await request.json()

  const { ebook_id, rating, title, content, reviewer_name, gender, custom_date } = body

  if (!ebook_id || !rating) {
    return NextResponse.json({ error: 'ebook_id and rating are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      ebook_id,
      rating: Number(rating),
      title: title || null,
      content: content || null,
      reviewer_name: reviewer_name || null,
      gender: gender || 'other',
      custom_date: custom_date || null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update ebook rating stats
  const { data: stats } = await supabase
    .from('reviews')
    .select('rating')
    .eq('ebook_id', ebook_id)

  if (stats && stats.length > 0) {
    const avg = stats.reduce((s: number, r: any) => s + r.rating, 0) / stats.length
    await supabase
      .from('ebooks')
      .update({ rating_avg: Math.round(avg * 100) / 100, rating_count: stats.length })
      .eq('id', ebook_id)
  }

  return NextResponse.json({ success: true, review: data })
}

// DELETE - Delete review
export async function DELETE(request: NextRequest) {
  const supabase = getSupabaseAdmin()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  // Get review to know ebook_id for rating recalc
  const { data: review } = await supabase
    .from('reviews')
    .select('ebook_id')
    .eq('id', id)
    .single()

  const { error } = await supabase.from('reviews').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Recalculate rating
  if (review) {
    const { data: stats } = await supabase
      .from('reviews')
      .select('rating')
      .eq('ebook_id', review.ebook_id)

    const avg = stats && stats.length > 0
      ? stats.reduce((s: number, r: any) => s + r.rating, 0) / stats.length
      : 0

    await supabase
      .from('ebooks')
      .update({ rating_avg: Math.round(avg * 100) / 100, rating_count: stats?.length || 0 })
      .eq('id', review.ebook_id)
  }

  return NextResponse.json({ success: true })
}
