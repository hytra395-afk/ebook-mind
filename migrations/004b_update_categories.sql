-- Step 2: Update categories
-- Run this AFTER running 004a_drop_not_null_constraint.sql

-- Update category names (keep IDs and relationships intact)
UPDATE categories SET name = 'Solo Business' WHERE slug = 'tu-duy-solo-business';
UPDATE categories SET name = 'Phát triển mindset' WHERE slug = 'phat-trien-ban-than';

-- Verify categories were updated
SELECT id, name, slug FROM categories;
