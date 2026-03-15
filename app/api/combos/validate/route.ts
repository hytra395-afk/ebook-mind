import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    const supabase = getSupabase()
    const { data: combo, error } = await supabase
      .from('combos')
      .select('id')
      .eq('id', id)
      .eq('active', true)
      .single()

    if (error || !combo) {
      return NextResponse.json({ valid: false })
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error('Combo validation error:', error)
    return NextResponse.json({ valid: false })
  }
}
