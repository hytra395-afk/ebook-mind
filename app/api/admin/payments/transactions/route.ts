import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

function parseDateParam(value: string | null): string | null {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  return d.toISOString()
}

export async function GET(request: NextRequest) {
  return requireAdmin(request, async () => {
    const { searchParams } = new URL(request.url)

    const from = parseDateParam(searchParams.get('from'))
    const to = parseDateParam(searchParams.get('to'))
    const includeHidden = searchParams.get('include_hidden') === '1'

    if (!from || !to) {
      return NextResponse.json({ error: 'from and to are required (ISO date)' }, { status: 400 })
    }

    let query = supabaseAdmin
      .from('orders')
      .select(
        `
        id,
        payment_code,
        status,
        amount,
        email,
        provider,
        provider_txn_id,
        created_at,
        is_hidden,
        order_items(
          id,
          ebook_id,
          combo_id,
          quantity,
          unit_price,
          ebooks(title),
          combos(title)
        )
      `
      )
      .eq('status', 'completed')
      .gte('created_at', from)
      .lte('created_at', to)
      .order('created_at', { ascending: false })
      .limit(500)

    if (!includeHidden) {
      query = query.eq('is_hidden', false)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [] })
  })
}
