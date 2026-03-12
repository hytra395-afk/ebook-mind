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
  }
  // Remove camelCase versions
  delete dbData.ratingAvg
  delete dbData.ratingCount
  delete dbData.salesCount

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

  return NextResponse.json({ ebook })
}
