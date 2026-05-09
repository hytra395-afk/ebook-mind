-- =====================================================
-- FIX RLS POLICIES FOR EBOOKS TABLE
-- Migration 001 (rename ebooks to products) was not applied to Supabase
-- So we need to ensure RLS policies work with the actual ebooks table
-- =====================================================

-- Drop ALL policies on ebooks table
DROP POLICY IF EXISTS "Admins can insert ebooks" ON ebooks;
DROP POLICY IF EXISTS "Admins can update ebooks" ON ebooks;
DROP POLICY IF EXISTS "Admins can delete ebooks" ON ebooks;
DROP POLICY IF EXISTS "Public can read active ebooks" ON ebooks;
DROP POLICY IF EXISTS "Admins can read all ebooks" ON ebooks;

-- Create policies on ebooks table
CREATE POLICY "Admins can insert ebooks"
ON ebooks FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update ebooks"
ON ebooks FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete ebooks"
ON ebooks FOR DELETE
USING (is_admin());

-- Public can read active ebooks
CREATE POLICY "Public can read active ebooks"
ON ebooks FOR SELECT
USING (active = true OR is_admin());

-- Admins can read all ebooks
CREATE POLICY "Admins can read all ebooks"
ON ebooks FOR SELECT
USING (is_admin());

-- =====================================================
-- Migration complete
-- =====================================================
SELECT 'Migration 011 completed successfully!' AS status;
