import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'

// GET - List all ebooks (admin, no RLS filter)
export async function GET() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('ebooks')
    .select('*, categories(name), levels(name), authors(name)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ebooks: data })
}

// POST - Create ebook
export async function POST(request: NextRequest) {
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
    bestseller: ebookData.bestseller || false,
  }
  // Remove camelCase versions
  delete dbData.ratingAvg
  delete dbData.ratingCount
  delete dbData.salesCount

  // Remove joined relation objects returned by SELECT queries (not columns)
  delete dbData.authors
  delete dbData.categories
  delete dbData.levels

  const { data: ebook, error } = await supabase
    .from('ebooks')
    .insert(dbData)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Insert reviews if provided
  if (reviews && reviews.length > 0 && ebook) {
    const reviewsToInsert = reviews.map((r: any) => ({
      ebook_id: ebook.id,
      rating: Number(r.rating) || 5,
      title: r.title || '',
      content: r.content || '',
      reviewer_name: r.reviewer_name || 'Anonymous',
      reviewer_avatar: r.reviewer_avatar || null,
      reviewer_gender: r.reviewer_gender || null,
      review_date: r.review_date || new Date().toISOString().split('T')[0],
    }))

    const { error: reviewError } = await supabase.from('reviews').insert(reviewsToInsert)
    if (reviewError) {
      console.error('Error inserting reviews:', reviewError)
      // Don't fail the whole request, just log the error
    }
  }

  return NextResponse.json({ ebook })
}
