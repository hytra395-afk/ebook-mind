import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'

export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin()

  try {
    const body = await request.json()
    const { event_type, user_id, anon_id, metadata } = body

    if (!event_type) {
      return NextResponse.json({ error: 'event_type is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('events')
      .insert({
        event_type,
        user_id: user_id || null,
        anon_id: anon_id || null,
        metadata: metadata || null,
      })

    if (error) {
      console.error('Event tracking error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Event tracking error:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
