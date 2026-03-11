-- =====================================================
-- MIGRATION 003: Nâng cấp Ebooks & Combos
-- =====================================================

-- 1. Cập nhật bảng ebooks
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT '[]';
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS preview_images JSONB DEFAULT '[]';
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_title TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_bio TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_avatar TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS og_image_url TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS keywords TEXT[];
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';

-- 2. Cập nhật bảng combos
ALTER TABLE combos ADD COLUMN IF NOT EXISTS cover_url TEXT;
ALTER TABLE combos ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE combos ADD COLUMN IF NOT EXISTS rating_avg DECIMAL(3,2) DEFAULT 0;
ALTER TABLE combos ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;
ALTER TABLE combos ADD COLUMN IF NOT EXISTS sales_count INTEGER DEFAULT 0;
ALTER TABLE combos ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT '[]';
ALTER TABLE combos ADD COLUMN IF NOT EXISTS og_image_url TEXT;
ALTER TABLE combos ADD COLUMN IF NOT EXISTS keywords TEXT[];
ALTER TABLE combos ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';

-- 3. Cập nhật bảng reviews
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reviewer_avatar TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reviewer_gender TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS review_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS combo_id UUID REFERENCES combos(id) ON DELETE CASCADE;

-- 4. Tạo index mới
CREATE INDEX IF NOT EXISTS idx_ebooks_status ON ebooks(status);
CREATE INDEX IF NOT EXISTS idx_combos_status ON combos(status);
CREATE INDEX IF NOT EXISTS idx_reviews_combo_id ON reviews(combo_id);

-- 5. Cập nhật RLS policy cho reviews với combo
DROP POLICY IF EXISTS "Public can read reviews" ON reviews;
CREATE POLICY "Public can read reviews" ON reviews FOR SELECT USING (true);
