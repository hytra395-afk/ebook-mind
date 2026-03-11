-- Manual update orders that were paid but not auto-updated
-- Run this on Supabase SQL Editor

-- 1. Check orders with payment_code
SELECT 
    id, 
    public_token, 
    payment_code, 
    status, 
    amount, 
    email,
    created_at
FROM orders 
WHERE payment_code IN ('EBOOK8430587480', 'EBOOK4436103028')
ORDER BY created_at DESC;

-- 2. Update orders to completed (if found and status = 'pending')
UPDATE orders 
SET 
    status = 'completed', 
    updated_at = NOW(),
    provider_txn_id = '44859480',
    metadata = jsonb_set(
        COALESCE(metadata, '{}'::jsonb),
        '{manual_update}',
        'true'::jsonb
    )
WHERE payment_code = 'EBOOK8430587480' 
  AND status = 'pending';

UPDATE orders 
SET 
    status = 'completed', 
    updated_at = NOW(),
    provider_txn_id = '44859689',
    metadata = jsonb_set(
        COALESCE(metadata, '{}'::jsonb),
        '{manual_update}',
        'true'::jsonb
    )
WHERE payment_code = 'EBOOK4436103028' 
  AND status = 'pending';

-- 3. Verify update
SELECT 
    id, 
    public_token, 
    payment_code, 
    status, 
    amount, 
    provider_txn_id,
    updated_at
FROM orders 
WHERE payment_code IN ('EBOOK8430587480', 'EBOOK4436103028')
ORDER BY created_at DESC;

-- 4. Create licenses for ebooks (if not already created)
-- First, get order_id and ebook_id
SELECT 
    o.id as order_id,
    o.payment_code,
    oi.ebook_id,
    e.title as ebook_title
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
LEFT JOIN ebooks e ON e.id = oi.ebook_id
WHERE o.payment_code IN ('EBOOK8430587480', 'EBOOK4436103028')
  AND oi.ebook_id IS NOT NULL;

-- Then manually create licenses if needed
-- Replace {order_id} and {ebook_id} with actual values from above query
/*
INSERT INTO licenses (order_id, ebook_id, download_quota)
VALUES ({order_id}, {ebook_id}, 5)
ON CONFLICT DO NOTHING;
*/

-- 5. Create download tokens for licenses
-- Replace {license_id} with actual license_id
/*
INSERT INTO download_tokens (license_id, token, expires_at)
VALUES (
    {license_id}, 
    'manual_' || gen_random_uuid()::text,
    NOW() + INTERVAL '48 hours'
)
ON CONFLICT DO NOTHING;
*/

-- 6. Get download URLs for user
SELECT 
    o.payment_code,
    o.email,
    e.title as ebook_title,
    dt.token as download_token,
    'https://ebookmind.com/api/download?token=' || dt.token as download_url,
    dt.expires_at
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN ebooks e ON e.id = oi.ebook_id
JOIN licenses l ON l.order_id = o.id AND l.ebook_id = e.id
JOIN download_tokens dt ON dt.license_id = l.id
WHERE o.payment_code IN ('EBOOK8430587480', 'EBOOK4436103028')
ORDER BY o.created_at DESC;
