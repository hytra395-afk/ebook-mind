import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

interface BulkDeleteBody {
  ids: string[]
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async () => {
    let body: BulkDeleteBody
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const ids = Array.isArray(body.ids) ? body.ids.filter(Boolean) : []
    if (ids.length === 0) {
      return NextResponse.json({ error: 'ids is required' }, { status: 400 })
    }

    // 1) Delete download tokens for licenses belonging to these orders
    const { data: licenses, error: licensesErr } = await supabaseAdmin
      .from('licenses')
      .select('id')
      .in('order_id', ids)

    if (licensesErr) {
      return NextResponse.json({ error: licensesErr.message }, { status: 500 })
    }

    const licenseIds = (licenses || []).map((l) => l.id).filter(Boolean)

    if (licenseIds.length > 0) {
      const { error: dtErr } = await supabaseAdmin.from('download_tokens').delete().in('license_id', licenseIds)
      if (dtErr) {
        return NextResponse.json({ error: dtErr.message }, { status: 500 })
      }
    }

    // 2) Delete licenses
    const { error: delLicErr } = await supabaseAdmin.from('licenses').delete().in('order_id', ids)
    if (delLicErr) {
      return NextResponse.json({ error: delLicErr.message }, { status: 500 })
    }

    // 3) Delete order items (in case FK order_items.order_id is not cascading)
    const { error: itemsErr } = await supabaseAdmin.from('order_items').delete().in('order_id', ids)
    if (itemsErr) {
      return NextResponse.json({ error: itemsErr.message }, { status: 500 })
    }

    // 4) Delete orders
    const { error: ordersErr } = await supabaseAdmin.from('orders').delete().in('id', ids)
    if (ordersErr) {
      return NextResponse.json({ error: ordersErr.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, deleted: ids.length })
  })
}
