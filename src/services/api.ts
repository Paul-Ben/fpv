import supabase from '../lib/supabase';
import type { Vendor, MenuItem, Address, Order, DispatchRider } from '../types';
import type { Database } from '../lib/database.types';

type VendorRow = Database['public']['Tables']['vendors']['Row'];
type MenuItemRow = Database['public']['Tables']['menu_items']['Row'];
type PortionVariantRow = Database['public']['Tables']['portion_variants']['Row'];
type ModifierOptionRow = Database['public']['Tables']['modifier_options']['Row'];
type AddressRow = Database['public']['Tables']['addresses']['Row'];

// Helper to map vendor row to frontend type
const mapVendor = (row: VendorRow): Vendor => ({
  id: row.id,
  name: row.business_name,
  subtitle: row.description || '',
  logo: row.logo_url || '',
  coverImage: row.cover_image_url || '',
  rating: Number(row.rating),
  reviewCount: row.review_count,
  cuisine: row.cuisine_categories?.join(', ') || row.business_category || '',
  address: row.address,
  city: row.city,
  deliveryTime: `${row.estimated_prep_time} - ${row.estimated_prep_time + 15} min`,
  deliveryFee: Number(row.delivery_fee),
  minOrder: Number(row.min_order),
  verified: row.verified,
  famousFor: row.famous_for || '',
  badge: row.badge || undefined,
  badgeColor: row.badge_color || undefined,
  accentColor: row.accent_color || undefined,
  status: row.status === 'approved' ? 'active' : row.status,
  phone: row.phone,
  bankName: row.bank_name || undefined,
  accountNumber: row.account_number || undefined,
});

// Helper to map menu item row to frontend type
const mapMenuItem = (
  row: MenuItemRow,
  variants: PortionVariantRow[] = [],
  modifiers: ModifierOptionRow[] = []
): MenuItem => ({
  id: row.id,
  vendorId: row.vendor_id,
  name: row.name,
  description: row.description,
  price: Number(row.base_price),
  image: row.image_url || '',
  category: row.category as any,
  portionVariants: variants.map(v => ({
    id: v.id,
    name: v.name,
    additionalPrice: Number(v.additional_price),
  })),
  modifiers: modifiers.map(m => ({
    id: m.id,
    name: m.name,
    price: Number(m.price),
  })),
  available: row.available,
  prepTimeMinutes: row.prep_time_minutes,
  isChefPick: row.is_chef_pick,
  isPopular: row.is_popular,
  isSpicy: row.is_spicy,
  tags: row.tags || [],
});

// Fetch all approved vendors
export async function fetchVendors(city?: string) {
  let query = supabase
    .from('vendors')
    .select('*')
    .eq('status', 'approved');

  if (city) {
    query = query.eq('city', city);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data.map(mapVendor);
}

// Fetch vendor by ID
export async function fetchVendorById(id: string) {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return mapVendor(data);
}

// Fetch menu items for a vendor
export async function fetchMenuItems(vendorId: string) {
  const { data: items, error: itemsError } = await supabase
    .from('menu_items')
    .select('*')
    .eq('vendor_id', vendorId)
    .eq('available', true);

  if (itemsError) throw itemsError;

  const menuItems: MenuItem[] = [];

  for (const item of items) {
    const { data: variants } = await supabase
      .from('portion_variants')
      .select('*')
      .eq('menu_item_id', item.id);

    const { data: modifiers } = await supabase
      .from('modifier_options')
      .select('*')
      .eq('menu_item_id', item.id);

    menuItems.push(mapMenuItem(item, variants || [], modifiers || []));
  }

  return menuItems;
}

// Fetch user addresses
export async function fetchUserAddresses(userId: string) {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_primary', { ascending: false });

  if (error) throw error;

  return data.map((row: AddressRow): Address => ({
    id: row.id,
    label: row.label as 'HOME' | 'OFFICE' | 'OTHER',
    tag: row.tag,
    addressText: row.address_text,
    landmark: row.landmark,
    instructions: row.instructions || undefined,
    isPrimary: row.is_primary,
  }));
}

// Create new address
export async function createAddress(address: Omit<Address, 'id'> & { userId: string }) {
  const { data, error } = await supabase
    .from('addresses')
    .insert({
      user_id: address.userId,
      label: address.label,
      tag: address.tag,
      address_text: address.addressText,
      landmark: address.landmark,
      instructions: address.instructions || null,
      is_primary: address.isPrimary || false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Generate order number
function generateOrderNumber(): string {
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `#FP-${random}`;
}

// Generate OTP
function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Create order
export async function createOrder(orderData: {
  customerId: string;
  vendorId: string;
  items: Array<{
    menuItemId: string;
    name: string;
    basePrice: number;
    unitPrice: number;
    quantity: number;
    selectedVariantId?: string;
    modifierOptions?: Array<{ id: string; name: string; price: number }>;
    specialInstructions?: string;
    imageUrl?: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  total: number;
  deliveryAddressId: string;
  paymentMethod: 'paystack' | 'flutterwave';
  customerNote?: string;
}) {
  const orderNumber = generateOrderNumber();
  const deliveryOtp = generateOTP();

  // Start a transaction-like flow (Supabase doesn't have transactions in client, use Edge Functions for complex ops)
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_id: orderData.customerId,
      vendor_id: orderData.vendorId,
      subtotal: orderData.subtotal,
      delivery_fee: orderData.deliveryFee,
      service_fee: orderData.serviceFee,
      discount: orderData.discount,
      total: orderData.total,
      status: 'PENDING_PAYMENT',
      delivery_otp: deliveryOtp,
      delivery_address_id: orderData.deliveryAddressId,
      payment_method: orderData.paymentMethod,
      is_paid: false,
      customer_note: orderData.customerNote || null,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Insert order items
  for (const item of orderData.items) {
    const { data: orderItem, error: itemError } = await supabase
      .from('order_items')
      .insert({
        order_id: order.id,
        menu_item_id: item.menuItemId,
        name: item.name,
        base_price: item.basePrice,
        unit_price: item.unitPrice,
        quantity: item.quantity,
        selected_variant_id: item.selectedVariantId || null,
        special_instructions: item.specialInstructions || null,
        image_url: item.imageUrl || null,
      })
      .select()
      .single();

    if (itemError) throw itemError;

    // Insert modifiers if any
    if (item.modifierOptions && item.modifierOptions.length > 0) {
      for (const mod of item.modifierOptions) {
        await supabase.from('order_item_modifiers').insert({
          order_item_id: orderItem.id,
          modifier_option_id: mod.id,
          name: mod.name,
          price: mod.price,
        });
      }
    }
  }

  // Create initial timeline entry
  await supabase.from('order_timeline').insert({
    order_id: order.id,
    status: 'PENDING_PAYMENT',
    label: 'Order Created',
    description: 'Order has been created and awaiting payment confirmation',
    completed: true,
  });

  // Create payment record
  await supabase.from('payments').insert({
    order_id: order.id,
    amount: orderData.total,
    method: orderData.paymentMethod,
    status: 'pending',
  });

  return {
    ...order,
    items: orderData.items,
  };
}

// Fetch order with details
export async function fetchOrder(orderId: string) {
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*),
      order_timeline (*),
      delivery_address:addresses (*),
      rider:dispatch_riders (*)
    `)
    .eq('id', orderId)
    .single();

  if (error) throw error;
  return order;
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;

  // Add timeline entry
  await supabase.from('order_timeline').insert({
    order_id: orderId,
    status: status as any,
    label: getStatusLabel(status),
    description: getStatusDescription(status),
    completed: true,
  });

  return data;
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING_PAYMENT: 'Pending Payment',
    PAID: 'Payment Confirmed',
    VENDOR_PENDING: 'Awaiting Vendor Acceptance',
    ACCEPTED: 'Order Accepted',
    PREPARING: 'Preparing Your Order',
    READY_FOR_PICKUP: 'Ready for Pickup',
    DISPATCH_ASSIGNED: 'Dispatch Rider Assigned',
    PICKED_UP: 'Order Picked Up',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    CUSTOMER_CONFIRMED: 'Receipt Confirmed',
    COMPLETED: 'Order Completed',
  };
  return labels[status] || status;
}

function getStatusDescription(status: string): string {
  const descriptions: Record<string, string> = {
    PENDING_PAYMENT: 'Order created, awaiting payment confirmation',
    PAID: 'Payment received successfully',
    VENDOR_PENDING: 'Waiting for vendor to accept the order',
    ACCEPTED: 'Vendor has accepted your order',
    PREPARING: 'Your food is being prepared',
    READY_FOR_PICKUP: 'Order is ready for dispatch rider pickup',
    DISPATCH_ASSIGNED: 'A dispatch rider has been assigned',
    PICKED_UP: 'Rider has picked up your order',
    OUT_FOR_DELIVERY: 'Your order is on its way',
    DELIVERED: 'Order has been delivered',
    CUSTOMER_CONFIRMED: 'Customer confirmed receipt',
    COMPLETED: 'Order completed successfully',
  };
  return descriptions[status] || '';
}

// Confirm delivery by rider
export async function confirmDeliveryByRider(orderId: string, otp: string) {
  const { data: order, error: fetchError } = await supabase
    .from('orders')
    .select('delivery_otp')
    .eq('id', orderId)
    .single();

  if (fetchError) throw fetchError;

  if (order.delivery_otp !== otp) {
    throw new Error('Invalid OTP');
  }

  return updateOrderStatus(orderId, 'DELIVERED');
}

// Confirm receipt by customer
export async function confirmReceiptByCustomer(orderId: string) {
  return updateOrderStatus(orderId, 'CUSTOMER_CONFIRMED');
}
