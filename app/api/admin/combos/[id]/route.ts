import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

// GET - Get single combo
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return requireAdmin(request, async () => {
    const { id } = await params
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from('combos')
      .select('*, combo_items(ebook_id, sort_order)')
      .eq('id', id)
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ combo: data })
  })
}

// PUT - Update combo
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return requireAdmin(request, async () => {
    const { id } = await params
    const supabase = getSupabaseAdmin()
    const body = await request.json()

    // Extract ebook_ids and reviews from body
    const { ebook_ids, reviews, ...comboData } = body

    // Convert camelCase to snake_case for database columns
    const dbData = {
      ...comboData,
      rating_avg: comboData.ratingAvg || comboData.rating_avg || 0,
      rating_count: comboData.ratingCount || comboData.rating_count || 0,
      sales_count: comboData.salesCount || comboData.sales_count || 0,
      updated_at: new Date().toISOString()
    }
    // Remove camelCase versions
    delete dbData.ratingAvg
    delete dbData.ratingCount
    delete dbData.salesCount

    const { data, error } = await supabase
      .from('combos')
      .update(dbData)
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Update combo_items - delete old and insert new
    if (ebook_ids !== undefined) {
      await supabase.from('combo_items').delete().eq('combo_id', id)

      if (ebook_ids.length > 0) {
        const comboItems = ebook_ids.map((ebookId: string, index: number) => ({
          combo_id: id,
          ebook_id: ebookId,
          sort_order: index,
        }))

        await supabase.from('combo_items').insert(comboItems)
      }
    }

    // Handle reviews - delete old and insert new (use combo_reviews table)
    if (reviews !== undefined) {
      await supabase.from('combo_reviews').delete().eq('combo_id', id)

      if (reviews.length > 0) {
        const reviewsToInsert = reviews.map((r: any) => ({
          combo_id: id,
          rating: Number(r.rating) || 5,
          title: r.title || '',
          content: r.content || '',
          reviewer_name: r.reviewer_name || 'Anonymous',
          reviewer_avatar: r.reviewer_avatar || null,
          reviewer_gender: r.reviewer_gender || null,
          review_date: r.review_date || new Date().toISOString().split('T')[0],
        }))

        const { error: insertError } = await supabase.from('combo_reviews').insert(reviewsToInsert)
        if (insertError) {
          console.error('Error inserting combo reviews:', insertError)
          return NextResponse.json({ error: 'Failed to save reviews: ' + insertError.message }, { status: 500 })
        }
      }
    }

    return NextResponse.json({ combo: data })
  })
}

// DELETE - Delete combo
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return requireAdmin(request, async () => {
    const { id } = await params
    const supabase = getSupabaseAdmin()

    // combo_items will be deleted automatically due to ON DELETE CASCADE
    const { error } = await supabase.from('combos').delete().eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  })
}
