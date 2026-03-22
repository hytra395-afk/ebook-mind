-- =====================================================
-- MIGRATION 009: Blog System
-- =====================================================

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  
  -- SEO Fields
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  
  -- Organization
  category TEXT NOT NULL,
  tags TEXT[],
  
  -- Stats
  views INTEGER DEFAULT 0,
  read_time INTEGER,
  
  -- Publishing
  status TEXT DEFAULT 'published',
  published_at TIMESTAMP DEFAULT NOW(),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_views ON blog_posts(views DESC);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public can read published blog posts" ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Create policy for admin full access (you can adjust this based on your auth setup)
CREATE POLICY "Admin full access to blog posts" ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);
