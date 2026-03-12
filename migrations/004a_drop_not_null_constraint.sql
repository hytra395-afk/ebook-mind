-- Step 1: Drop NOT NULL constraint from category_id column
-- Run this FIRST before running 004b_update_categories.sql

ALTER TABLE ebooks ALTER COLUMN category_id DROP NOT NULL;

-- Verify the constraint was removed
SELECT column_name, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'ebooks' AND column_name = 'category_id';
