-- =====================================================
-- SUPABASE RPC FUNCTIONS
-- Run these in Supabase SQL Editor after running migrations
-- =====================================================

-- Function to increment ebook sales count
CREATE OR REPLACE FUNCTION increment_ebook_sales(ebook_id UUID, increment_by INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE ebooks 
  SET sales_count = sales_count + increment_by,
      updated_at = NOW()
  WHERE id = ebook_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get order with items and download tokens
CREATE OR REPLACE FUNCTION get_order_details(order_token TEXT)
RETURNS TABLE (
  order_id UUID,
  public_token TEXT,
  status TEXT,
  amount DECIMAL,
  currency TEXT,
  email TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  ebook_id UUID,
  ebook_title TEXT,
  ebook_cover TEXT,
  download_token TEXT,
  download_url TEXT,
  expires_at TIMESTAMPTZ,
  used_count INTEGER,
  download_quota INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id as order_id,
    o.public_token,
    o.status,
    o.amount,
    o.currency,
    o.email,
    o.created_at,
    o.updated_at,
    e.id as ebook_id,
    e.title as ebook_title,
    e.cover_url as ebook_cover,
    dt.token as download_token,
    CASE 
      WHEN dt.token IS NOT NULL THEN '/api/download?token=' || dt.token
      ELSE NULL
    END as download_url,
    dt.expires_at,
    dt.used_count,
    l.download_quota
  FROM orders o
  LEFT JOIN order_items oi ON o.id = oi.order_id
  LEFT JOIN ebooks e ON oi.ebook_id = e.id
  LEFT JOIN licenses l ON o.id = l.order_id AND e.id = l.ebook_id
  LEFT JOIN download_tokens dt ON l.id = dt.license_id
  WHERE o.public_token = order_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
