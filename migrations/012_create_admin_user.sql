-- =====================================================
-- SET ADMIN ROLE FOR EXISTING USER
-- Run this AFTER creating the user in Supabase Dashboard
-- =====================================================

-- Update user metadata to set admin role
UPDATE auth.users
SET 
  raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'::jsonb
  ),
  raw_app_meta_data = jsonb_set(
    COALESCE(raw_app_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'::jsonb
  )
WHERE email = 'admin@ebookmind.com';

-- =====================================================
-- Verify the update
-- =====================================================
SELECT 
  email,
  raw_user_meta_data,
  raw_app_meta_data
FROM auth.users
WHERE email = 'admin@ebookmind.com';

-- =====================================================
-- Migration complete
-- =====================================================
SELECT 'Migration 012 completed successfully - Admin role set!' AS status;
