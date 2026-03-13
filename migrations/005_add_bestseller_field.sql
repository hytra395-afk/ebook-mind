-- Add bestseller field to ebooks table
-- This field is separate from featured:
-- - featured: controls if ebook appears in "Ebook Nổi Bật" section on homepage
-- - bestseller: controls if "Bestseller" badge is displayed on ebook card

ALTER TABLE ebooks 
ADD COLUMN IF NOT EXISTS bestseller BOOLEAN NOT NULL DEFAULT false;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_ebooks_bestseller ON ebooks(bestseller) WHERE bestseller = true;

-- Add comment for clarity
COMMENT ON COLUMN ebooks.bestseller IS 'Display Bestseller badge on ebook card (visual only, does not affect homepage featured section)';
COMMENT ON COLUMN ebooks.featured IS 'Show in homepage Featured Ebooks section (Ebook Nổi Bật)';
