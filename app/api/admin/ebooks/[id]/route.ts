import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'

// GET - Get single ebook with all relations
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from('ebooks')
    .select('*, categories(name), levels(name), authors(name)')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ebook: data })
}

// PUT - Update ebook
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseAdmin()
  const body = await request.json()

  // Extract reviews from body
  const { reviews, ...ebookData } = body

  // Remove author_id if using custom author fields
  if (ebookData.author_name) {
    delete ebookData.author_id
  }

  // Convert camelCase to snake_case for database columns
  const dbData = {
    ...ebookData,
    rating_avg: ebookData.ratingAvg || ebookData.rating_avg || 0,
    rating_count: ebookData.ratingCount || ebookData.rating_count || 0,
    sales_count: ebookData.salesCount || ebookData.sales_count || 0,
    updated_at: new Date().toISOString()
  }
  // Remove camelCase versions
  delete dbData.ratingAvg
  delete dbData.ratingCount
  delete dbData.salesCount

  // Remove joined relation objects returned by SELECT queries (not columns)
  delete dbData.authors
  delete dbData.categories
  delete dbData.levels

  const { data, error } = await supabase
    .from('ebooks')
    .update(dbData)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Handle reviews - delete old and insert new
  if (reviews !== undefined) {
    // Delete existing reviews for this ebook
    const { error: deleteError } = await supabase.from('reviews').delete().eq('ebook_id', id)
    if (deleteError) {
      console.error('Error deleting old reviews:', deleteError)
    }

    // Insert new reviews
    if (reviews.length > 0) {
      const reviewsToInsert = reviews.map((r: any) => ({
        ebook_id: id,
        rating: Number(r.rating) || 5,
        title: r.title || '',
        content: r.content || '',
        reviewer_name: r.reviewer_name || 'Anonymous',
        reviewer_avatar: r.reviewer_avatar || null,
        reviewer_gender: r.reviewer_gender || null,
      }))

      const { error: insertError } = await supabase.from('reviews').insert(reviewsToInsert)
      if (insertError) {
        console.error('Error inserting reviews:', insertError)
        return NextResponse.json({ error: 'Failed to save reviews: ' + insertError.message }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ ebook: data })
}

// DELETE - Delete ebook
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseAdmin()

  const { error } = await supabase.from('ebooks').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
