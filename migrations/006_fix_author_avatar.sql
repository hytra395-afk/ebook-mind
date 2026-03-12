-- =====================================================
-- MIGRATION 006: Fix Author Avatar Column
-- Run this in Supabase SQL Editor
-- =====================================================

-- Ensure all author-related columns exist in ebooks table
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_title TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_bio TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_avatar TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT '[]';
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS preview_images JSONB DEFAULT '[]';
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS og_image_url TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS keywords TEXT[];
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';

-- Verify columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ebooks' 
  AND column_name IN ('author_name', 'author_title', 'author_bio', 'author_avatar', 'content', 'highlights', 'preview_images', 'og_image_url', 'keywords', 'status')
ORDER BY column_name;
