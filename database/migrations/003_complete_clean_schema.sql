-- FoodPalace Supabase Database Schema - CLEAN INSTALL
-- Run this ONLY if starting fresh or after dropping all objects
-- This script drops existing objects before creating new ones

-- Drop existing objects in reverse dependency order
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_timeline CASCADE;
DROP TABLE IF EXISTS order_item_modifiers CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS dispatch_riders CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS modifier_options CASCADE;
DROP TABLE IF EXISTS portion_variants CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menu_categories CASCADE;
DROP TABLE IF EXISTS vendor_staff CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop enums
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS order_status CASCADE;
DROP TYPE IF EXISTS payment_method CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;
DROP TYPE IF EXISTS vendor_status CASCADE;
DROP TYPE IF EXISTS delivery_zone_type CASCADE;

-- Now run the main migration
-- Copy everything from 001_initial_schema.sql starting from line 1
-- EXCEPT the last commented-out INSERT statement
-- FoodPalace Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE user_role AS ENUM (
  'customer', 
  'vendor', 
  'dispatcher', 
  'admin', 
  'super_admin', 
  'vendor_staff', 
  'dispatcher_manager', 
  'support_agent'
);

CREATE TYPE order_status AS ENUM (
  'PENDING_PAYMENT',
  'PAID',
  'VENDOR_PENDING',
  'ACCEPTED',
  'PREPARING',
  'READY_FOR_PICKUP',
  'DISPATCH_ASSIGNED',
  'PICKED_UP',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CUSTOMER_CONFIRMED',
  'COMPLETED',
  'CANCELLED',
  'REJECTED'
);

CREATE TYPE payment_method AS ENUM ('paystack', 'flutterwave');

CREATE TYPE payment_status AS ENUM (
  'pending',
  'processing',
  'successful',
  'failed',
  'cancelled',
  'refunded',
  'partially_refunded'
);

CREATE TYPE vendor_status AS ENUM (
  'draft',
  'pending_review',
  'approved',
  'rejected',
  'suspended',
  'inactive'
);

CREATE TYPE city_zone AS ENUM ('Makurdi', 'Abuja', 'Lagos');

CREATE TYPE address_label AS ENUM ('HOME', 'OFFICE', 'OTHER');

CREATE TYPE menu_item_category AS ENUM (
  'Main Dishes',
  'Soups & Swallows',
  'Grills & Sides',
  'Cold Drinks',
  'Desserts'
);

-- Users table (extends auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  default_address_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vendors table
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  business_registration_name TEXT,
  description TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city city_zone NOT NULL DEFAULT 'Makurdi',
  state TEXT,
  country TEXT,
  business_category TEXT,
  cuisine_categories TEXT[],
  logo_url TEXT,
  cover_image_url TEXT,
  delivery_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  min_order NUMERIC(10,2) NOT NULL DEFAULT 0,
  estimated_prep_time INTEGER NOT NULL DEFAULT 30,
  status vendor_status NOT NULL DEFAULT 'pending_review',
  bank_name TEXT,
  account_number TEXT,
  account_name TEXT,
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  famous_for TEXT,
  badge TEXT,
  badge_color TEXT,
  accent_color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Menu categories table
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Menu items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  base_price NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  category menu_item_category NOT NULL DEFAULT 'Main Dishes',
  prep_time_minutes INTEGER NOT NULL DEFAULT 15,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  is_chef_pick BOOLEAN NOT NULL DEFAULT FALSE,
  is_popular BOOLEAN NOT NULL DEFAULT FALSE,
  is_spicy BOOLEAN NOT NULL DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Portion variants table
CREATE TABLE portion_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  additional_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Modifier options table
CREATE TABLE modifier_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Addresses table
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  label address_label NOT NULL DEFAULT 'OTHER',
  tag TEXT NOT NULL,
  address_text TEXT NOT NULL,
  landmark TEXT NOT NULL,
  instructions TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) NOT NULL,
  service_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  status order_status NOT NULL DEFAULT 'PENDING_PAYMENT',
  delivery_otp TEXT NOT NULL,
  delivery_address_id UUID REFERENCES addresses(id) ON DELETE RESTRICT NOT NULL,
  payment_method payment_method NOT NULL,
  is_paid BOOLEAN NOT NULL DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  rider_id UUID,
  customer_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE RESTRICT NOT NULL,
  name TEXT NOT NULL,
  base_price NUMERIC(10,2) NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  selected_variant_id UUID REFERENCES portion_variants(id) ON DELETE SET NULL,
  special_instructions TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order item modifiers table (junction table for modifiers on order items)
CREATE TABLE order_item_modifiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_item_id UUID REFERENCES order_items(id) ON DELETE CASCADE NOT NULL,
  modifier_option_id UUID REFERENCES modifier_options(id) ON DELETE RESTRICT NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order timeline table
CREATE TABLE order_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  status order_status NOT NULL,
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Dispatch riders table
CREATE TABLE dispatch_riders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  vehicle TEXT NOT NULL,
  plate_number TEXT NOT NULL,
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  orders_completed INTEGER NOT NULL DEFAULT 0,
  current_location_name TEXT,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL UNIQUE,
  amount NUMERIC(10,2) NOT NULL,
  method payment_method NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  transaction_reference TEXT,
  gateway_response JSONB,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_vendors_city ON vendors(city);
CREATE INDEX idx_vendors_status ON vendors(status);
CREATE INDEX idx_menu_items_vendor_id ON menu_items(vendor_id);
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_available ON menu_items(available);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_timeline_order_id ON order_timeline(order_id);
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_dispatch_riders_available ON dispatch_riders(available);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_categories_updated_at BEFORE UPDATE ON menu_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dispatch_riders_updated_at BEFORE UPDATE ON dispatch_riders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE portion_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE modifier_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_item_modifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispatch_riders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for customers
CREATE POLICY "Customers can view own data" ON customers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Customers can insert own data" ON customers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Customers can update own data" ON customers
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for vendors (public read for approved vendors)
CREATE POLICY "Anyone can view approved vendors" ON vendors
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Vendor owners can view their vendor" ON vendors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Vendor owners can update their vendor" ON vendors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Vendor owners can insert their vendor" ON vendors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for menu categories and items (public read for approved vendors)
CREATE POLICY "Anyone can view menu categories from approved vendors" ON menu_categories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vendors v 
      WHERE v.id = menu_categories.vendor_id 
      AND v.status = 'approved'
    )
  );

CREATE POLICY "Anyone can view menu items from approved vendors" ON menu_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vendors v 
      WHERE v.id = menu_items.vendor_id 
      AND v.status = 'approved'
    )
  );

CREATE POLICY "Vendors can manage their menu categories" ON menu_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM vendors v 
      WHERE v.id = menu_categories.vendor_id 
      AND v.user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can manage their menu items" ON menu_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM vendors v 
      WHERE v.id = menu_items.vendor_id 
      AND v.user_id = auth.uid()
    )
  );

-- RLS Policies for addresses
CREATE POLICY "Users can view own addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for orders
CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM customers c 
      WHERE c.id = orders.customer_id 
      AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can view orders for their vendor" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vendors v 
      WHERE v.id = orders.vendor_id 
      AND v.user_id = auth.uid()
    )
  );

CREATE POLICY "Dispatch riders can view assigned orders" ON orders
  FOR SELECT USING (rider_id::uuid = auth.uid());

-- RLS Policies for order items
CREATE POLICY "View order items if can view order" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders o 
      WHERE o.id = order_items.order_id
      AND (
        EXISTS (SELECT 1 FROM customers c WHERE c.id = o.customer_id AND c.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM vendors v WHERE v.id = o.vendor_id AND v.user_id = auth.uid())
        OR o.rider_id::uuid = auth.uid()
      )
    )
  );

-- RLS Policies for order timeline
CREATE POLICY "View order timeline if can view order" ON order_timeline
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders o 
      WHERE o.id = order_timeline.order_id
      AND (
        EXISTS (SELECT 1 FROM customers c WHERE c.id = o.customer_id AND c.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM vendors v WHERE v.id = o.vendor_id AND v.user_id = auth.uid())
        OR o.rider_id::uuid = auth.uid()
      )
    )
  );

-- RLS Policies for dispatch riders
CREATE POLICY "Anyone can view available dispatch riders" ON dispatch_riders
  FOR SELECT USING (available = TRUE);

CREATE POLICY "Riders can view own profile" ON dispatch_riders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Riders can update own profile" ON dispatch_riders
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "View payments if can view order" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders o 
      WHERE o.id = payments.order_id
      AND (
        EXISTS (SELECT 1 FROM customers c WHERE c.id = o.customer_id AND c.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM vendors v WHERE v.id = o.vendor_id AND v.user_id = auth.uid())
      )
