-- =====================================================
-- SUPABASE MIGRATIONS - RUN IN ORDER
-- =====================================================

-- =====================================================
-- 1. EBOOK STORE SCHEMA (RUN FIRST)
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Levels table
CREATE TABLE levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Authors table
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ebooks table
CREATE TABLE ebooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id),
  level_id UUID NOT NULL REFERENCES levels(id),
  author_id UUID REFERENCES authors(id),
  price DECIMAL(10,2) NOT NULL,
  pages INTEGER NOT NULL,
  cover_url TEXT NOT NULL,
  storage_path TEXT,
  external_url TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  rating_avg DECIMAL(3,2) NOT NULL DEFAULT 0,
  rating_count INTEGER NOT NULL DEFAULT 0,
  sales_count INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Combos table
CREATE TABLE combos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Combo items table
CREATE TABLE combo_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  combo_id UUID NOT NULL REFERENCES combos(id) ON DELETE CASCADE,
  ebook_id UUID NOT NULL REFERENCES ebooks(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(combo_id, ebook_id)
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  public_token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'VND',
  email TEXT,
  provider TEXT NOT NULL DEFAULT 'sepay',
  provider_txn_id TEXT UNIQUE,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  ebook_id UUID REFERENCES ebooks(id),
  combo_id UUID REFERENCES combos(id),
  unit_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ebook_id IS NOT NULL OR combo_id IS NOT NULL)
);

-- Licenses table
CREATE TABLE licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  ebook_id UUID NOT NULL REFERENCES ebooks(id),
  download_quota INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Download tokens table
CREATE TABLE download_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  license_id UUID NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ebook_id UUID NOT NULL REFERENCES ebooks(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  reviewer_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Coupons table
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  anon_id TEXT,
  event_type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_ebooks_category ON ebooks(category_id);
CREATE INDEX idx_ebooks_level ON ebooks(level_id);
CREATE INDEX idx_ebooks_active ON ebooks(active);
CREATE INDEX idx_ebooks_featured ON ebooks(featured);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_provider_txn_id ON orders(provider_txn_id);
CREATE INDEX idx_download_tokens_token ON download_tokens(token);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_created_at ON events(created_at);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE combos ENABLE ROW LEVEL SECURITY;
ALTER TABLE combo_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public can read active categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read levels" ON levels FOR SELECT USING (true);
CREATE POLICY "Public can read authors" ON authors FOR SELECT USING (true);
CREATE POLICY "Public can read active ebooks" ON ebooks FOR SELECT USING (active = true);
CREATE POLICY "Public can read active combos" ON combos FOR SELECT USING (active = true);
CREATE POLICY "Public can read combo items" ON combo_items FOR SELECT USING (true);
CREATE POLICY "Public can read reviews" ON reviews FOR SELECT USING (true);

-- Insert default data
INSERT INTO categories (name, slug, description) VALUES
  ('Kinh doanh', 'kinh-doanh', 'Ebook về kinh doanh, khởi nghiệp, quản lý'),
  ('Phát triển bản thân', 'phat-trien-ban-than', 'Ebook về phát triển bản thân, kỹ năng mềm'),
  ('Công nghệ', 'cong-nghe', 'Ebook về lập trình, công nghệ, AI'),
  ('Sức khỏe', 'suc-khoe', 'Ebook về sức khỏe, dinh dưỡng, thể dục');

INSERT INTO levels (name, slug, sort_order) VALUES
  ('Cơ bản', 'co-ban', 1),
  ('Nâng cao', 'nang-cao', 2),
  ('Toàn diện', 'toan-dien', 3);

-- =====================================================
-- 2. EBOOK LANDING PAGES
-- =====================================================

-- Ebook landing pages (CMS)
CREATE TABLE ebook_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ebook_id UUID NOT NULL UNIQUE REFERENCES ebooks(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  title TEXT,
  slug TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  schema_jsonld JSONB,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ebook_pages_ebook_id ON ebook_pages(ebook_id);
CREATE INDEX idx_ebook_pages_status ON ebook_pages(status);
CREATE INDEX idx_ebook_pages_slug ON ebook_pages(slug);

ALTER TABLE ebook_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published ebook pages" ON ebook_pages
  FOR SELECT
  USING (status = 'published');

-- =====================================================
-- 3. ADD CUSTOM_DATE TO REVIEWS
-- =====================================================

-- Add custom_date column to reviews table
ALTER TABLE reviews ADD COLUMN custom_date DATE;

-- Create index for faster queries
CREATE INDEX idx_reviews_custom_date ON reviews(custom_date);

-- =====================================================
-- 4. ADD GENDER TO REVIEWS
-- =====================================================

-- Add gender column to reviews table
ALTER TABLE reviews ADD COLUMN gender VARCHAR(10) DEFAULT 'other';

-- Create index for faster queries
CREATE INDEX idx_reviews_gender ON reviews(gender);

-- =====================================================
-- 5. EBOOK IMAGE GALLERY
-- =====================================================

-- Add gallery support to ebooks table
-- gallery_images: array of image URLs (up to 10)
-- cover_image_index: which image in gallery is the cover (0-based, default 0)

ALTER TABLE ebooks 
ADD COLUMN gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN cover_image_index INTEGER DEFAULT 0;

-- Migrate existing cover_url to gallery_images[0]
UPDATE ebooks 
SET gallery_images = ARRAY[cover_url]
WHERE cover_url IS NOT NULL AND cover_url != '';

-- Keep cover_url for backward compatibility but make it computed from gallery
-- We'll update it via triggers or application logic
