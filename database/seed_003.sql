-- FoodPalace seed data for database/migrations/003_complete_clean_schema.sql
-- Do NOT run this against seed.sql / seed_simple.sql — those target an older,
-- incompatible schema (see AGENTS.md). This file matches 003 exactly.
--
-- Safe to re-run: the cleanup block below only deletes rows with the fixed
-- UUIDs used in this file (via ON DELETE CASCADE from the users table), so
-- re-running it will not touch any real signups, vendors, or orders that
-- don't share these IDs.
--
-- Run in the Supabase SQL Editor, after 003_complete_clean_schema.sql.

-- ============================================================
-- Cleanup (re-run safety) — cascades to vendors, customers,
-- addresses, dispatch_riders, menu_categories, menu_items,
-- portion_variants, and modifier_options owned by these users.
-- ============================================================
DELETE FROM users WHERE id = ANY(ARRAY[
  '11111111-0000-0000-0000-000000000001',
  '11111111-0000-0000-0000-000000000002',
  '11111111-0000-0000-0000-000000000003',
  '11111111-0000-0000-0000-000000000004',
  '11111111-0000-0000-0000-000000000005',
  '11111111-0000-0000-0000-000000000006',
  '11111111-0000-0000-0000-000000000007'
]::uuid[]);

-- ============================================================
-- Users (vendor owners, one customer, one rider, one admin)
-- ============================================================
INSERT INTO users (id, email, full_name, phone, role) VALUES
  ('11111111-0000-0000-0000-000000000001', 'owner@mamaskitchen.ng', 'Ngozi Adaeze', '+234 803 456 7890', 'vendor'),
  ('11111111-0000-0000-0000-000000000002', 'owner@royalpalacegrills.ng', 'Terhemba Iorwuese', '+234 812 998 1234', 'vendor'),
  ('11111111-0000-0000-0000-000000000003', 'owner@benuedelightbakers.ng', 'Blessing Uja', '+234 802 334 5566', 'vendor'),
  ('11111111-0000-0000-0000-000000000004', 'owner@benuefisheryspot.ng', 'Aondohemba Kwaghhar', '+234 805 778 9900', 'vendor'),
  ('11111111-0000-0000-0000-000000000005', 'emeka.daniel@example.com', 'Emeka Daniel', '+234 803 123 4567', 'customer'),
  ('11111111-0000-0000-0000-000000000006', 'terna.michael@example.com', 'Terna Michael', '+234 812 998 1234', 'dispatcher'),
  ('11111111-0000-0000-0000-000000000007', 'admin@foodpalace.ng', 'Platform Admin', '+234 800 000 0000', 'super_admin');

-- ============================================================
-- Vendors (status = 'approved' so RLS and the app's public read
-- policy both surface them immediately)
-- ============================================================
INSERT INTO vendors (
  id, user_id, business_name, description, phone, email, address, city,
  business_category, cuisine_categories, logo_url, cover_image_url,
  delivery_fee, min_order, estimated_prep_time, status,
  bank_name, account_number, account_name,
  rating, review_count, verified, famous_for, badge, badge_color, accent_color
) VALUES
  (
    '22222222-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001',
    'Mama''s Kitchen', 'Wurukum Flagship • Authentic Nigerian & Local Benue Delicacies',
    '+234 803 456 7890', 'owner@mamaskitchen.ng',
    'Plot 14 Wurukum Extension, near Total Filling Station, Makurdi, Benue State', 'Makurdi',
    'African Traditional', ARRAY['African Traditional'],
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1200&auto=format&fit=crop&q=80',
    800, 2000, 25, 'approved',
    'Guaranty Trust Bank (GTBank)', '0145892019', 'Ngozi Adaeze',
    4.8, 324, TRUE, 'Ofe Owerri, Smoky Jollof & Pounded Yam', 'Popular', 'bg-[#ea580c] text-white', '#aa2d00'
  ),
  (
    '22222222-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000002',
    'Royal Palace Grills', 'High Level, Makurdi • Charcoal Barbecue, Suya & Shawarma',
    '+234 812 998 1234', 'owner@royalpalacegrills.ng',
    '5 High-Level Commercial Way, Makurdi, Benue State', 'Makurdi',
    'Fast Food & Grills', ARRAY['Fast Food & Grills'],
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&auto=format&fit=crop&q=80',
    700, 1500, 20, 'approved',
    'Zenith Bank', '2089123490', 'Terhemba Iorwuese',
    4.9, 680, TRUE, 'Asun Platters, Spicy Ram Suya & Lebanese Shawarma', 'Fast Prep', 'bg-[#0a2e0e] text-white', '#ea580c'
  ),
  (
    '22222222-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000003',
    'Benue Delight Bakers', 'Modern Market Rd • Artisan Meat Pies, Pastries & Fresh Loaves',
    '+234 802 334 5566', 'owner@benuedelightbakers.ng',
    '42 Modern Market Road, Makurdi', 'Makurdi',
    'Bakery & Sweets', ARRAY['Bakery & Sweets'],
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80',
    650, 1200, 15, 'approved',
    'Access Bank', '0076231145', 'Blessing Uja',
    4.7, 290, TRUE, 'Spiced Beef Rolls, Glazed Doughnuts & Milk Bread', 'Top Rated', 'bg-[#aa2d00] text-white', '#d9a441'
  ),
  (
    '22222222-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000004',
    'Benue Fishery Spot', 'Riverbank Road • Native Point & Kill Fresh Catfish Broth',
    '+234 805 778 9900', 'owner@benuefisheryspot.ng',
    'River Benue Waterfront Marina, Makurdi', 'Makurdi',
    'African Traditional', ARRAY['African Traditional', 'Seafood'],
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
    850, 2500, 30, 'approved',
    'First Bank of Nigeria', '3098124451', 'Aondohemba Kwaghhar',
    4.8, 412, TRUE, 'Live Benue Catfish Pepper Soup with Agidi', 'Fresh Catch', 'bg-[#0a2e0e] text-white', '#4d6b2c'
  );

-- ============================================================
-- Customer + addresses
-- ============================================================
INSERT INTO customers (id, user_id) VALUES
  ('55555555-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000005');

INSERT INTO addresses (user_id, label, tag, address_text, landmark, instructions, is_primary) VALUES
  ('11111111-0000-0000-0000-000000000005', 'HOME', 'Primary Address',
   'Plot 14, Wurukum Extension, Makurdi, Benue State.', 'Near Total Filling Station, Wurukum Junction',
   'Call when at the gate', TRUE),
  ('11111111-0000-0000-0000-000000000005', 'OFFICE', 'Benue State Tech Hub',
   '5 High-Level Commercial Way, Makurdi.', 'Opposite State Library Board',
   'Leave with reception desk on 1st Floor', FALSE);

-- ============================================================
-- Dispatch rider
-- ============================================================
INSERT INTO dispatch_riders (user_id, phone, vehicle, plate_number, rating, orders_completed, current_location_name, available) VALUES
  ('11111111-0000-0000-0000-000000000006', '+234 812 998 1234', 'Bajaj Pulsar 150', 'MKD-441-XA (Benue)',
   4.9, 412, 'Wurukum Market bypass', TRUE);

-- ============================================================
-- Menu categories (one per distinct category actually used below)
-- ============================================================
INSERT INTO menu_categories (id, vendor_id, name, display_order) VALUES
  ('33333333-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', 'Main Dishes', 1),
  ('33333333-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000001', 'Soups & Swallows', 2),
  ('33333333-0000-0000-0000-000000000003', '22222222-0000-0000-0000-000000000001', 'Cold Drinks', 3),
  ('33333333-0000-0000-0000-000000000004', '22222222-0000-0000-0000-000000000002', 'Grills & Sides', 1),
  ('33333333-0000-0000-0000-000000000005', '22222222-0000-0000-0000-000000000003', 'Main Dishes', 1),
  ('33333333-0000-0000-0000-000000000006', '22222222-0000-0000-0000-000000000003', 'Desserts', 2),
  ('33333333-0000-0000-0000-000000000007', '22222222-0000-0000-0000-000000000004', 'Soups & Swallows', 1),
  ('33333333-0000-0000-0000-000000000008', '22222222-0000-0000-0000-000000000004', 'Grills & Sides', 2),
  ('33333333-0000-0000-0000-000000000009', '22222222-0000-0000-0000-000000000004', 'Cold Drinks', 3);

-- ============================================================
-- Menu items
-- ============================================================
INSERT INTO menu_items (
  id, vendor_id, category_id, name, description, base_price, image_url,
  category, prep_time_minutes, available, is_chef_pick, is_popular, is_spicy, tags
) VALUES
  (
    '44444444-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', '33333333-0000-0000-0000-000000000001',
    'Royal Jollof Rice Combo',
    'Signature firewood-smoked jollof rice paired with tender spiced goat meat cubes and ripe caramelized plantains (dodo).',
    4500, 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500&auto=format&fit=crop&q=80',
    'Main Dishes', 25, TRUE, TRUE, TRUE, FALSE, ARRAY['Bestseller', 'Firewood Flavour', 'Chef Pick']
  ),
  (
    '44444444-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000001', '33333333-0000-0000-0000-000000000002',
    'Egusi Soup with Assorted Goat Meat & Pounded Yam',
    'Slow-simmered melon seed soup cooked with stockfish, shaki, assorted goat meat cuts, and smooth hot pounded yam swallow.',
    4000, 'https://images.unsplash.com/photo-1626500437729-8fb9e0f79196?w=500&auto=format&fit=crop&q=80',
    'Soups & Swallows', 30, TRUE, FALSE, TRUE, FALSE, ARRAY['Traditional', 'Organic Palm Oil']
  ),
  (
    '44444444-0000-0000-0000-000000000003', '22222222-0000-0000-0000-000000000001', '33333333-0000-0000-0000-000000000002',
    'Spicy Tilapia Pepper Soup',
    'Fresh river tilapia poached in hot aromatic uziza and uda pepper soup broth. Garnished with wild mint scent leaves.',
    3800, 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=500&auto=format&fit=crop&q=80',
    'Soups & Swallows', 20, TRUE, FALSE, FALSE, TRUE, ARRAY['Spicy Hot', 'Fresh River Catch']
  ),
  (
    '44444444-0000-0000-0000-000000000004', '22222222-0000-0000-0000-000000000001', '33333333-0000-0000-0000-000000000001',
    'Fried Rice & Crispy Chicken',
    'Savory seasoned rice tossed with garden sweet peas, sweet corn, minced beef liver, served with golden spiced crispy chicken quarter.',
    3600, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80',
    'Main Dishes', 25, TRUE, FALSE, TRUE, FALSE, ARRAY['Classic Meal', 'Kids Favorite']
  ),
  (
    '44444444-0000-0000-0000-000000000005', '22222222-0000-0000-0000-000000000001', '33333333-0000-0000-0000-000000000003',
    'Zobo Fusion Drink (1 Litre Jug)',
    'Chilled native hibiscus flowers cold-infused with sweet pineapple chunks, spicy ginger root, and natural cloves.',
    1800, 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&auto=format&fit=crop&q=80',
    'Cold Drinks', 5, TRUE, FALSE, FALSE, FALSE, ARRAY['Cold Brewed', '100% Natural']
  ),
  (
    '44444444-0000-0000-0000-000000000006', '22222222-0000-0000-0000-000000000002', '33333333-0000-0000-0000-000000000004',
    'Special Suya Platter',
    'Tenderized boneless beef spiced with Northern yaji, garnished with crunchy white onion rings and cucumbers.',
    2800, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    'Grills & Sides', 15, TRUE, FALSE, TRUE, TRUE, ARRAY['Night Grill', 'Authentic Yaji']
  ),
  (
    '44444444-0000-0000-0000-000000000007', '22222222-0000-0000-0000-000000000002', '33333333-0000-0000-0000-000000000004',
    'Crispy Chicken Shawarma',
    'Double toasted Lebanese flatbread packed with spiced shredded chicken, two juicy sausages, and secret cream dressing.',
    2200, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&auto=format&fit=crop&q=80',
    'Grills & Sides', 15, TRUE, FALSE, TRUE, FALSE, ARRAY['Street Food', 'Double Wrapped']
  ),
  (
    '44444444-0000-0000-0000-000000000008', '22222222-0000-0000-0000-000000000003', '33333333-0000-0000-0000-000000000005',
    'Spiced Beef Meat Pie (Pack of 4)',
    'Flaky golden pastry filled with peppered minced beef, potatoes, and carrots. Baked fresh every morning.',
    2000, 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&auto=format&fit=crop&q=80',
    'Main Dishes', 10, TRUE, FALSE, TRUE, FALSE, ARRAY['Freshly Baked', 'On-the-go Snack']
  ),
  (
    '44444444-0000-0000-0000-000000000009', '22222222-0000-0000-0000-000000000003', '33333333-0000-0000-0000-000000000006',
    'Glazed Doughnuts (6 pcs)',
    'Soft, pillowy doughnuts finished with a sweet vanilla glaze. Best enjoyed warm.',
    1500, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop&q=80',
    'Desserts', 5, TRUE, FALSE, FALSE, FALSE, ARRAY['Sweet Treat', 'Kids Favorite']
  ),
  (
    '44444444-0000-0000-0000-00000000000a', '22222222-0000-0000-0000-000000000003', '33333333-0000-0000-0000-000000000006',
    'Milk Bread Loaf',
    'Soft, fluffy milk bread baked fresh daily, perfect for breakfast or sharing.',
    1200, 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500&auto=format&fit=crop&q=80',
    'Desserts', 5, TRUE, FALSE, FALSE, FALSE, ARRAY['Soft & Fluffy', 'Family Size']
  ),
  (
    '44444444-0000-0000-0000-00000000000b', '22222222-0000-0000-0000-000000000004', '33333333-0000-0000-0000-000000000007',
    'Live Catfish Pepper Soup with Agidi',
    'Fresh-caught Benue river catfish simmered in a fiery uziza and uda pepper broth, served with smooth agidi.',
    4200, 'https://images.unsplash.com/photo-1626200926749-33ce876fa9dd?w=500&auto=format&fit=crop&q=80',
    'Soups & Swallows', 30, TRUE, TRUE, FALSE, TRUE, ARRAY['Fresh Catch', 'River Native Point']
  ),
  (
    '44444444-0000-0000-0000-00000000000c', '22222222-0000-0000-0000-000000000004', '33333333-0000-0000-0000-000000000008',
    'Grilled Tilapia & Pepper Sauce',
    'Whole tilapia marinated in native spices, char-grilled over open coals, served with a smoky pepper sauce.',
    3500, 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=500&auto=format&fit=crop&q=80',
    'Grills & Sides', 25, TRUE, FALSE, TRUE, FALSE, ARRAY['Charcoal Grilled', 'Riverside Special']
  ),
  (
    '44444444-0000-0000-0000-00000000000d', '22222222-0000-0000-0000-000000000004', '33333333-0000-0000-0000-000000000009',
    'Chilled Ginger Drink (1 Litre)',
    'Sharp, refreshing native ginger drink, cold-pressed and lightly sweetened.',
    1500, 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&auto=format&fit=crop&q=80',
    'Cold Drinks', 5, TRUE, FALSE, FALSE, FALSE, ARRAY['Refreshing', 'Natural']
  );

-- ============================================================
-- Portion variants
-- ============================================================
INSERT INTO portion_variants (menu_item_id, name, additional_price) VALUES
  ('44444444-0000-0000-0000-000000000001', 'Standard Portion', 0),
  ('44444444-0000-0000-0000-000000000001', 'Party Portion', 1500),
  ('44444444-0000-0000-0000-000000000002', 'Standard Bowl', 0),
  ('44444444-0000-0000-0000-000000000002', 'Deluxe Jumbo Pot', 2000),
  ('44444444-0000-0000-0000-000000000003', 'Single Fillet Portion', 0),
  ('44444444-0000-0000-0000-000000000003', 'Whole Jumbo Fish', 1800),
  ('44444444-0000-0000-0000-000000000004', 'Quarter Chicken', 0),
  ('44444444-0000-0000-0000-000000000004', 'Half Crispy Chicken', 1800),
  ('44444444-0000-0000-0000-000000000006', 'Regular Pack', 0),
  ('44444444-0000-0000-0000-000000000006', 'Family Platter', 2500),
  ('44444444-0000-0000-0000-000000000007', 'Standard (1 Sausage)', 0),
  ('44444444-0000-0000-0000-000000000007', 'Double Sausage Special', 600),
  ('44444444-0000-0000-0000-00000000000b', 'Standard Cut', 0),
  ('44444444-0000-0000-0000-00000000000b', 'Whole Jumbo Catfish', 2200);

-- ============================================================
-- Modifier options
-- ============================================================
INSERT INTO modifier_options (menu_item_id, name, price) VALUES
  ('44444444-0000-0000-0000-000000000001', 'Extra Fried Plantain', 500),
  ('44444444-0000-0000-0000-000000000001', 'Pepper Sauce', 300),
  ('44444444-0000-0000-0000-000000000001', 'Boiled Egg', 250),
  ('44444444-0000-0000-0000-000000000002', 'Extra Goat Meat', 1500),
  ('44444444-0000-0000-0000-000000000002', 'Soft Peppered Kpomo', 600),
  ('44444444-0000-0000-0000-000000000003', 'Extra Habanero Pepper', 0),
  ('44444444-0000-0000-0000-000000000003', 'Hot Agidi Wrap', 400),
  ('44444444-0000-0000-0000-000000000004', 'Coleslaw with Cream', 500),
  ('44444444-0000-0000-0000-000000000004', 'Extra Drumstick', 1200),
  ('44444444-0000-0000-0000-000000000006', 'Extra Northern Yaji Pepper', 0),
  ('44444444-0000-0000-0000-000000000006', 'Fried Yam Fries', 800),
  ('44444444-0000-0000-0000-000000000007', 'Melted Cheddar Cheese', 700),
  ('44444444-0000-0000-0000-000000000008', 'Extra Pie', 500),
  ('44444444-0000-0000-0000-00000000000b', 'Extra Agidi Wrap', 400),
  ('44444444-0000-0000-0000-00000000000b', 'Extra Uziza Leaves', 0);
