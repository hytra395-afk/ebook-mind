import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = getSupabase()

    const { data: ebook, error } = await supabase
      .from('ebooks')
      .select('id, title, price, cover_url, slug')
      .eq('id', id)
      .eq('active', true)
      .single()

    if (error || !ebook) {
      return NextResponse.json(
        { error: 'Ebook not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ ebook })
  } catch (error) {
    console.error('Error fetching ebook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
