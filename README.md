# FoodPalace - Multi-Vendor Food Ordering Platform

A modern multi-vendor food ordering and delivery platform built with React, Vite, TypeScript, TailwindCSS, Supabase, and deployed on Vercel.

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite + TypeScript
- **Styling**: TailwindCSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Animations**: Motion

## 📋 Features

### Customer Features
- Browse vendors and menus
- Search and filter by cuisine/category
- Cart management with single-vendor checkout
- Multiple delivery addresses
- Order tracking with real-time timeline
- OTP-based delivery confirmation

### Vendor Features
- Dashboard for order management
- Menu CRUD operations
- Order acceptance/rejection workflow
- Status updates through state machine

### Rider Features
- Available deliveries list
- Pickup confirmation
- Delivery confirmation with OTP
- Earnings tracking

### Admin Features
- Vendor approval workflow
- Platform analytics
- User management
- Commission settings

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the repository
```bash
git clone <repository-url>
cd foodpalace
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Required environment variables:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
VITE_APP_URL=http://localhost:3000
```

### 4. Set up Supabase database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration file:
   ```bash
   # Run the contents of database/migrations/001_initial_schema.sql
   ```
3. Enable Row Level Security (RLS) policies (included in migration)

### 5. Start development server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Build & Deployment

### Build for production
```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Connect to Vercel:
```bash
vercel login
vercel link
```

3. Deploy:
```bash
vercel --prod
```

Or push to main branch for automatic deployment (if configured).

### Environment Variables on Vercel

Configure these in your Vercel project settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_PAYSTACK_PUBLIC_KEY`
- `VITE_APP_URL`

## 🗄️ Database Schema

The application uses the following main tables:
- `users` - User accounts with roles
- `vendors` - Food vendor businesses
- `menu_items` - Food items with variants and modifiers
- `orders` - Customer orders
- `order_items` - Items in each order
- `addresses` - Customer delivery addresses
- `dispatch_riders` - Delivery personnel
- `payments` - Payment records

See `database/migrations/001_initial_schema.sql` for complete schema.

## 🔐 Authentication

Authentication is handled by Supabase Auth. Users can sign up as:
- Customers
- Vendors
- Dispatch Riders
- Administrators

## 📱 Views/Pages

- **Explore** - Discover vendors and featured items
- **Restaurants** - Browse all vendors
- **Restaurant Detail** - View menu and add to cart
- **Checkout** - Complete order with address selection
- **Order Tracking** - Track active order status
- **Vendor Dashboard** - Manage orders and menu
- **Rider Portal** - Manage deliveries
- **Admin Dashboard** - Platform management

## 🎨 Design System

The app uses a consistent design system with:
- **Colors**: Orange (#fcab79, #aa2d00), Yellow (#f4d35e)
- **Dark Mode**: Full support via Tailwind dark mode
- **Responsive**: Mobile-first approach
- **Components**: Header, Footer, Toast notifications
- **Typography**: Sans-serif with consistent sizing

## 🧪 Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run TypeScript type checking
npm run type-check # Alias for lint
npm run clean      # Remove build artifacts
```

## 📄 License

Apache-2.0

---

Built with ❤️ for Nigeria's food delivery ecosystem
