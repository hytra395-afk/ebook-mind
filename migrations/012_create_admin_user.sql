-- =====================================================
-- CREATE ADMIN USER
-- This migration creates an admin user for accessing the admin panel
-- =====================================================

-- Insert admin user with role metadata
-- Note: This uses Supabase auth.users table directly
-- In production, you should use Supabase Dashboard or API to create users

-- First, check if admin user exists
DO $$
DECLARE
  admin_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@ebookmind.com'
  ) INTO admin_exists;
  
  IF NOT admin_exists THEN
    -- Create admin user
    -- Password: 1234568@@## (you should change this after first login)
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at,
      updated_at,
      last_sign_in_at,
      raw_app_meta_data
    ) VALUES (
      gen_random_uuid(),
      'admin@ebookmind.com',
      crypt('1234568@@##', gen_salt('bf')),
      NOW(),
      '{"role": "admin"}',
      NOW(),
      NOW(),
      NOW(),
      '{"role": "admin", "provider": "email"}'
    );
    
    RAISE NOTICE 'Admin user created successfully';
  ELSE
    RAISE NOTICE 'Admin user already exists';
  END IF;
END $$;

-- =====================================================
-- Migration complete
-- =====================================================
SELECT 'Migration 012 completed successfully!' AS status;
