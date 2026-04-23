import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

interface BulkHideBody {
  ids: string[]
  hidden: boolean
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async () => {
    let body: BulkHideBody
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const ids = Array.isArray(body.ids) ? body.ids.filter(Boolean) : []
    if (ids.length === 0) {
      return NextResponse.json({ error: 'ids is required' }, { status: 400 })
    }

    const hidden = Boolean(body.hidden)

    const payload = hidden
      ? { is_hidden: true, hidden_at: new Date().toISOString() }
      : { is_hidden: false, hidden_at: null }

    const { error } = await supabaseAdmin.from('orders').update(payload).in('id', ids)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  })
}
