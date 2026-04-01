-- =====================================================
-- MIGRATION: Rename "Công nghệ" to "Chuyên môn" 
-- AND Add subcategories for "Kinh doanh ngách"
-- =====================================================

-- Step 1: Rename category "Công nghệ" to "Chuyên môn"
UPDATE categories 
SET name = 'Chuyên môn', 
    description = 'Ebook về kỹ năng chuyên môn, công nghệ, chuyên gia'
WHERE slug = 'cong-nghe';

-- Verify category rename
SELECT id, name, slug, description FROM categories WHERE slug = 'cong-nghe';

-- Step 2: Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Optional: icon name for UI
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_subcategories_slug ON subcategories(slug);

-- Step 3: Add subcategory_id to ebooks table
ALTER TABLE ebooks 
ADD COLUMN IF NOT EXISTS subcategory_id UUID REFERENCES subcategories(id);

-- Create index for ebook subcategory filtering
CREATE INDEX IF NOT EXISTS idx_ebooks_subcategory_id ON ebooks(subcategory_id);

-- Step 4: Insert subcategories for "Kinh doanh ngách"
-- First, get the category_id for "Kinh doanh ngách"
DO $$
DECLARE
  kinh_doanh_ngach_id UUID;
BEGIN
  SELECT id INTO kinh_doanh_ngach_id FROM categories WHERE slug = 'kinh-doanh-ngach';
  
  IF kinh_doanh_ngach_id IS NOT NULL THEN
    INSERT INTO subcategories (category_id, name, slug, description, icon, sort_order) VALUES
      (kinh_doanh_ngach_id, 'Thực phẩm & Đồ uống', 'thuc-pham-do-uong', 'Kinh doanh F&B, nhà hàng, quán cafe, đồ ăn vặt', '🍔', 1),
      (kinh_doanh_ngach_id, 'Dịch vụ chăm sóc & Lưu trú', 'dich-vu-cham-soc-luu-tru', 'Spa, salon, homestay, khách sạn mini', '🏨', 2),
      (kinh_doanh_ngach_id, 'Nhà cửa & Đời sống', 'nha-cua-doi-song', 'Nội thất, đồ gia dụng, trang trí, sửa chữa', '🏠', 3),
      (kinh_doanh_ngach_id, 'Digital Products & Online Services', 'digital-products-online-services', 'Khóa học online, template, ebook, SaaS', '💻', 4),
      (kinh_doanh_ngach_id, 'Tư vấn & Dịch vụ chuyên môn', 'tu-van-dich-vu-chuyen-mon', 'Tư vấn pháp lý, kế toán, marketing, thiết kế', '💼', 5)
    ON CONFLICT (category_id, slug) DO NOTHING;
  END IF;
END $$;

-- Step 5: Verify subcategories were created
SELECT s.id, s.name, s.slug, s.icon, s.sort_order, c.name as category_name
FROM subcategories s
JOIN categories c ON s.category_id = c.id
WHERE c.slug = 'kinh-doanh-ngach'
ORDER BY s.sort_order;

-- Step 6: Enable RLS policies for subcategories
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

-- Public can read active subcategories
CREATE POLICY "Public can read active subcategories"
ON subcategories FOR SELECT
USING (active = true);

-- Admins can do everything
CREATE POLICY "Admins can insert subcategories"
ON subcategories FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can update subcategories"
ON subcategories FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can delete subcategories"
ON subcategories FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

-- Step 7: Create helper function to get subcategories by category slug
CREATE OR REPLACE FUNCTION get_subcategories_by_category(category_slug TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  description TEXT,
  icon TEXT,
  sort_order INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT s.id, s.name, s.slug, s.description, s.icon, s.sort_order
  FROM subcategories s
  JOIN categories c ON s.category_id = c.id
  WHERE c.slug = category_slug AND s.active = true
  ORDER BY s.sort_order;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check category rename
SELECT '=== Category Rename ===' as step;
SELECT id, name, slug, description FROM categories WHERE slug = 'cong-nghe';

-- Check subcategories table
SELECT '=== Subcategories Table ===' as step;
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'subcategories'
ORDER BY ordinal_position;

-- Check subcategories data
SELECT '=== Subcategories for Kinh doanh ngách ===' as step;
SELECT s.name, s.slug, s.icon, s.sort_order
FROM subcategories s
JOIN categories c ON s.category_id = c.id
WHERE c.slug = 'kinh-doanh-ngach'
ORDER BY s.sort_order;

-- Check ebooks table has subcategory_id column
SELECT '=== Ebooks table structure ===' as step;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ebooks' AND column_name = 'subcategory_id';
