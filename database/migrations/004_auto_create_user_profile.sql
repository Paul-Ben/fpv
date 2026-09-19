-- FoodPalace migration 004: auto-create profile rows on signup
--
-- Fixes: "new row violates row-level security policy for table users"
-- during signup.
--
-- Root cause, two parts:
-- 1. The `users` table (and `dispatch_riders`) had RLS enabled but no
--    INSERT policy at all — only SELECT/UPDATE — so any insert was
--    rejected outright, regardless of who was making it.
-- 2. Even with a correct INSERT policy, a client-side insert issued right
--    after supabase.auth.signUp() would still fail whenever Supabase's
--    "Confirm email" setting is on (the default): there is no active
--    session until the user clicks the confirmation link, so auth.uid()
--    is null and "WITH CHECK (auth.uid() = id)" rejects the row.
--
-- The robust fix is a SECURITY DEFINER trigger on auth.users: it runs at
-- the instant the auth user is created, server-side, with elevated
-- privileges that bypass RLS entirely — independent of whether email
-- confirmation has happened yet. AuthContext.signUp() no longer inserts
-- profile rows itself; this trigger does it for every signup path.
--
-- Run this once in the Supabase SQL Editor against an already-migrated
-- database (i.e. after 003_complete_clean_schema.sql). It's also folded
-- into 003 for future clean installs.

-- Missing INSERT policies (defense in depth for any future direct
-- client-side insert; the trigger below doesn't need these itself since
-- SECURITY DEFINER bypasses RLS, but leaving these tables with no INSERT
-- policy at all was its own bug, inconsistent with customers/vendors/
-- addresses which already have one).
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Riders can insert own profile" ON dispatch_riders;
CREATE POLICY "Riders can insert own profile" ON dispatch_riders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create public.users + the role-specific profile row whenever a new
-- auth.users row is created. Reads full_name/role from the signUp() call's
-- options.data, which Supabase stores as raw_user_meta_data.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  new_role user_role;
BEGIN
  new_role := COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::user_role;

  INSERT INTO public.users (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', new_role)
  ON CONFLICT (id) DO NOTHING;

  IF new_role = 'customer' THEN
    INSERT INTO public.customers (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
  ELSIF new_role = 'vendor' THEN
    INSERT INTO public.vendors (user_id, business_name, phone, email, address)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Vendor'), '', NEW.email, '')
    ON CONFLICT (user_id) DO NOTHING;
  ELSIF new_role = 'dispatcher' THEN
    INSERT INTO public.dispatch_riders (user_id, phone, vehicle, plate_number)
    VALUES (NEW.id, '', '', '')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
