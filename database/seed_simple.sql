-- FoodPalace Database Seed Data
-- Run this AFTER the schema migration is complete
-- Make sure RLS is temporarily disabled or you're using a service role

-- Insert test users (these will need to be created via Supabase Auth first)
-- For testing, create these users in the Authentication panel, then run the rest

-- Insert customers
INSERT INTO customers (user_id, full_name, phone) VALUES
  (gen_random_uuid(), 'Test Customer 1', '+2348012345678'),
  (gen_random_uuid(), 'Test Customer 2', '+2348023456789');

-- Insert vendors (you'll need to create auth users for these first)
-- Vendor 1: Mama's Kitchen
DO $$
DECLARE
  vendor_user_id UUID;
BEGIN
  -- Create vendor user record
  INSERT INTO users (email, full_name, role, password_hash)
  VALUES ('mamas.kitchen@foodpalace.ng', 'Mama''s Kitchen', 'vendor', crypt('password123', gen_salt('bf')))
  RETURNING id INTO vendor_user_id;
  
  -- Create vendor profile
  INSERT INTO vendors (user_id, business_name, slug, description, phone, commission_rate)
  VALUES (vendor_user_id, 'Mama''s Kitchen', 'mamas-kitchen', 'Authentic Nigerian home cooking', '+2348011111111', 10);
END $$;

-- Vendor 2: Burger Palace
DO $$
DECLARE
  vendor_user_id UUID;
BEGIN
  INSERT INTO users (email, full_name, role, password_hash)
  VALUES ('burger.palace@foodpalace.ng', 'Burger Palace', 'vendor', crypt('password123', gen_salt('bf')))
  RETURNING id INTO vendor_user_id;
  
  INSERT INTO vendors (user_id, business_name, slug, description, phone, commission_rate)
  VALUES (vendor_user_id, 'Burger Palace', 'burger-palace', 'Gourmet burgers and fries', '+2348022222222', 10);
END $$;

-- Vendor 3: Pizza Hub
DO $$
DECLARE
  vendor_user_id UUID;
BEGIN
  INSERT INTO users (email, full_name, role, password_hash)
  VALUES ('pizza.hub@foodpalace.ng', 'Pizza Hub', 'vendor', crypt('password123', gen_salt('bf')))
  RETURNING id INTO vendor_user_id;
  
  INSERT INTO vendors (user_id, business_name, slug, description, phone, commission_rate)
  VALUES (vendor_user_id, 'Pizza Hub', 'pizza-hub', 'Wood-fired pizzas', '+2348033333333', 10);
END $$;

-- Vendor 4: Healthy Bites
DO $$
DECLARE
  vendor_user_id UUID;
BEGIN
  INSERT INTO users (email, full_name, role, password_hash)
  VALUES ('healthy.bites@foodpalace.ng', 'Healthy Bites', 'vendor', crypt('password123', gen_salt('bf')))
  RETURNING id INTO vendor_user_id;
  
  INSERT INTO vendors (user_id, business_name, slug, description, phone, commission_rate)
  VALUES (vendor_user_id, 'Healthy Bites', 'healthy-bites', 'Salads and smoothies', '+2348044444444', 10);
END $$;

-- Insert menu categories
INSERT INTO menu_categories (name, description) VALUES
  ('Main Dishes', 'Hearty main courses'),
  ('Side Orders', 'Complements to your meal'),
  ('Drinks', 'Beverages and smoothies'),
  ('Desserts', 'Sweet treats'),
  ('Breakfast', 'Morning specials'),
  ('Combos', 'Value meal deals'),
  ('Specials', "Chef's special creations");

-- Insert menu items (assuming we have 4 vendors with IDs 1-4)
INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, preparation_time, is_available)
SELECT 
  v.id as vendor_id,
  mc.id as category_id,
  'Jollof Rice with Chicken' as name,
  'Smoky jollof rice served with grilled chicken' as description,
  2500.00 as base_price,
  'https://images.unsplash.com/photo-1604329760661-e71dc83f8f1a?w=500' as image_url,
  25 as preparation_time,
  true as is_available
FROM vendors v
CROSS JOIN menu_categories mc
WHERE v.slug = 'mamas-kitchen' AND mc.name = 'Main Dishes'
LIMIT 1;

INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, preparation_time, is_available)
SELECT 
  v.id,
  mc.id,
  'Fried Rice Special',
  'Nigerian fried rice with mixed vegetables and beef',
  2800.00,
  'https://images.unsplash.com/photo-1604329760661-e71dc83f8f1a?w=500',
  30,
  true
FROM vendors v
CROSS JOIN menu_categories mc
WHERE v.slug = 'mamas-kitchen' AND mc.name = 'Main Dishes'
LIMIT 1;

INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, preparation_time, is_available)
SELECT 
  v.id,
  mc.id,
  'Classic Beef Burger',
  'Juicy beef patty with lettuce, tomato, and special sauce',
  2000.00,
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  15,
  true
FROM vendors v
CROSS JOIN menu_categories mc
WHERE v.slug = 'burger-palace' AND mc.name = 'Main Dishes'
LIMIT 1;

INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, preparation_time, is_available)
SELECT 
  v.id,
  mc.id,
  'Chicken Burger Deluxe',
  'Crispy chicken breast with mayo and cheese',
  2200.00,
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  15,
  true
FROM vendors v
CROSS JOIN menu_categories mc
WHERE v.slug = 'burger-palace' AND mc.name = 'Main Dishes'
LIMIT 1;

INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, preparation_time, is_available)
SELECT 
  v.id,
  mc.id,
  'Pepperoni Pizza',
  'Classic pepperoni with mozzarella on thin crust',
  3500.00,
  'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
  20,
  true
FROM vendors v
CROSS JOIN menu_categories mc
WHERE v.slug = 'pizza-hub' AND mc.name = 'Main Dishes'
LIMIT 1;

INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, preparation_time, is_available)
SELECT 
  v.id,
  mc.id,
  'Margherita Pizza',
  'Fresh tomatoes, mozzarella, and basil',
  3000.00,
  'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
  20,
  true
FROM vendors v
CROSS JOIN menu_categories mc
WHERE v.slug = 'pizza-hub' AND mc.name = 'Main Dishes'
LIMIT 1;

INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, preparation_time, is_available)
SELECT 
  v.id,
  mc.id,
  'Greek Salad',
  'Fresh vegetables with feta cheese and olives',
  1800.00,
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
  10,
  true
FROM vendors v
CROSS JOIN menu_categories mc
WHERE v.slug = 'healthy-bites' AND mc.name = 'Main Dishes'
LIMIT 1;

INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, preparation_time, is_available)
SELECT 
  v.id,
  mc.id,
  'Grilled Chicken Salad',
  'Mixed greens with grilled chicken breast',
  2200.00,
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
  15,
  true
FROM vendors v
CROSS JOIN menu_categories mc
WHERE v.slug = 'healthy-bites' AND mc.name = 'Main Dishes'
LIMIT 1;

-- Insert portion variants
INSERT INTO portion_variants (menu_item_id, name, price_modifier, description)
SELECT 
  mi.id,
  'Regular',
  0.00,
  'Standard portion'
FROM menu_items mi
LIMIT 8;

INSERT INTO portion_variants (menu_item_id, name, price_modifier, description)
SELECT 
  mi.id,
  'Large',
  500.00,
  'Extra large portion'
FROM menu_items mi
LIMIT 8;

-- Insert modifier options
INSERT INTO modifier_options (menu_item_id, name, price_modifier, max_per_order)
SELECT 
  mi.id,
  'Extra Cheese',
  300.00,
  2
FROM menu_items mi
WHERE mi.name LIKE '%Burger%' OR mi.name LIKE '%Pizza%'
LIMIT 10;

INSERT INTO modifier_options (menu_item_id, name, price_modifier, max_per_order)
SELECT 
  mi.id,
  'No Onions',
  0.00,
  1
FROM menu_items mi
LIMIT 10;

INSERT INTO modifier_options (menu_item_id, name, price_modifier, max_per_order)
SELECT 
  mi.id,
  'Extra Spicy',
  0.00,
  1
FROM menu_items mi
LIMIT 10;

-- Verify data
SELECT 
  'Vendors' as table_name, 
  COUNT(*) as record_count 
FROM vendors
UNION ALL
SELECT 
  'Menu Categories', 
  COUNT(*) 
FROM menu_categories
UNION ALL
SELECT 
  'Menu Items', 
  COUNT(*) 
FROM menu_items
UNION ALL
SELECT 
  'Portion Variants', 
  COUNT(*) 
FROM portion_variants
UNION ALL
SELECT 
  'Modifier Options', 
  COUNT(*) 
FROM modifier_options;
