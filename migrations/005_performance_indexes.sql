-- Performance optimization: Add indexes for faster queries
-- Run this on Supabase SQL Editor to improve query performance

-- Indexes for ebooks table
CREATE INDEX IF NOT EXISTS idx_ebooks_active ON ebooks(active);
CREATE INDEX IF NOT EXISTS idx_ebooks_featured ON ebooks(featured);
CREATE INDEX IF NOT EXISTS idx_ebooks_category_id ON ebooks(category_id);
CREATE INDEX IF NOT EXISTS idx_ebooks_slug ON ebooks(slug);
CREATE INDEX IF NOT EXISTS idx_ebooks_sales_count ON ebooks(sales_count DESC);
CREATE INDEX IF NOT EXISTS idx_ebooks_rating_avg ON ebooks(rating_avg DESC);
CREATE INDEX IF NOT EXISTS idx_ebooks_created_at ON ebooks(created_at DESC);

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_ebooks_active_featured ON ebooks(active, featured) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_ebooks_active_category ON ebooks(active, category_id) WHERE active = true;

-- Indexes for combos table
CREATE INDEX IF NOT EXISTS idx_combos_active ON combos(active);
CREATE INDEX IF NOT EXISTS idx_combos_featured ON combos(featured);
CREATE INDEX IF NOT EXISTS idx_combos_slug ON combos(slug);

-- Indexes for reviews table
CREATE INDEX IF NOT EXISTS idx_reviews_ebook_id ON reviews(ebook_id);
CREATE INDEX IF NOT EXISTS idx_reviews_combo_id ON reviews(combo_id);

-- Indexes for orders table
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Verify indexes were created
SELECT schemaname, tablename, indexname 
FROM pg_indexes 
WHERE tablename IN ('ebooks', 'combos', 'reviews', 'orders')
ORDER BY tablename, indexname;
