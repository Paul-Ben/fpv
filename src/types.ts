/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'customer' | 'vendor' | 'dispatcher' | 'admin';

export type AppView = 
  | 'explore' 
  | 'restaurants' 
  | 'restaurant-detail' 
  | 'checkout' 
  | 'tracking' 
  | 'vendor-dashboard' 
  | 'rider-portal' 
  | 'admin';

export type CityZone = 'Makurdi' | 'Abuja' | 'Lagos';

export type PaymentMethod = 'paystack' | 'flutterwave';

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'VENDOR_PENDING'
  | 'ACCEPTED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'DISPATCH_ASSIGNED'
  | 'PICKED_UP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CUSTOMER_CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REJECTED';

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

export interface PortionVariant {
  id: string;
  name: string;
  additionalPrice: number;
}

export interface MenuItem {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Main Dishes' | 'Soups & Swallows' | 'Grills & Sides' | 'Cold Drinks' | 'Desserts';
  portionVariants?: PortionVariant[];
  modifiers?: ModifierOption[];
  available: boolean;
  prepTimeMinutes: number;
  isChefPick?: boolean;
  isPopular?: boolean;
  isSpicy?: boolean;
  tags?: string[];
}

export interface Vendor {
  id: string;
  name: string;
  subtitle: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  cuisine: string;
  address: string;
  city: CityZone;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  verified: boolean;
  famousFor: string;
  badge?: string;
  badgeColor?: string;
  accentColor?: string;
  status: 'active' | 'pending' | 'suspended';
  phone: string;
  bankName?: string;
  accountNumber?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  menuItemId: string;
  name: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  selectedVariant?: PortionVariant;
  selectedModifiers: ModifierOption[];
  vendorId: string;
  vendorName: string;
  specialInstructions?: string;
  image?: string;
}

export interface Address {
  id: string;
  label: 'HOME' | 'OFFICE' | 'OTHER';
  tag: string;
  addressText: string;
  landmark: string;
  instructions?: string;
  isPrimary?: boolean;
}

export interface DispatchRider {
  id: string;
  name: string;
  phone: string;
  rating: number;
  avatar: string;
  vehicle: string;
  plateNumber: string;
  etaMinutes: number;
  ordersCompleted: number;
  currentLocationName: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  description: string;
  completed: boolean;
  isCurrent?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. #FP-108429
  customerName: string;
  customerPhone: string;
  vendorId: string;
  vendorName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  deliveryOtp: string; // 4-digit code e.g. "4829"
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  isPaid: boolean;
  paidAt?: string;
  rider?: DispatchRider;
  customerNote?: string;
  createdAt: string;
  timeline: OrderTimelineEvent[];
}
