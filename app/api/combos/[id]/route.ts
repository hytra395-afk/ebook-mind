import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = getSupabase()

    const { data: combo, error } = await supabase
      .from('combos')
      .select('id, title, price, cover_url, slug')
      .eq('id', id)
      .eq('active', true)
      .single()

    if (error || !combo) {
      return NextResponse.json(
        { error: 'Combo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ combo })
  } catch (error) {
    console.error('Error fetching combo:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
