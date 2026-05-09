import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    
    // Run the RLS policy fixes
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        -- Drop old policies on ebooks table (if it exists)
        DROP POLICY IF EXISTS "Admins can insert ebooks" ON ebooks;
        DROP POLICY IF EXISTS "Admins can update ebooks" ON ebooks;
        DROP POLICY IF EXISTS "Admins can delete ebooks" ON ebooks;

        -- Create policies on products table
        CREATE POLICY IF NOT EXISTS "Admins can insert products"
        ON products FOR INSERT
        WITH CHECK (is_admin());

        CREATE POLICY IF NOT EXISTS "Admins can update products"
        ON products FOR UPDATE
        USING (is_admin());

        CREATE POLICY IF NOT EXISTS "Admins can delete products"
        ON products FOR DELETE
        USING (is_admin());

        -- Public can read active products
        CREATE POLICY IF NOT EXISTS "Public can read active products"
        ON products FOR SELECT
        USING (active = true OR is_admin());

        -- Admins can read all products
        CREATE POLICY IF NOT EXISTS "Admins can read all products"
        ON products FOR SELECT
        USING (is_admin());
      `
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'RLS policies updated' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
