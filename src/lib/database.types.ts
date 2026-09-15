export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type CityZone = 'Makurki' | 'Abuja' | 'Lagos';
export type UserRole = 'customer' | 'vendor' | 'dispatcher' | 'admin' | 'super_admin' | 'vendor_staff' | 'dispatcher_manager' | 'support_agent';
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
export type PaymentMethod = 'paystack' | 'flutterwave';
export type PaymentStatus = 'pending' | 'processing' | 'successful' | 'failed' | 'cancelled' | 'refunded' | 'partially_refunded';
export type VendorStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'suspended' | 'inactive';
export type AddressLabel = 'HOME' | 'OFFICE' | 'OTHER';
export type MenuItemCategory = 'Main Dishes' | 'Soups & Swallows' | 'Grills & Sides' | 'Cold Drinks' | 'Desserts';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          user_id: string;
          default_address_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          default_address_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          default_address_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      vendors: {
        Row: {
          id: string;
          user_id: string;
          business_name: string;
          business_registration_name: string | null;
          description: string | null;
          phone: string;
          email: string;
          address: string;
          city: CityZone;
          state: string | null;
          country: string | null;
          business_category: string | null;
          cuisine_categories: string[] | null;
          logo_url: string | null;
          cover_image_url: string | null;
          delivery_fee: number;
          min_order: number;
          estimated_prep_time: number;
          status: VendorStatus;
          bank_name: string | null;
          account_number: string | null;
          account_name: string | null;
          rating: number;
          review_count: number;
          verified: boolean;
          famous_for: string | null;
          badge: string | null;
          badge_color: string | null;
          accent_color: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          business_name: string;
          business_registration_name?: string | null;
          description?: string | null;
          phone: string;
          email: string;
          address: string;
          city?: CityZone;
          state?: string | null;
          country?: string | null;
          business_category?: string | null;
          cuisine_categories?: string[] | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          delivery_fee?: number;
          min_order?: number;
          estimated_prep_time?: number;
          status?: VendorStatus;
          bank_name?: string | null;
          account_number?: string | null;
          account_name?: string | null;
          rating?: number;
          review_count?: number;
          verified?: boolean;
          famous_for?: string | null;
          badge?: string | null;
          badge_color?: string | null;
          accent_color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          business_name?: string;
          business_registration_name?: string | null;
          description?: string | null;
          phone?: string;
          email?: string;
          address?: string;
          city?: CityZone;
          state?: string | null;
          country?: string | null;
          business_category?: string | null;
          cuisine_categories?: string[] | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          delivery_fee?: number;
          min_order?: number;
          estimated_prep_time?: number;
          status?: VendorStatus;
          bank_name?: string | null;
          account_number?: string | null;
          account_name?: string | null;
          rating?: number;
          review_count?: number;
          verified?: boolean;
          famous_for?: string | null;
          badge?: string | null;
          badge_color?: string | null;
          accent_color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_categories: {
        Row: {
          id: string;
          vendor_id: string;
          name: string;
          description: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          vendor_id: string;
          name: string;
          description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          vendor_id?: string;
          name?: string;
          description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          vendor_id: string;
          category_id: string | null;
          name: string;
          description: string;
          base_price: number;
          image_url: string | null;
          category: MenuItemCategory;
          prep_time_minutes: number;
          available: boolean;
          is_chef_pick: boolean;
          is_popular: boolean;
          is_spicy: boolean;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          vendor_id: string;
          category_id?: string | null;
          name: string;
          description: string;
          base_price: number;
          image_url?: string | null;
          category?: MenuItemCategory;
          prep_time_minutes?: number;
          available?: boolean;
          is_chef_pick?: boolean;
          is_popular?: boolean;
          is_spicy?: boolean;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          vendor_id?: string;
          category_id?: string | null;
          name?: string;
          description?: string;
          base_price?: number;
          image_url?: string | null;
          category?: MenuItemCategory;
          prep_time_minutes?: number;
          available?: boolean;
          is_chef_pick?: boolean;
          is_popular?: boolean;
          is_spicy?: boolean;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      portion_variants: {
        Row: {
          id: string;
          menu_item_id: string;
          name: string;
          additional_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          menu_item_id: string;
          name: string;
          additional_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          menu_item_id?: string;
          name?: string;
          additional_price?: number;
          created_at?: string;
        };
      };
      modifier_options: {
        Row: {
          id: string;
          menu_item_id: string;
          name: string;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          menu_item_id: string;
          name: string;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          menu_item_id?: string;
          name?: string;
          price?: number;
          created_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          label: AddressLabel;
          tag: string;
          address_text: string;
          landmark: string;
          instructions: string | null;
          latitude: number | null;
          longitude: number | null;
          is_primary: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          label?: AddressLabel;
          tag: string;
          address_text: string;
          landmark: string;
          instructions?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          label?: AddressLabel;
          tag?: string;
          address_text?: string;
          landmark?: string;
          instructions?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_id: string;
          vendor_id: string;
          subtotal: number;
          delivery_fee: number;
          service_fee: number;
          discount: number;
          total: number;
          status: OrderStatus;
          delivery_otp: string;
          delivery_address_id: string;
          payment_method: PaymentMethod;
          is_paid: boolean;
          paid_at: string | null;
          rider_id: string | null;
          customer_note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_id: string;
          vendor_id: string;
          subtotal: number;
          delivery_fee: number;
          service_fee: number;
          discount?: number;
          total: number;
          status?: OrderStatus;
          delivery_otp: string;
          delivery_address_id: string;
          payment_method: PaymentMethod;
          is_paid?: boolean;
          paid_at?: string | null;
          rider_id?: string | null;
          customer_note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_id?: string;
          vendor_id?: string;
          subtotal?: number;
          delivery_fee?: number;
          service_fee?: number;
          discount?: number;
          total?: number;
          status?: OrderStatus;
          delivery_otp?: string;
          delivery_address_id?: string;
          payment_method?: PaymentMethod;
          is_paid?: boolean;
          paid_at?: string | null;
          rider_id?: string | null;
          customer_note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          menu_item_id: string;
          name: string;
          base_price: number;
          unit_price: number;
          quantity: number;
          selected_variant_id: string | null;
          special_instructions: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          menu_item_id: string;
          name: string;
          base_price: number;
          unit_price: number;
          quantity: number;
          selected_variant_id?: string | null;
          special_instructions?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          menu_item_id?: string;
          name?: string;
          base_price?: number;
          unit_price?: number;
          quantity?: number;
          selected_variant_id?: string | null;
          special_instructions?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      order_item_modifiers: {
        Row: {
          id: string;
          order_item_id: string;
          modifier_option_id: string;
          name: string;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_item_id: string;
          modifier_option_id: string;
          name: string;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_item_id?: string;
          modifier_option_id?: string;
          name?: string;
          price?: number;
          created_at?: string;
        };
      };
      order_timeline: {
        Row: {
          id: string;
          order_id: string;
          status: OrderStatus;
          label: string;
          description: string;
          timestamp: string;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          status: OrderStatus;
          label: string;
          description: string;
          timestamp?: string;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          status?: OrderStatus;
          label?: string;
          description?: string;
          timestamp?: string;
          completed?: boolean;
          created_at?: string;
        };
      };
      dispatch_riders: {
        Row: {
          id: string;
          user_id: string;
          phone: string;
          vehicle: string;
          plate_number: string;
          rating: number;
          orders_completed: number;
          current_location_name: string | null;
          available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          phone: string;
          vehicle: string;
          plate_number: string;
          rating?: number;
          orders_completed?: number;
          current_location_name?: string | null;
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          phone?: string;
          vehicle?: string;
          plate_number?: string;
          rating?: number;
          orders_completed?: number;
          current_location_name?: string | null;
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          order_id: string;
          amount: number;
          method: PaymentMethod;
          status: PaymentStatus;
          transaction_reference: string | null;
          gateway_response: Json | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          amount: number;
          method: PaymentMethod;
          status?: PaymentStatus;
          transaction_reference?: string | null;
          gateway_response?: Json | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          amount?: number;
          method?: PaymentMethod;
          status?: PaymentStatus;
          transaction_reference?: string | null;
          gateway_response?: Json | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
