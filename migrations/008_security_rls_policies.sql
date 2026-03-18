-- =====================================================
-- SECURITY AUDIT FIX - RLS POLICIES
-- Fix all Row Level Security issues
-- =====================================================

-- =====================================================
-- 1. ENABLE RLS ON MISSING TABLES
-- =====================================================

-- Fix combo_reviews (Supabase Security Alert)
ALTER TABLE combo_reviews ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. ADD ADMIN ROLE SUPPORT
-- =====================================================

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin' OR
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 3. COMBO_REVIEWS POLICIES
-- =====================================================

-- Public can read all combo reviews
CREATE POLICY "Public can read combo reviews"
ON combo_reviews FOR SELECT
USING (true);

-- Only admins can insert combo reviews
CREATE POLICY "Admins can insert combo reviews"
ON combo_reviews FOR INSERT
WITH CHECK (is_admin());

-- Only admins can update combo reviews
CREATE POLICY "Admins can update combo reviews"
ON combo_reviews FOR UPDATE
USING (is_admin());

-- Only admins can delete combo reviews
CREATE POLICY "Admins can delete combo reviews"
ON combo_reviews FOR DELETE
USING (is_admin());

-- =====================================================
-- 4. REVIEWS POLICIES (Ebook Reviews)
-- =====================================================

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Public can read reviews" ON reviews;

-- Public can read all reviews
CREATE POLICY "Public can read reviews"
ON reviews FOR SELECT
USING (true);

-- Only admins can insert reviews
CREATE POLICY "Admins can insert reviews"
ON reviews FOR INSERT
WITH CHECK (is_admin());

-- Only admins can update reviews
CREATE POLICY "Admins can update reviews"
ON reviews FOR UPDATE
USING (is_admin());

-- Only admins can delete reviews
CREATE POLICY "Admins can delete reviews"
ON reviews FOR DELETE
USING (is_admin());

-- =====================================================
-- 5. ORDERS POLICIES
-- =====================================================

-- Users can read their own orders via public_token
CREATE POLICY "Users can read own orders via token"
ON orders FOR SELECT
USING (
  public_token = current_setting('request.jwt.claims', true)::json->>'public_token' OR
  is_admin()
);

-- Only system (service role) can create orders
-- This is enforced by using supabaseAdmin in API routes

-- Only admins can update orders
CREATE POLICY "Admins can update orders"
ON orders FOR UPDATE
USING (is_admin());

-- Only admins can delete orders
CREATE POLICY "Admins can delete orders"
ON orders FOR DELETE
USING (is_admin());

-- =====================================================
-- 6. ORDER_ITEMS POLICIES
-- =====================================================

-- Users can read order items for their orders
CREATE POLICY "Users can read own order items"
ON order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND (
      orders.public_token = current_setting('request.jwt.claims', true)::json->>'public_token' OR
      is_admin()
    )
  )
);

-- =====================================================
-- 7. LICENSES POLICIES
-- =====================================================

-- Users can read licenses for their orders
CREATE POLICY "Users can read own licenses"
ON licenses FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = licenses.order_id
    AND (
      orders.public_token = current_setting('request.jwt.claims', true)::json->>'public_token' OR
      is_admin()
    )
  )
);

-- =====================================================
-- 8. DOWNLOAD_TOKENS POLICIES
-- =====================================================

-- Users can read download tokens for their licenses
CREATE POLICY "Users can read own download tokens"
ON download_tokens FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM licenses
    JOIN orders ON orders.id = licenses.order_id
    WHERE licenses.id = download_tokens.license_id
    AND (
      orders.public_token = current_setting('request.jwt.claims', true)::json->>'public_token' OR
      is_admin()
    )
  )
);

-- System can update download tokens (for tracking usage)
-- This is enforced by using supabaseAdmin in /api/download route

-- =====================================================
-- 9. ADMIN-ONLY WRITE POLICIES FOR PUBLIC TABLES
-- =====================================================

-- Categories - only admins can write
CREATE POLICY "Admins can insert categories"
ON categories FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update categories"
ON categories FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete categories"
ON categories FOR DELETE
USING (is_admin());

-- Levels - only admins can write
CREATE POLICY "Admins can insert levels"
ON levels FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update levels"
ON levels FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete levels"
ON levels FOR DELETE
USING (is_admin());

-- Authors - only admins can write
CREATE POLICY "Admins can insert authors"
ON authors FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update authors"
ON authors FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete authors"
ON authors FOR DELETE
USING (is_admin());

-- Ebooks - only admins can write
CREATE POLICY "Admins can insert ebooks"
ON ebooks FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update ebooks"
ON ebooks FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete ebooks"
ON ebooks FOR DELETE
USING (is_admin());

-- Combos - only admins can write
CREATE POLICY "Admins can insert combos"
ON combos FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update combos"
ON combos FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete combos"
ON combos FOR DELETE
USING (is_admin());

-- Combo Items - only admins can write
CREATE POLICY "Admins can insert combo items"
ON combo_items FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update combo items"
ON combo_items FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete combo items"
ON combo_items FOR DELETE
USING (is_admin());

-- =====================================================
-- 10. EBOOK_PAGES POLICIES
-- =====================================================

-- Admins can write ebook pages
CREATE POLICY "Admins can insert ebook pages"
ON ebook_pages FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update ebook pages"
ON ebook_pages FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete ebook pages"
ON ebook_pages FOR DELETE
USING (is_admin());

-- =====================================================
-- 11. COUPONS POLICIES
-- =====================================================

-- Public can read active coupons (for validation)
CREATE POLICY "Public can read active coupons"
ON coupons FOR SELECT
USING (active = true OR is_admin());

-- Only admins can write coupons
CREATE POLICY "Admins can insert coupons"
ON coupons FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update coupons"
ON coupons FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete coupons"
ON coupons FOR DELETE
USING (is_admin());

-- =====================================================
-- 12. EVENTS POLICIES
-- =====================================================

-- Anyone can insert events (for analytics)
CREATE POLICY "Anyone can insert events"
ON events FOR INSERT
WITH CHECK (true);

-- Only admins can read events
CREATE POLICY "Admins can read events"
ON events FOR SELECT
USING (is_admin());

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Run these to verify RLS is enabled on all tables:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Run these to verify policies exist:
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public';
