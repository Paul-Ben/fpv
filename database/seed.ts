/**
 * Seed script to populate Supabase database with initial data
 * Run this once after setting up the database schema
 * 
 * Usage: npx tsx database/seed.ts
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/lib/database.types';
import ws from 'ws';

// Configuration
const supabaseUrl = 'https://rqejuibrqtybkrpaglgg.supabase.co';
const supabaseKey = 'sb_publishable_xjoNOQO4RjoaMO8xBJsY8w_o1hUoirV';

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  realtime: {
    transport: ws
  }
});

// Initial Vendors Data
const vendors = [
  {
    business_name: "Mama's Kitchen",
    description: 'Wurukum Flagship • Authentic Nigerian & Local Benue Delicacies',
    logo_url: 'https://lh3.googleusercontent.com/aida/AEtjO1Xi7-HktTcDMU-D4XRA3uYqLe4DxC4xxUNuZyoSs8nUTxmHVZGZpch5_I6KpEnnwVy0rLhYnRuLIxkCMNPgfjDlVn9yX1DT6YESKO5WtUuE_VDU--KfeDD9CWZlUGhJiWutjwIh-sijLcAheIXmPrtod2ONv4cj-6G12escmvqeWiH2YE6CKOzgKBOOTNnBARfR4rQVy9Z_t7fL1cXAYgs57DmyE78lB5UV-IQmBtFRTVJhji3_iA_xUDpCqJvmAdVaVo-fMfXm',
    cover_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzC8YL9-kUwYaxZ7Ue0H6rfushnZrkAn7ZENiLMRr01gbq46UB-zMgrjfR1rZaW2mAyuYgInNFxALrLD1r92d8C09qd7I-VmosDS0NDd-JS8tBfmJvfaJtorbivMfgkCOHewuqgtT2F9IFHBOvnpDmXVjydMeufmuZgkEr3cGiSibUOuBkgLockOqB6VY_NgsNtwl_apJjGcIAbrpxzCFDtuRh5dEOmdCXKQ3PKGoUtJlXfuVYe0sK',
    business_category: 'African Traditional',
    address: 'Plot 14 Wurukum Extension, near Total Filling Station, Makurdi, Benue State',
    city: 'Makurdi' as const,
    phone: '+234 803 456 7890',
    estimated_prep_time: 25,
    delivery_fee: 800,
    min_order: 2000,
    rating: 4.8,
    review_count: 324,
    famous_for: 'Ofe Owerri, Smoky Jollof & Pounded Yam',
    badge: 'Popular',
    badge_color: 'bg-[#ea580c] text-white',
    accent_color: '#aa2d00',
    status: 'approved' as const,
    verified: true,
    bank_name: 'Guaranty Trust Bank (GTBank)',
    account_number: '0145892019',
    cuisine_categories: ['African', 'Nigerian', 'Traditional'],
  },
  {
    business_name: 'Royal Palace Grills',
    description: 'High Level, Makurdi • Charcoal Barbecue, Suya & Shawarma',
    logo_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLfw2UibnqPvWfDVjD5T2ulwOJ5F8GniRxS7c4Q08Qz3_FVCpPZEwENbSN-yCRLxA9wNGLnqA93KgxBT1fA3DCoRyeiDkSufuIJnVDL-9h19UUY8Eyb-K0il1k3EnTTQ74HGONgssjqipY1I8vSbA-1xadG3m8cTxXSRoSO29XZb_7nHj7dUPaXLF8579VnAItfxWV8PFcTr1u_W9d7rECKNyqZq2wXbFQkoup_FXpoJYarrBCBpuu',
    business_category: 'Fast Food & Grills',
    address: '5 High-Level Commercial Way, Makurdi, Benue State',
    city: 'Makurdi' as const,
    phone: '+234 812 998 1234',
    estimated_prep_time: 20,
    delivery_fee: 700,
    min_order: 1500,
    rating: 4.9,
    review_count: 680,
    famous_for: 'Asun Platters, Spicy Ram Suya & Lebanese Shawarma',
    badge: 'Fast Prep',
    badge_color: 'bg-[#0a2e0e] text-white',
    accent_color: '#ea580c',
    status: 'approved' as const,
    verified: true,
    bank_name: 'Zenith Bank',
    account_number: '2089123490',
    cuisine_categories: ['Fast Food', 'Grills', 'Suya'],
  },
  {
    business_name: 'Benue Delight Bakers',
    description: 'Modern Market Rd • Artisan Meat Pies, Pastries & Fresh Loaves',
    logo_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu1zdfSvXl4efYC-4p2MeWQ6TqiMDTAfM7XtU5DVqll4DbM5sQHKay7_wO9KpO2dFykFnWGTvoh56inPRbT0J1MmId9m_D136sZ0rmsvAAoolFDbBU-vB29IHIuvA1CK2bolLROqqShZMQOr6i30FYSF6mPc_cEFnO-KiQ56O3rEGp19Zr12gxcqmy3boa54COPIsfz2EIa3832SLZh7a3z1WL7kaGmNNbV37MgzfeeFMD-8v0cocS',
    business_category: 'Bakery & Sweets',
    address: '42 Modern Market Road, Makurdi',
    city: 'Makurdi' as const,
    phone: '+234 802 334 5566',
    estimated_prep_time: 15,
    delivery_fee: 650,
    min_order: 1200,
    rating: 4.7,
    review_count: 290,
    famous_for: 'Spiced Beef Rolls, Glazed Doughnuts & Milk Bread',
    badge: 'Top Rated',
    badge_color: 'bg-[#aa2d00] text-white',
    accent_color: '#d9a441',
    status: 'approved' as const,
    verified: true,
    bank_name: 'Access Bank',
    account_number: '0076231145',
    cuisine_categories: ['Bakery', 'Pastries', 'Breakfast'],
  },
  {
    business_name: 'Benue Fishery Spot',
    description: 'Riverbank Road • Native Point & Kill Fresh Catfish Broth',
    logo_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLqSFRFgqffYT-fS4-Lz0UH9f8q-1-5YY6nvUqarogbYXuzPxDXQfH1I-Cd-g_uIy-dbdu6-qXY942B_gJIHXDx9r93j9YXrUdYlL363MDJ2hJcFqqSx9Q7JSIrpcmBwBsedwBoyoRuFBWaIDFhiBxsqWGIbqSgjtoU9tCHDzSD7abarYv7Ct86wKIP_mpDT5ZiPSH_vlfxpuDfRzijXeSr3yi8LCfS00Y1gqrtOEOZdn9vuZ_EsWy',
    business_category: 'African Traditional',
    address: 'River Benue Waterfront Marina, Makurdi',
    city: 'Makurdi' as const,
    phone: '+234 805 778 9900',
    estimated_prep_time: 30,
    delivery_fee: 850,
    min_order: 2500,
    rating: 4.8,
    review_count: 412,
    famous_for: 'Live Benue Catfish Pepper Soup with Agidi',
    badge: 'Fresh Catch',
    badge_color: 'bg-[#0a2e0e] text-white',
    accent_color: '#4d6b2c',
    status: 'approved' as const,
    verified: true,
    bank_name: 'First Bank of Nigeria',
    account_number: '3098124451',
    cuisine_categories: ['Seafood', 'African', 'Traditional'],
  },
];

// Menu Categories
const menuCategories = [
  { id: 'main-dishes', name: 'Main Dishes', vendor_id: 'mamas-kitchen' },
  { id: 'soups-swallows', name: 'Soups & Swallows', vendor_id: 'mamas-kitchen' },
  { id: 'cold-drinks', name: 'Cold Drinks', vendor_id: 'mamas-kitchen' },
  { id: 'grills-sides', name: 'Grills & Sides', vendor_id: 'royal-palace-grills' },
  { id: 'bakery-items', name: 'Bakery Items', vendor_id: 'benue-delight-bakers' },
  { id: 'seafood-specials', name: 'Seafood Specials', vendor_id: 'benue-fishery-spot' },
];

// Menu Items
const menuItems = [
  // Mama's Kitchen Items
  {
    id: 'm-jollof-combo',
    vendor_id: 'mamas-kitchen',
    category_id: 'main-dishes',
    name: 'Royal Jollof Rice Combo',
    description: 'Signature firewood-smoked jollof rice paired with tender spiced goat meat cubes and ripe caramelized plantains (dodo).',
    base_price: 4500,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0qqf_TTu5aQg0nyNjfNM3pK6xoRKNxFXBPxdxyXYaEhmdheQjZT9-vOj2-GU4-qEX3InEf7_4gJCMXwLne9CAr47WJRj7kqcc2N0Uzuk8jo9lCdpsZGXEuTxvTtVGn3pxqBZBxBRK4M9m5smeiT_MA-BID_0E6fraLglTlKRCQLDZdAkRf2Fr0mRgC59mYc8_W7WPOXD7NnMuef4Yq4q9emAJZzIdVYMlhrl0aVnAhLA-TV82uPqI',
    available: true,
    prep_time_minutes: 25,
    is_chef_pick: true,
    is_popular: true,
    is_spicy: false,
    tags: ['Bestseller', 'Firewood Flavour', 'Chef Pick'],
  },
  {
    id: 'm-egusi-goat',
    vendor_id: 'mamas-kitchen',
    category_id: 'soups-swallows',
    name: 'Egusi Soup with Assorted Goat Meat & Pounded Yam',
    description: 'Slow-simmered melon seed soup cooked with stockfish, shaki, assorted goat meat cuts, and smooth hot pounded yam swallow.',
    base_price: 4000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjZZp225To6nevVs0eMV-Mmc8xkuj9NwBfKPeLfGgrSDMiQ9_uUMXwAJoUJDf0_MNaJOqU7OdP7Em8r75os8jaDXab88K_L_cFRhXzMqM2iHjAvsHlY6f1cXC6acrVbJEbOpwazAAtPZkahQTMO-c1vOv9X1X8h1C8Hjy5vqtaRDEOjr62XpTyFr13mTVMa7UWu5AapnQlcoRE80AFyIAoTXUJAb6mY7yKdZtTkMlBCU2hWNhA29U',
    available: true,
    prep_time_minutes: 30,
    is_chef_pick: false,
    is_popular: true,
    is_spicy: false,
    tags: ['Traditional', 'Organic Palm Oil'],
  },
  {
    id: 'm-tilapia-pepper',
    vendor_id: 'mamas-kitchen',
    category_id: 'soups-swallows',
    name: 'Spicy Tilapia Pepper Soup',
    description: 'Fresh river tilapia poached in hot aromatic uziza and uda pepper soup broth. Garnished with wild mint scent leaves.',
    base_price: 3800,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLqSFRFgqffYT-fS4-Lz0UH9f8q-1-5YY6nvUqarogbYXuzPxDXQfH1I-Cd-g_uIy-dbdu6-qXY942B_gJIHXDx9r93j9YXrUdYlL363MDJ2hJcFqqSx9Q7JSIrpcmBwBsedwBoyoRuFBWaIDFhiBxsqWGIbqSgjtoU9tCHDzSD7abarYv7Ct86wKIP_mpDT5ZiPSH_vlfxpuDfRzijXeSr3yi8LCfS00Y1gqrtOEOZdn9vuZ_EsWy',
    available: true,
    prep_time_minutes: 20,
    is_chef_pick: false,
    is_popular: false,
    is_spicy: true,
    tags: ['Spicy Hot', 'Fresh River Catch'],
  },
  {
    id: 'm-fried-rice-chicken',
    vendor_id: 'mamas-kitchen',
    category_id: 'main-dishes',
    name: 'Fried Rice & Crispy Chicken',
    description: 'Savory seasoned rice tossed with garden sweet peas, sweet corn, minced beef liver, served with golden spiced crispy chicken quarter.',
    base_price: 3600,
    image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80',
    available: true,
    prep_time_minutes: 25,
    is_chef_pick: false,
    is_popular: true,
    is_spicy: false,
    tags: ['Classic Meal', 'Kids Favorite'],
  },
  {
    id: 'm-zobo-fusion',
    vendor_id: 'mamas-kitchen',
    category_id: 'cold-drinks',
    name: 'Zobo Fusion Drink (1 Litre Jug)',
    description: 'Chilled native hibiscus flowers cold-infused with sweet pineapple chunks, spicy ginger root, and natural cloves.',
    base_price: 1800,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV-fVarBwZUS2qXEoOZSl_-b1ELmbpoF7pvFzufHi1UUX176-QWseeCO1ltRYtHrwlVis4lNFO5tThY_z0-vvhHZcRTfrXsMygtp9vjxksgp6J6fgQMQTrFFwBWE0N-XUU9SBKrVr5mDbzXnQL-7AaYFzIPlu7S5dcg0Bb0V6QfnOfuu6bt0GBKLTCYcquRmTOH_YedqXuV5NYLhjBxf4RSKmRAFtCuHaWsz2-VOlQ8gdSsbi4vHLY',
    available: true,
    prep_time_minutes: 5,
    is_chef_pick: false,
    is_popular: false,
    is_spicy: false,
    tags: ['Cold Brewed', '100% Natural'],
  },
  // Royal Palace Grills Items
  {
    id: 'r-special-suya',
    vendor_id: 'royal-palace-grills',
    category_id: 'grills-sides',
    name: 'Special Suya Platter',
    description: 'Tenderized boneless beef spiced with Northern yaji, garnished with crunchy white onion rings and cucumbers.',
    base_price: 2800,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLiD6tr2tE5QPgMFY4MbwRzDX8B1fgpWSfn1OthcWpWdq2B3V5Yi8sh3Io1gWOMHzTJNxG8GRalR9aZROt3HwJnHdbYlZa3YLXVez1cnb5qDJ2zddixDzF9QR5hfud8N9uheurxm03cOaJcx1ixCOSpB4QM_OuRwzoAUFMogq2qT0ZNukUCSDHZLu_eaZn9v9LhEG5YN9vy9FXk6IXvSEcuIs2T57DPI4HlwbbcKm5Xe6nD3HhUvHc',
    available: true,
    prep_time_minutes: 15,
    is_chef_pick: false,
    is_popular: true,
    is_spicy: true,
    tags: ['Night Grill', 'Authentic Yaji'],
  },
  {
    id: 'r-chicken-shawarma',
    vendor_id: 'royal-palace-grills',
    category_id: 'grills-sides',
    name: 'Crispy Chicken Shawarma',
    description: 'Double toasted Lebanese flatbread packed with spiced shredded chicken, two juicy sausages, and secret cream dressing.',
    base_price: 2200,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo-MrMMmECxl8oDC6gPDZm8lepx4ncwZLChmTEs6A44r6tEkPBYt8oZPzVOZy79WmpTdfmOFl34AuVKYJdNPzjKB2zWNbY51CgzPStsieek0p6IEr98fEuz4JnHomn1N9O2jjpjMNJYUWJVudgGB7dfjnx7UwtojKuG3NFuovFVk_t7XnFLOWK3qOwiTp1NiGFUHE96EwaZn2G2T1qGPNIqI0m4lLxDyxqYi8Gtnn0cFNILb87h5aF',
    available: true,
    prep_time_minutes: 15,
    is_chef_pick: false,
    is_popular: true,
    is_spicy: false,
    tags: ['Street Food', 'Double Wrapped'],
  },
];

// Portion Variants
const portionVariants = [
  { id: 'std-jollof', menu_item_id: 'm-jollof-combo', name: 'Standard Portion', additional_price: 0 },
  { id: 'party-jollof', menu_item_id: 'm-jollof-combo', name: 'Party Portion (+₦1,500)', additional_price: 1500 },
  { id: 'reg-egusi', menu_item_id: 'm-egusi-goat', name: 'Standard Bowl', additional_price: 0 },
  { id: 'lg-egusi', menu_item_id: 'm-egusi-goat', name: 'Deluxe Jumbo Pot (+₦2,000)', additional_price: 2000 },
  { id: 'std-tilapia', menu_item_id: 'm-tilapia-pepper', name: 'Single Fillet Portion', additional_price: 0 },
  { id: 'whole-tilapia', menu_item_id: 'm-tilapia-pepper', name: 'Whole Jumbo Fish (+₦1,800)', additional_price: 1800 },
  { id: 'std-fried', menu_item_id: 'm-fried-rice-chicken', name: 'Quarter Chicken', additional_price: 0 },
  { id: 'half-fried', menu_item_id: 'm-fried-rice-chicken', name: 'Half Crispy Chicken (+₦1,800)', additional_price: 1800 },
  { id: 'reg-suya', menu_item_id: 'r-special-suya', name: 'Regular Pack', additional_price: 0 },
  { id: 'jumbo-suya', menu_item_id: 'r-special-suya', name: 'Family Platter (+₦2,500)', additional_price: 2500 },
  { id: 'std-shawarma', menu_item_id: 'r-chicken-shawarma', name: 'Standard (1 Sausage)', additional_price: 0 },
  { id: 'double-shawarma', menu_item_id: 'r-chicken-shawarma', name: 'Double Sausage Special (+₦600)', additional_price: 600 },
];

// Modifier Options
const modifierOptions = [
  { id: 'plantain', menu_item_id: 'm-jollof-combo', name: 'Extra Fried Plantain (+₦500)', price: 500 },
  { id: 'pepper-sauce', menu_item_id: 'm-jollof-combo', name: 'Pepper Sauce (+₦300)', price: 300 },
  { id: 'boiled-egg', menu_item_id: 'm-jollof-combo', name: 'Boiled Egg (+₦250)', price: 250 },
  { id: 'extra-goat', menu_item_id: 'm-egusi-goat', name: 'Extra Goat Meat (+₦1,500)', price: 1500 },
  { id: 'kpomo', menu_item_id: 'm-egusi-goat', name: 'Soft Peppered Kpomo (+₦600)', price: 600 },
  { id: 'extra-pepper', menu_item_id: 'm-tilapia-pepper', name: 'Extra Habanero Pepper (Free)', price: 0 },
  { id: 'agidi-wrap', menu_item_id: 'm-tilapia-pepper', name: 'Hot Agidi Wrap (+₦400)', price: 400 },
  { id: 'salad', menu_item_id: 'm-fried-rice-chicken', name: 'Coleslaw with Cream (+₦500)', price: 500 },
  { id: 'extra-chicken', menu_item_id: 'm-fried-rice-chicken', name: 'Extra Drumstick (+₦1,200)', price: 1200 },
  { id: 'extra-yaji', menu_item_id: 'r-special-suya', name: 'Extra Northern Yaji Pepper (Free)', price: 0 },
  { id: 'fried-yam', menu_item_id: 'r-special-suya', name: 'Fried Yam Fries (+₦800)', price: 800 },
  { id: 'extra-cheese', menu_item_id: 'r-chicken-shawarma', name: 'Melted Cheddar Cheese (+₦700)', price: 700 },
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Insert Vendors
    console.log('📦 Inserting vendors...');
    const { data: insertedVendors, error: vendorError } = await supabase
      .from('vendors')
      .insert(vendors)
      .select();

    if (vendorError) throw vendorError;
    console.log(`✅ Inserted ${insertedVendors?.length} vendors\n`);

    // Create mapping from business_name to generated UUID
    const vendorIdMap: Record<string, string> = {};
    insertedVendors?.forEach(v => {
      if (v.business_name === "Mama's Kitchen") vendorIdMap['mamas-kitchen'] = v.id;
      if (v.business_name === 'Royal Palace Grills') vendorIdMap['royal-palace-grills'] = v.id;
      if (v.business_name === 'Benue Delight Bakers') vendorIdMap['benue-delight-bakers'] = v.id;
      if (v.business_name === 'Benue Fishery Spot') vendorIdMap['benue-fishery-spot'] = v.id;
    });

    // Insert Menu Categories
    console.log('📂 Inserting menu categories...');
    const menuCategoriesWithIds = [
      { id: 'main-dishes', name: 'Main Dishes', vendor_id: vendorIdMap['mamas-kitchen'] },
      { id: 'soups-swallows', name: 'Soups & Swallows', vendor_id: vendorIdMap['mamas-kitchen'] },
      { id: 'cold-drinks', name: 'Cold Drinks', vendor_id: vendorIdMap['mamas-kitchen'] },
      { id: 'grills-sides', name: 'Grills & Sides', vendor_id: vendorIdMap['royal-palace-grills'] },
      { id: 'bakery-items', name: 'Bakery Items', vendor_id: vendorIdMap['benue-delight-bakers'] },
      { id: 'seafood-specials', name: 'Seafood Specials', vendor_id: vendorIdMap['benue-fishery-spot'] },
    ];

    const { data: insertedCategories, error: categoryError } = await supabase
      .from('menu_categories')
      .upsert(menuCategoriesWithIds, { onConflict: 'id' })
      .select();

    if (categoryError) throw categoryError;
    console.log(`✅ Inserted ${insertedCategories?.length} categories\n`);

    // Insert Menu Items
    console.log('🍽️ Inserting menu items...');
    const menuItemsWithIds = [
      // Mama's Kitchen Items
      {
        id: 'm-jollof-combo',
        vendor_id: vendorIdMap['mamas-kitchen'],
        category_id: 'main-dishes',
        name: 'Royal Jollof Rice Combo',
        description: 'Signature firewood-smoked jollof rice paired with tender spiced goat meat cubes and ripe caramelized plantains (dodo).',
        base_price: 4500,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0qqf_TTu5aQg0nyNjfNM3pK6xoRKNxFXBPxdxyXYaEhmdheQjZT9-vOj2-GU4-qEX3InEf7_4gJCMXwLne9CAr47WJRj7kqcc2N0Uzuk8jo9lCdpsZGXEuTxvTtVGn3pxqBZBxBRK4M9m5smeiT_MA-BID_0E6fraLglTlKRCQLDZdAkRf2Fr0mRgC59mYc8_W7WPOXD7NnMuef4Yq4q9emAJZzIdVYMlhrl0aVnAhLA-TV82uPqI',
        available: true,
        prep_time_minutes: 25,
        is_chef_pick: true,
        is_popular: true,
        is_spicy: false,
        tags: ['Bestseller', 'Firewood Flavour', 'Chef Pick'],
      },
      {
        id: 'm-egusi-goat',
        vendor_id: vendorIdMap['mamas-kitchen'],
        category_id: 'soups-swallows',
        name: 'Egusi Soup with Assorted Goat Meat & Pounded Yam',
        description: 'Slow-simmered melon seed soup cooked with stockfish, shaki, assorted goat meat cuts, and smooth hot pounded yam swallow.',
        base_price: 4000,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjZZp225To6nevVs0eMV-Mmc8xkuj9NwBfKPeLfGgrSDMiQ9_uUMXwAJoUJDf0_MNaJOqU7OdP7Em8r75os8jaDXab88K_L_cFRhXzMqM2iHjAvsHlY6f1cXC6acrVbJEbOpwazAAtPZkahQTMO-c1vOv9X1X8h1C8Hjy5vqtaRDEOjr62XpTyFr13mTVMa7UWu5AapnQlcoRE80AFyIAoTXUJAb6mY7yKdZtTkMlBCU2hWNhA29U',
        available: true,
        prep_time_minutes: 30,
        is_chef_pick: false,
        is_popular: true,
        is_spicy: false,
        tags: ['Traditional', 'Organic Palm Oil'],
      },
      {
        id: 'm-tilapia-pepper',
        vendor_id: vendorIdMap['mamas-kitchen'],
        category_id: 'soups-swallows',
        name: 'Spicy Tilapia Pepper Soup',
        description: 'Fresh river tilapia poached in hot aromatic uziza and uda pepper soup broth. Garnished with wild mint scent leaves.',
        base_price: 3800,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLqSFRFgqffYT-fS4-Lz0UH9f8q-1-5YY6nvUqarogbYXuzPxDXQfH1I-Cd-g_uIy-dbdu6-qXY942B_gJIHXDx9r93j9YXrUdYlL363MDJ2hJcFqqSx9Q7JSIrpcmBwBsedwBoyoRuFBWaIDFhiBxsqWGIbqSgjtoU9tCHDzSD7abarYv7Ct86wKIP_mpDT5ZiPSH_vlfxpuDfRzijXeSr3yi8LCfS00Y1gqrtOEOZdn9vuZ_EsWy',
        available: true,
        prep_time_minutes: 20,
        is_chef_pick: false,
        is_popular: false,
        is_spicy: true,
        tags: ['Spicy Hot', 'Fresh River Catch'],
      },
      {
        id: 'm-fried-rice-chicken',
        vendor_id: vendorIdMap['mamas-kitchen'],
        category_id: 'main-dishes',
        name: 'Fried Rice & Crispy Chicken',
        description: 'Savory seasoned rice tossed with garden sweet peas, sweet corn, minced beef liver, served with golden spiced crispy chicken quarter.',
        base_price: 3600,
        image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80',
        available: true,
        prep_time_minutes: 25,
        is_chef_pick: false,
        is_popular: true,
        is_spicy: false,
        tags: ['Classic Meal', 'Kids Favorite'],
      },
      {
        id: 'm-zobo-fusion',
        vendor_id: vendorIdMap['mamas-kitchen'],
        category_id: 'cold-drinks',
        name: 'Zobo Fusion Drink (1 Litre Jug)',
        description: 'Chilled native hibiscus flowers cold-infused with sweet pineapple chunks, spicy ginger root, and natural cloves.',
        base_price: 1800,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV-fVarBwZUS2qXEoOZSl_-b1ELmbpoF7pvFzufHi1UUX176-QWseeCO1ltRYtHrwlVis4lNFO5tThY_z0-vvhHZcRTfrXsMygtp9vjxksgp6J6fgQMQTrFFwBWE0N-XUU9SBKrVr5mDbzXnQL-7AaYFzIPlu7S5dcg0Bb0V6QfnOfuu6bt0GBKLTCYcquRmTOH_YedqXuV5NYLhjBxf4RSKmRAFtCuHaWsz2-VOlQ8gdSsbi4vHLY',
        available: true,
        prep_time_minutes: 5,
        is_chef_pick: false,
        is_popular: false,
        is_spicy: false,
        tags: ['Cold Brewed', '100% Natural'],
      },
      // Royal Palace Grills Items
      {
        id: 'r-special-suya',
        vendor_id: vendorIdMap['royal-palace-grills'],
        category_id: 'grills-sides',
        name: 'Special Suya Platter',
        description: 'Tenderized boneless beef spiced with Northern yaji, garnished with crunchy white onion rings and cucumbers.',
        base_price: 2800,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLiD6tr2tE5QPgMFY4MbwRzDX8B1fgpWSfn1OthcWpWdq2B3V5Yi8sh3Io1gWOMHzTJNxG8GRalR9aZROt3HwJnHdbYlZa3YLXVez1cnb5qDJ2zddixDzF9QR5hfud8N9uheurxm03cOaJcx1ixCOSpB4QM_OuRwzoAUFMogq2qT0ZNukUCSDHZLu_eaZn9v9LhEG5YN9vy9FXk6IXvSEcuIs2T57DPI4HlwbbcKm5Xe6nD3HhUvHc',
        available: true,
        prep_time_minutes: 15,
        is_chef_pick: false,
        is_popular: true,
        is_spicy: true,
        tags: ['Night Grill', 'Authentic Yaji'],
      },
      {
        id: 'r-chicken-shawarma',
        vendor_id: vendorIdMap['royal-palace-grills'],
        category_id: 'grills-sides',
        name: 'Crispy Chicken Shawarma',
        description: 'Double toasted Lebanese flatbread packed with spiced shredded chicken, two juicy sausages, and secret cream dressing.',
        base_price: 2200,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo-MrMMmECxl8oDC6gPDZm8lepx4ncwZLChmTEs6A44r6tEkPBYt8oZPzVOZy79WmpTdfmOFl34AuVKYJdNPzjKB2zWNbY51CgzPStsieek0p6IEr98fEuz4JnHomn1N9O2jjpjMNJYUWJVudgGB7dfjnx7UwtojKuG3NFuovFVk_t7XnFLOWK3qOwiTp1NiGFUHE96EwaZn2G2T1qGPNIqI0m4lLxDyxqYi8Gtnn0cFNILb87h5aF',
        available: true,
        prep_time_minutes: 15,
        is_chef_pick: false,
        is_popular: true,
        is_spicy: false,
        tags: ['Street Food', 'Double Wrapped'],
      },
    ];

    const { data: insertedMenuItems, error: menuItemError } = await supabase
      .from('menu_items')
      .upsert(menuItemsWithIds, { onConflict: 'id' })
      .select();

    if (menuItemError) throw menuItemError;
    console.log(`✅ Inserted ${insertedMenuItems?.length} menu items\n`);

    // Insert Portion Variants
    console.log('📏 Inserting portion variants...');
    const { data: insertedVariants, error: variantError } = await supabase
      .from('portion_variants')
      .upsert(portionVariants, { onConflict: 'id' })
      .select();

    if (variantError) throw variantError;
    console.log(`✅ Inserted ${insertedVariants?.length} portion variants\n`);

    // Insert Modifier Options
    console.log('🔧 Inserting modifier options...');
    const { data: insertedModifiers, error: modifierError } = await supabase
      .from('modifier_options')
      .upsert(modifierOptions, { onConflict: 'id' })
      .select();

    if (modifierError) throw modifierError;
    console.log(`✅ Inserted ${insertedModifiers?.length} modifier options\n`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\nYou can now:');
    console.log('1. Run `npm run dev` to start the development server');
    console.log('2. Browse vendors and menu items in the app');
    console.log('3. Test ordering flow with real data');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed
seedDatabase();
