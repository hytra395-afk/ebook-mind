-- =====================================================
-- FIX RLS POLICIES FOR PRODUCTS TABLE
-- The ebooks table was renamed to products, but RLS policies still reference ebooks
-- =====================================================

-- Drop old policies on ebooks table (if it exists)
DROP POLICY IF EXISTS "Admins can insert ebooks" ON ebooks;
DROP POLICY IF EXISTS "Admins can update ebooks" ON ebooks;
DROP POLICY IF EXISTS "Admins can delete ebooks" ON ebooks;

-- Drop existing policies on products table
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;
DROP POLICY IF EXISTS "Public can read active products" ON products;
DROP POLICY IF EXISTS "Admins can read all products" ON products;

-- Create policies on products table
CREATE POLICY "Admins can insert products"
ON products FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update products"
ON products FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete products"
ON products FOR DELETE
USING (is_admin());

-- Public can read active products
CREATE POLICY "Public can read active products"
ON products FOR SELECT
USING (active = true OR is_admin());

-- Admins can read all products
CREATE POLICY "Admins can read all products"
ON products FOR SELECT
USING (is_admin());

-- =====================================================
-- Migration complete
-- =====================================================
SELECT 'Migration 011 completed successfully!' AS status;
