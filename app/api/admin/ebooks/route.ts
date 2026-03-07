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

  const { data, error } = await supabase
    .from('ebooks')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ebook: data })
}
