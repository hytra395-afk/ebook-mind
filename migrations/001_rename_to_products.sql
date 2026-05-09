-- =====================================================
-- MORII VN - DATABASE MIGRATION
-- Rename ebooks → products and add handmade features
-- =====================================================

-- 1. Rename ebooks table to products
ALTER TABLE IF EXISTS ebooks RENAME TO products;

-- 2. Add handmade-specific fields to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS material TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS dimensions TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight_grams INTEGER;
ALTER TABLE products ADD COLUMN IF NOT EXISTS has_variants BOOLEAN DEFAULT false;

-- 3. Create product_variants table for size/color options
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE,
  
  -- Variant attributes
  size TEXT,
  color TEXT,
  color_hex TEXT,
  
  -- Pricing and inventory
  price_adjustment DECIMAL(10,2) DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  
  -- Optional variant-specific image
  image_url TEXT,
  
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);

-- 4. Update orders table - Add shipping information
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_address TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_ward TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_district TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_city TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_notes TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_fee DECIMAL(10,2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_status TEXT DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT;

-- 5. Update order_items - Add variant support
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS variant_id UUID REFERENCES product_variants(id);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS variant_info JSONB;

-- 6. Rename foreign key columns (if they exist)
-- Note: These will be renamed automatically when table is renamed in most cases
-- But we add explicit renames for clarity

DO $$ 
BEGIN
  -- Rename ebook_id to product_id in order_items
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'order_items' AND column_name = 'ebook_id'
  ) THEN
    ALTER TABLE order_items RENAME COLUMN ebook_id TO product_id;
  END IF;

  -- Rename ebook_id to product_id in licenses (if table exists)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'licenses') THEN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'licenses' AND column_name = 'ebook_id'
    ) THEN
      ALTER TABLE licenses RENAME COLUMN ebook_id TO product_id;
    END IF;
  END IF;

  -- Rename ebook_id to product_id in combo_items
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'combo_items' AND column_name = 'ebook_id'
  ) THEN
    ALTER TABLE combo_items RENAME COLUMN ebook_id TO product_id;
  END IF;

  -- Rename ebook_id to product_id in reviews
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'ebook_id'
  ) THEN
    ALTER TABLE reviews RENAME COLUMN ebook_id TO product_id;
  END IF;
END $$;

-- 7. Add comments for documentation
COMMENT ON TABLE products IS 'Handmade products catalog';
COMMENT ON TABLE product_variants IS 'Product variants (size, color, etc.)';
COMMENT ON COLUMN products.material IS 'Product material (e.g., Cotton, Leather, Paper)';
COMMENT ON COLUMN products.dimensions IS 'Product dimensions (e.g., 10x15cm)';
COMMENT ON COLUMN products.weight_grams IS 'Product weight in grams';
COMMENT ON COLUMN products.has_variants IS 'Whether product has size/color variants';
COMMENT ON COLUMN orders.shipping_status IS 'Shipping status: pending, processing, shipped, delivered, cancelled';

-- 8. Create RPC function to increment product sales
CREATE OR REPLACE FUNCTION increment_product_sales(
  product_id UUID,
  increment_by INTEGER DEFAULT 1
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE products
  SET sales_count = sales_count + increment_by
  WHERE id = product_id;
END;
$$;

-- Migration complete!
SELECT 'Migration 001 completed successfully!' AS status;
