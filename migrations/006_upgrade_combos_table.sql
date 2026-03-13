-- Upgrade combos table to match ebooks features
-- Add missing columns for SEO, content, highlights, reviews, and images

-- Add cover image
ALTER TABLE combos 
ADD COLUMN IF NOT EXISTS cover_url TEXT;

-- Add highlights (array of key benefits)
ALTER TABLE combos 
ADD COLUMN IF NOT EXISTS highlights TEXT[];

-- Add detailed content/description
ALTER TABLE combos 
ADD COLUMN IF NOT EXISTS content TEXT;

-- Add preview images gallery
ALTER TABLE combos 
ADD COLUMN IF NOT EXISTS preview_images TEXT[];

-- Add SEO fields
ALTER TABLE combos 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS og_image_url TEXT,
ADD COLUMN IF NOT EXISTS keywords TEXT[];

-- Add rating fields
ALTER TABLE combos 
ADD COLUMN IF NOT EXISTS rating_avg DECIMAL(3,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS sales_count INTEGER NOT NULL DEFAULT 0;

-- Add bestseller field (separate from featured)
ALTER TABLE combos 
ADD COLUMN IF NOT EXISTS bestseller BOOLEAN NOT NULL DEFAULT false;

-- Create reviews table for combos (similar to ebooks reviews)
CREATE TABLE IF NOT EXISTS combo_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  combo_id UUID NOT NULL REFERENCES combos(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  reviewer_name TEXT NOT NULL,
  reviewer_avatar TEXT,
  reviewer_gender TEXT,
  review_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_combo_reviews_combo_id ON combo_reviews(combo_id);
CREATE INDEX IF NOT EXISTS idx_combo_reviews_rating ON combo_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_combo_reviews_date ON combo_reviews(review_date DESC);
CREATE INDEX IF NOT EXISTS idx_combos_bestseller ON combos(bestseller) WHERE bestseller = true;
CREATE INDEX IF NOT EXISTS idx_combos_featured ON combos(featured) WHERE featured = true;

-- Add comments
COMMENT ON COLUMN combos.bestseller IS 'Display Bestseller badge on combo card (visual only)';
COMMENT ON COLUMN combos.featured IS 'Show in homepage Featured Combos section';
COMMENT ON COLUMN combos.highlights IS 'Key benefits/highlights displayed as bullet points';
COMMENT ON COLUMN combos.content IS 'Detailed description with rich text formatting';
COMMENT ON COLUMN combos.preview_images IS 'Gallery of preview images';
COMMENT ON TABLE combo_reviews IS 'Customer reviews for combos (separate from ebook reviews)';
