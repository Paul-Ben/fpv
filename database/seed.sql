-- ============================================================
-- FoodPalace Complete Database Seed Script
-- ============================================================
-- Run this ENTIRE script in Supabase SQL Editor AFTER running the migration
-- This creates sample users, vendors, menu items, and all related data
-- ============================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- STEP 1: Create Test Users in auth.users
-- ============================================================
-- Note: In production, users sign up via the app. For seeding, we create them directly.

DO $$
DECLARE
  v_user_id_1 UUID;
  v_user_id_2 UUID;
  v_user_id_3 UUID;
  v_user_id_4 UUID;
BEGIN
  -- Create Vendor User 1: Mama's Kitchen
  INSERT INTO auth.users (email, email_confirmed_at, raw_password, encrypted_password, created_at, updated_at)
  VALUES (
    'mamas.kitchen@foodpalace.ng',
    NOW(),
    'password123',
    crypt('password123', gen_salt('bf')),
    NOW(),
    NOW()
  )
  RETURNING id INTO v_user_id_1;
  
  -- Create public user record
  INSERT INTO users (id, email, full_name, phone, role)
  VALUES (v_user_id_1, 'mamas.kitchen@foodpalace.ng', 'Mama Nkechi', '+234 803 456 7890', 'vendor');
  
  -- Create Vendor User 2: Royal Palace Grills
  INSERT INTO auth.users (email, email_confirmed_at, raw_password, encrypted_password, created_at, updated_at)
  VALUES (
    'royal.grills@foodpalace.ng',
    NOW(),
    'password123',
    crypt('password123', gen_salt('bf')),
    NOW(),
    NOW()
  )
  RETURNING id INTO v_user_id_2;
  
  INSERT INTO users (id, email, full_name, phone, role)
  VALUES (v_user_id_2, 'royal.grills@foodpalace.ng', 'Chef Ibrahim', '+234 812 998 1234', 'vendor');
  
  -- Create Vendor User 3: Benue Delight Bakers
  INSERT INTO auth.users (email, email_confirmed_at, raw_password, encrypted_password, created_at, updated_at)
  VALUES (
    'benue.bakers@foodpalace.ng',
    NOW(),
    'password123',
    crypt('password123', gen_salt('bf')),
    NOW(),
    NOW()
  )
  RETURNING id INTO v_user_id_3;
  
  INSERT INTO users (id, email, full_name, phone, role)
  VALUES (v_user_id_3, 'benue.bakers@foodpalace.ng', 'Grace Aondoaver', '+234 802 334 5566', 'vendor');
  
  -- Create Vendor User 4: Benue Fishery Spot
  INSERT INTO auth.users (email, email_confirmed_at, raw_password, encrypted_password, created_at, updated_at)
  VALUES (
    'benue.fishery@foodpalace.ng',
    NOW(),
    'password123',
    crypt('password123', gen_salt('bf')),
    NOW(),
    NOW()
  )
  RETURNING id INTO v_user_id_4;
  
  INSERT INTO users (id, email, full_name, phone, role)
  VALUES (v_user_id_4, 'benue.fishery@foodpalace.ng', 'Fisherman Okpe', '+234 805 778 9900', 'vendor');
  
END $$;

-- ============================================================
-- STEP 2: Insert Vendors
-- ============================================================
INSERT INTO vendors (user_id, business_name, description, logo_url, cover_image_url, business_category, address, city, phone, email, estimated_prep_time, delivery_fee, min_order, rating, review_count, famous_for, badge, badge_color, accent_color, status, verified, bank_name, account_number, cuisine_categories) VALUES
  (
    (SELECT id FROM users WHERE email = 'mamas.kitchen@foodpalace.ng'),
    'Mama''s Kitchen',
    'Wurukum Flagship • Authentic Nigerian & Local Benue Delicacies',
    'https://lh3.googleusercontent.com/aida/AEtjO1Xi7-HktTcDMU-D4XRA3uYqLe4DxC4xxUNuZyoSs8nUTxmHVZGZpch5_I6KpEnnwVy0rLhYnRuLIxkCMNPgfjDlVn9yX1DT6YESKO5WtUuE_VDU--KfeDD9CWZlUGhJiWutjwIh-sijLcAheIXmPrtod2ONv4cj-6G12escmvqeWiH2YE6CKOzgKBOOTNnBARfR4rQVy9Z_t7fL1cXAYgs57DmyE78lB5UV-IQmBtFRTVJhji3_iA_xUDpCqJvmAdVaVo-fMfXm',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCzC8YL9-kUwYaxZ7Ue0H6rfushnZrkAn7ZENiLMRr01gbq46UB-zMgrjfR1rZaW2mAyuYgInNFxALrLD1r92d8C09qd7I-VmosDS0NDd-JS8tBfmJvfaJtorbivMfgkCOHewuqgtT2F9IFHBOvnpDmXVjydMeufmuZgkEr3cGiSibUOuBkgLockOqB6VY_NgsNtwl_apJjGcIAbrpxzCFDtuRh5dEOmdCXKQ3PKGoUtJlXfuVYe0sK',
    'African Traditional',
    'Plot 14 Wurukum Extension, near Total Filling Station, Makurdi, Benue State',
    'Makurdi',
    '+234 803 456 7890',
    'mamas.kitchen@foodpalace.ng',
    25,
    800,
    2000,
    4.8,
    324,
    'Ofe Owerri, Smoky Jollof & Pounded Yam',
    'Popular',
    'bg-[#ea580c] text-white',
    '#aa2d00',
    'approved',
    true,
    'Guaranty Trust Bank (GTBank)',
    '0145892019',
    ARRAY['African', 'Nigerian', 'Traditional']
  ),
  (
    (SELECT id FROM users WHERE email = 'royal.grills@foodpalace.ng'),
    'Royal Palace Grills',
    'High Level, Makurdi • Charcoal Barbecue, Suya & Shawarma',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=160&auto=format&fit=crop&q=80',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCLfw2UibnqPvWfDVjD5T2ulwOJ5F8GniRxS7c4Q08Qz3_FVCpPZEwENbSN-yCRLxA9wNGLnqA93KgxBT1fA3DCoRyeiDkSufuIJnVDL-9h19UUY8Eyb-K0il1k3EnTTQ74HGONgssjqipY1I8vSbA-1xadG3m8cTxXSRoSO29XZb_7nHj7dUPaXLF8579VnAItfxWV8PFcTr1u_W9d7rECKNyqZq2wXbFQkoup_FXpoJYarrBCBpuu',
    'Fast Food & Grills',
    '5 High-Level Commercial Way, Makurdi, Benue State',
    'Makurdi',
    '+234 812 998 1234',
    'royal.grills@foodpalace.ng',
    20,
    700,
    1500,
    4.9,
    680,
    'Asun Platters, Spicy Ram Suya & Lebanese Shawarma',
    'Fast Prep',
    'bg-[#0a2e0e] text-white',
    '#ea580c',
    'approved',
    true,
    'Zenith Bank',
    '2089123490',
    ARRAY['Fast Food', 'Grills', 'Suya']
  ),
  (
    (SELECT id FROM users WHERE email = 'benue.bakers@foodpalace.ng'),
    'Benue Delight Bakers',
    'Modern Market Rd • Artisan Meat Pies, Pastries & Fresh Loaves',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCu1zdfSvXl4efYC-4p2MeWQ6TqiMDTAfM7XtU5DVqll4DbM5sQHKay7_wO9KpO2dFykFnWGTvoh56inPRbT0J1MmId9m_D136sZ0rmsvAAoolFDbBU-vB29IHIuvA1CK2bolLROqqShZMQOr6i30FYSF6mPc_cEFnO-KiQ56O3rEGp19Zr12gxcqmy3boa54COPIsfz2EIa3832SLZh7a3z1WL7kaGmNNbV37MgzfeeFMD-8v0cocS',
    'Bakery & Sweets',
    '42 Modern Market Road, Makurdi',
    'Makurdi',
    '+234 802 334 5566',
    'benue.bakers@foodpalace.ng',
    15,
    650,
    1200,
    4.7,
    290,
    'Spiced Beef Rolls, Glazed Doughnuts & Milk Bread',
    'Top Rated',
    'bg-[#aa2d00] text-white',
    '#d9a441',
    'approved',
    true,
    'Access Bank',
    '0076231145',
    ARRAY['Bakery', 'Pastries', 'Breakfast']
  ),
  (
    (SELECT id FROM users WHERE email = 'benue.fishery@foodpalace.ng'),
    'Benue Fishery Spot',
    'Riverbank Road • Native Point & Kill Fresh Catfish Broth',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=160&auto=format&fit=crop&q=80',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBLqSFRFgqffYT-fS4-Lz0UH9f8q-1-5YY6nvUqarogbYXuzPxDXQfH1I-Cd-g_uIy-dbdu6-qXY942B_gJIHXDx9r93j9YXrUdYlL363MDJ2hJcFqqSx9Q7JSIrpcmBwBsedwBoyoRuFBWaIDFhiBxsqWGIbqSgjtoU9tCHDzSD7abarYv7Ct86wKIP_mpDT5ZiPSH_vlfxpuDfRzijXeSr3yi8LCfS00Y1gqrtOEOZdn9vuZ_EsWy',
    'African Traditional',
    'River Benue Waterfront Marina, Makurdi',
    'Makurdi',
    '+234 805 778 9900',
    'benue.fishery@foodpalace.ng',
    30,
    850,
    2500,
    4.8,
    412,
    'Live Benue Catfish Pepper Soup with Agidi',
    'Fresh Catch',
    'bg-[#0a2e0e] text-white',
    '#4d6b2c',
    'approved',
    true,
    'First Bank of Nigeria',
    '3098124451',
    ARRAY['Seafood', 'African', 'Traditional']
  );

-- ============================================================
-- STEP 3: Insert Menu Categories
-- ============================================================
INSERT INTO menu_categories (name, description) VALUES
  ('Main Dishes', 'Hearty meals and main courses'),
  ('Soups & Swallows', 'Traditional Nigerian soups with pounded yam, semo, etc.'),
  ('Grills & Sides', 'Barbecue, suya, and side dishes'),
  ('Cold Drinks', 'Refreshing beverages'),
  ('Desserts', 'Sweet treats and desserts'),
  ('Bakery Items', 'Fresh pastries, bread, and baked goods'),
  ('Seafood Specials', 'Fresh fish and seafood dishes')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- STEP 4: Insert Menu Items
-- ============================================================
-- Get vendor IDs for reference
DO $$
DECLARE
  v_mama_id UUID;
  v_royal_id UUID;
  v_baker_id UUID;
  v_fish_id UUID;
  v_main_cat_id UUID;
  v_soup_cat_id UUID;
  v_grill_cat_id UUID;
  v_drink_cat_id UUID;
  v_bakery_cat_id UUID;
  v_seafood_cat_id UUID;
BEGIN
  SELECT id INTO v_mama_id FROM vendors WHERE business_name = 'Mama''s Kitchen';
  SELECT id INTO v_royal_id FROM vendors WHERE business_name = 'Royal Palace Grills';
  SELECT id INTO v_baker_id FROM vendors WHERE business_name = 'Benue Delight Bakers';
  SELECT id INTO v_fish_id FROM vendors WHERE business_name = 'Benue Fishery Spot';
  
  SELECT id INTO v_main_cat_id FROM menu_categories WHERE name = 'Main Dishes';
  SELECT id INTO v_soup_cat_id FROM menu_categories WHERE name = 'Soups & Swallows';
  SELECT id INTO v_grill_cat_id FROM menu_categories WHERE name = 'Grills & Sides';
  SELECT id INTO v_drink_cat_id FROM menu_categories WHERE name = 'Cold Drinks';
  SELECT id INTO v_bakery_cat_id FROM menu_categories WHERE name = 'Bakery Items';
  SELECT id INTO v_seafood_cat_id FROM menu_categories WHERE name = 'Seafood Specials';

  -- Mama's Kitchen Menu Items
  INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, available, prep_time_minutes, is_chef_pick, is_popular, is_spicy, tags) VALUES
    (v_mama_id, v_main_cat_id, 'Royal Jollof Rice Combo', 'Signature firewood-smoked jollof rice paired with tender spiced goat meat cubes and ripe caramelized plantains (dodo).', 4500, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0qqf_TTu5aQg0nyNjfNM3pK6xoRKNxFXBPxdxyXYaEhmdheQjZT9-vOj2-GU4-qEX3InEf7_4gJCMXwLne9CAr47WJRj7kqcc2N0Uzuk8jo9lCdpsZGXEuTxvTtVGn3pxqBZBxBRK4M9m5smeiT_MA-BID_0E6fraLglTlKRCQLDZdAkRf2Fr0mRgC59mYc8_W7WPOXD7NnMuef4Yq4q9emAJZzIdVYMlhrl0aVnAhLA-TV82uPqI', true, 25, true, true, false, ARRAY['Bestseller', 'Firewood Flavour', 'Chef Pick']),
    (v_mama_id, v_soup_cat_id, 'Egusi Soup with Assorted Goat Meat & Pounded Yam', 'Slow-simmered melon seed soup cooked with stockfish, shaki, assorted goat meat cuts, and smooth hot pounded yam swallow.', 4000, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjZZp225To6nevVs0eMV-Mmc8xkuj9NwBfKPeLfGgrSDMiQ9_uUMXwAJoUJDf0_MNaJOqU7OdP7Em8r75os8jaDXab88K_L_cFRhXzMqM2iHjAvsHlY6f1cXC6acrVbJEbOpwazAAtPZkahQTMO-c1vOv9X1X8h1C8Hjy5vqtaRDEOjr62XpTyFr13mTVMa7UWu5AapnQlcoRE80AFyIAoTXUJAb6mY7yKdZtTkMlBCU2hWNhA29U', true, 30, false, true, false, ARRAY['Traditional', 'Organic Palm Oil']),
    (v_mama_id, v_soup_cat_id, 'Spicy Tilapia Pepper Soup', 'Fresh river tilapia poached in hot aromatic uziza and uda pepper soup broth. Garnished with wild mint scent leaves.', 3800, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLqSFRFgqffYT-fS4-Lz0UH9f8q-1-5YY6nvUqarogbYXuzPxDXQfH1I-Cd-g_uIy-dbdu6-qXY942B_gJIHXDx9r93j9YXrUdYlL363MDJ2hJcFqqSx9Q7JSIrpcmBwBsedwBoyoRuFBWaIDFhiBxsqWGIbqSgjtoU9tCHDzSD7abarYv7Ct86wKIP_mpDT5ZiPSH_vlfxpuDfRzijXeSr3yi8LCfS00Y1gqrtOEOZdn9vuZ_EsWy', true, 20, false, false, true, ARRAY['Spicy Hot', 'Fresh River Catch']),
    (v_mama_id, v_main_cat_id, 'Fried Rice & Crispy Chicken', 'Savory seasoned rice tossed with garden sweet peas, sweet corn, minced beef liver, served with golden spiced crispy chicken quarter.', 3600, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80', true, 25, false, true, false, ARRAY['Classic Meal', 'Kids Favorite']),
    (v_mama_id, v_drink_cat_id, 'Zobo Fusion Drink (1 Litre Jug)', 'Chilled native hibiscus flowers cold-infused with sweet pineapple chunks, spicy ginger root, and natural cloves.', 1800, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV-fVarBwZUS2qXEoOZSl_-b1ELmbpoF7pvFzufHi1UUX176-QWseeCO1ltRYtHrwlVis4lNFO5tThY_z0-vvhHZcRTfrXsMygtp9vjxksgp6J6fgQMQTrFFwBWE0N-XUU9SBKrVr5mDbzXnQL-7AaYFzIPlu7S5dcg0Bb0V6QfnOfuu6bt0GBKLTCYcquRmTOH_YedqXuV5NYLhjBxf4RSKmRAFtCuHaWsz2-VOlQ8gdSsbi4vHLY', true, 5, false, false, false, ARRAY['Cold Brewed', '100% Natural']);

  -- Royal Palace Grills Menu Items
  INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, available, prep_time_minutes, is_chef_pick, is_popular, is_spicy, tags) VALUES
    (v_royal_id, v_grill_cat_id, 'Special Suya Platter', 'Tenderized boneless beef spiced with Northern yaji, garnished with crunchy white onion rings and cucumbers.', 2800, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLiD6tr2tE5QPgMFY4MbwRzDX8B1fgpWSfn1OthcWpWdq2B3V5Yi8sh3Io1gWOMHzTJNxG8GRalR9aZROt3HwJnHdbYlZa3YLXVez1cnb5qDJ2zddixDzF9QR5hfud8N9uheurxm03cOaJcx1ixCOSpB4QM_OuRwzoAUFMogq2qT0ZNukUCSDHZLu_eaZn9v9LhEG5YN9vy9FXk6IXvSEcuIs2T57DPI4HlwbbcKm5Xe6nD3HhUvHc', true, 15, false, true, true, ARRAY['Night Grill', 'Authentic Yaji']),
    (v_royal_id, v_grill_cat_id, 'Crispy Chicken Shawarma', 'Double toasted Lebanese flatbread packed with spiced shredded chicken, two juicy sausages, and secret cream dressing.', 2200, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo-MrMMmECxl8oDC6gPDZm8lepx4ncwZLChmTEs6A44r6tEkPBYt8oZPzVOZy79WmpTdfmOFl34AuVKYJdNPzjKB2zWNbY51CgzPStsieek0p6IEr98fEuz4JnHomn1N9O2jjpjMNJYUWJVudgGB7dfjnx7UwtojKuG3NFuovFVk_t7XnFLOWK3qOwiTp1NiGFUHE96EwaZn2G2T1qGPNIqI0m4lLxDyxqYi8Gtnn0cFNILb87h5aF', true, 15, false, true, false, ARRAY['Street Food', 'Double Wrapped']);

  -- Benue Delight Bakers Menu Items
  INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, available, prep_time_minutes, is_chef_pick, is_popular, is_spicy, tags) VALUES
    (v_baker_id, v_bakery_cat_id, 'Spiced Beef Roll', 'Flaky pastry crust filled with seasoned minced beef, carrots, and aromatic spices.', 800, 'https://images.unsplash.com/photo-1572383672419-ab47799d26c0?w=500&auto=format&fit=crop&q=80', true, 10, false, true, false, ARRAY['Breakfast', 'On-the-Go']),
    (v_baker_id, v_bakery_cat_id, 'Glazed Doughnut (Box of 6)', 'Soft fluffy doughnuts with sweet vanilla glaze coating.', 1500, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=80', true, 5, false, true, false, ARRAY['Sweet Treat', 'Family Pack']);

  -- Benue Fishery Spot Menu Items
  INSERT INTO menu_items (vendor_id, category_id, name, description, base_price, image_url, available, prep_time_minutes, is_chef_pick, is_popular, is_spicy, tags) VALUES
    (v_fish_id, v_seafood_cat_id, 'Catfish Pepper Soup (Whole Fish)', 'Live fresh catfish from River Benue, boiled in spicy native pepper broth with uziza seeds and scent leaves.', 5500, 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80', true, 30, true, true, true, ARRAY['Fresh Catch', 'Signature Dish']),
    (v_fish_id, v_seafood_cat_id, 'Grilled Tilapia with Jollof', 'Charcoal grilled whole tilapia served with smoky jollof rice and fried plantain.', 4200, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=80', true, 25, false, true, false, ARRAY['Grilled', 'Complete Meal']);

END $$;

-- ============================================================
-- STEP 5: Insert Portion Variants
-- ============================================================
DO $$
DECLARE
  v_jollof_id UUID;
  v_egusi_id UUID;
  v_pepper_soup_id UUID;
  v_fried_rice_id UUID;
  v_suya_id UUID;
  v_shawarma_id UUID;
BEGIN
  SELECT id INTO v_jollof_id FROM menu_items WHERE name = 'Royal Jollof Rice Combo';
  SELECT id INTO v_egusi_id FROM menu_items WHERE name = 'Egusi Soup with Assorted Goat Meat & Pounded Yam';
  SELECT id INTO v_pepper_soup_id FROM menu_items WHERE name = 'Spicy Tilapia Pepper Soup';
  SELECT id INTO v_fried_rice_id FROM menu_items WHERE name = 'Fried Rice & Crispy Chicken';
  SELECT id INTO v_suya_id FROM menu_items WHERE name = 'Special Suya Platter';
  SELECT id INTO v_shawarma_id FROM menu_items WHERE name = 'Crispy Chicken Shawarma';

  INSERT INTO portion_variants (menu_item_id, name, additional_price) VALUES
    (v_jollof_id, 'Standard Portion', 0),
    (v_jollof_id, 'Party Portion (+₦1,500)', 1500),
    (v_egusi_id, 'Standard Bowl', 0),
    (v_egusi_id, 'Deluxe Jumbo Pot (+₦2,000)', 2000),
    (v_pepper_soup_id, 'Single Fillet Portion', 0),
    (v_pepper_soup_id, 'Whole Jumbo Fish (+₦1,800)', 1800),
    (v_fried_rice_id, 'Quarter Chicken', 0),
    (v_fried_rice_id, 'Half Crispy Chicken (+₦1,800)', 1800),
    (v_suya_id, 'Regular Pack', 0),
    (v_suya_id, 'Family Platter (+₦2,500)', 2500),
    (v_shawarma_id, 'Standard (1 Sausage)', 0),
    (v_shawarma_id, 'Double Sausage Special (+₦600)', 600);
END $$;

-- ============================================================
-- STEP 6: Insert Modifier Options
-- ============================================================
DO $$
DECLARE
  v_jollof_id UUID;
  v_egusi_id UUID;
  v_pepper_soup_id UUID;
  v_fried_rice_id UUID;
  v_suya_id UUID;
  v_shawarma_id UUID;
BEGIN
  SELECT id INTO v_jollof_id FROM menu_items WHERE name = 'Royal Jollof Rice Combo';
  SELECT id INTO v_egusi_id FROM menu_items WHERE name = 'Egusi Soup with Assorted Goat Meat & Pounded Yam';
  SELECT id INTO v_pepper_soup_id FROM menu_items WHERE name = 'Spicy Tilapia Pepper Soup';
  SELECT id INTO v_fried_rice_id FROM menu_items WHERE name = 'Fried Rice & Crispy Chicken';
  SELECT id INTO v_suya_id FROM menu_items WHERE name = 'Special Suya Platter';
  SELECT id INTO v_shawarma_id FROM menu_items WHERE name = 'Crispy Chicken Shawarma';

  INSERT INTO modifier_options (menu_item_id, name, price) VALUES
    (v_jollof_id, 'Extra Fried Plantain (+₦500)', 500),
    (v_jollof_id, 'Pepper Sauce (+₦300)', 300),
    (v_jollof_id, 'Boiled Egg (+₦250)', 250),
    (v_egusi_id, 'Extra Goat Meat (+₦1,500)', 1500),
    (v_egusi_id, 'Soft Peppered Kpomo (+₦600)', 600),
    (v_pepper_soup_id, 'Extra Habanero Pepper (Free)', 0),
    (v_pepper_soup_id, 'Hot Agidi Wrap (+₦400)', 400),
    (v_fried_rice_id, 'Coleslaw with Cream (+₦500)', 500),
    (v_fried_rice_id, 'Extra Drumstick (+₦1,200)', 1200),
    (v_suya_id, 'Extra Northern Yaji Pepper (Free)', 0),
    (v_suya_id, 'Fried Yam Fries (+₦800)', 800),
    (v_shawarma_id, 'Melted Cheddar Cheese (+₦700)', 700);
END $$;

-- ============================================================
-- COMPLETE!
-- ============================================================
-- Your database is now seeded with:
-- ✅ 4 Vendor Users (with auth credentials)
-- ✅ 4 Vendors (approved and verified)
-- ✅ 7 Menu Categories
-- ✅ 11 Menu Items
-- ✅ 12 Portion Variants
-- ✅ 12 Modifier Options
--
-- Test Login Credentials:
-- Email: mamas.kitchen@foodpalace.ng
-- Password: password123
--
-- You can now test the application!
-- ============================================================
