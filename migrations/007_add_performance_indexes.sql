-- Migration 007: Add performance indexes for faster queries
-- Run this on Supabase to improve query performance

-- Indexes for ebooks table
CREATE INDEX IF NOT EXISTS idx_ebooks_active ON ebooks(active);
CREATE INDEX IF NOT EXISTS idx_ebooks_featured ON ebooks(featured);
CREATE INDEX IF NOT EXISTS idx_ebooks_bestseller ON ebooks(bestseller);
CREATE INDEX IF NOT EXISTS idx_ebooks_slug ON ebooks(slug);
CREATE INDEX IF NOT EXISTS idx_ebooks_category_id ON ebooks(category_id);
CREATE INDEX IF NOT EXISTS idx_ebooks_created_at ON ebooks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ebooks_sales_count ON ebooks(sales_count DESC);
CREATE INDEX IF NOT EXISTS idx_ebooks_rating_avg ON ebooks(rating_avg DESC);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_ebooks_active_featured ON ebooks(active, featured) WHERE active = true AND featured = true;
CREATE INDEX IF NOT EXISTS idx_ebooks_active_category ON ebooks(active, category_id) WHERE active = true;

-- Indexes for categories table
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Indexes for reviews table
CREATE INDEX IF NOT EXISTS idx_reviews_ebook_id ON reviews(ebook_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);

-- Indexes for combos table
CREATE INDEX IF NOT EXISTS idx_combos_active ON combos(active);
CREATE INDEX IF NOT EXISTS idx_combos_featured ON combos(featured);
CREATE INDEX IF NOT EXISTS idx_combos_slug ON combos(slug);

-- Verify indexes
SELECT schemaname, tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND tablename IN ('ebooks', 'categories', 'reviews', 'combos')
ORDER BY tablename, indexname;
