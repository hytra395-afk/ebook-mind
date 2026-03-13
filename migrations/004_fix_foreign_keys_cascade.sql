-- Fix foreign key constraints to allow CASCADE delete
-- This allows deleting ebooks/combos even when they have related records

-- Drop existing foreign key constraints
ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_ebook_id_fkey;
ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_combo_id_fkey;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_ebook_id_fkey;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_combo_id_fkey;
ALTER TABLE combo_items DROP CONSTRAINT IF EXISTS combo_items_ebook_id_fkey;
ALTER TABLE combo_items DROP CONSTRAINT IF EXISTS combo_items_combo_id_fkey;
ALTER TABLE licenses DROP CONSTRAINT IF EXISTS licenses_ebook_id_fkey;

-- Add new foreign key constraints with ON DELETE CASCADE
ALTER TABLE order_items
  ADD CONSTRAINT order_items_ebook_id_fkey 
  FOREIGN KEY (ebook_id) REFERENCES ebooks(id) ON DELETE CASCADE;

ALTER TABLE order_items
  ADD CONSTRAINT order_items_combo_id_fkey 
  FOREIGN KEY (combo_id) REFERENCES combos(id) ON DELETE CASCADE;

ALTER TABLE reviews
  ADD CONSTRAINT reviews_ebook_id_fkey 
  FOREIGN KEY (ebook_id) REFERENCES ebooks(id) ON DELETE CASCADE;

ALTER TABLE reviews
  ADD CONSTRAINT reviews_combo_id_fkey 
  FOREIGN KEY (combo_id) REFERENCES combos(id) ON DELETE CASCADE;

ALTER TABLE combo_items
  ADD CONSTRAINT combo_items_ebook_id_fkey 
  FOREIGN KEY (ebook_id) REFERENCES ebooks(id) ON DELETE CASCADE;

ALTER TABLE combo_items
  ADD CONSTRAINT combo_items_combo_id_fkey 
  FOREIGN KEY (combo_id) REFERENCES combos(id) ON DELETE CASCADE;

ALTER TABLE licenses
  ADD CONSTRAINT licenses_ebook_id_fkey 
  FOREIGN KEY (ebook_id) REFERENCES ebooks(id) ON DELETE CASCADE;
