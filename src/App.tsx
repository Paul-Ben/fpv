/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExploreView } from './components/views/ExploreView';
import { RestaurantsView } from './components/views/RestaurantsView';
import { RestaurantDetailView } from './components/views/RestaurantDetailView';
import { CheckoutView } from './components/views/CheckoutView';
import { OrderTrackingView } from './components/views/OrderTrackingView';
import { VendorDashboardView } from './components/views/VendorDashboardView';
import { RiderPortalView } from './components/views/RiderPortalView';
import { SuperAdminView } from './components/views/SuperAdminView';
import AuthPage from './views/AuthPage';
import { fetchVendors, fetchMenuItems } from './services/api';
import { AppView, Vendor, CartItem, Order, Address, CityZone, MenuItem } from './types';
import { CheckCircle2, X } from 'lucide-react';

function AppContent() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('explore');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<CityZone>('Makurdi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [fetchedVendors] = await Promise.all([
          fetchVendors(),
        ]);
        setVendors(fetchedVendors);
        if (fetchedVendors.length > 0) {
          setSelectedVendor(fetchedVendors[0]);
          const fetchedMenuItems = await fetchMenuItems(fetchedVendors[0].id);
          setMenuItems(fetchedMenuItems);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        showToast('Failed to connect to database. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Sync dark mode class on <html> / document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 3800);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleNavigate = (view: string) => {
    let targetView: AppView = 'explore';
    if (view === 'vendor' || view === 'vendor-dashboard') targetView = 'vendor-dashboard';
    else if (view === 'rider' || view === 'rider-portal') targetView = 'rider-portal';
    else if (view === 'admin') targetView = 'admin';
    else if (view === 'checkout') targetView = 'checkout';
    else if (view === 'tracking') targetView = 'tracking';
    else if (view === 'restaurants') targetView = 'restaurants';
    else if (view === 'restaurant-detail') targetView = 'restaurant-detail';
    else if (view === 'auth') targetView = 'explore'; // Don't navigate to auth if already logged in
    else targetView = 'explore';

    setCurrentView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVendor = async (vendorOrId: Vendor | string) => {
    let vendor: Vendor;
    if (typeof vendorOrId === 'string') {
      const found = vendors.find(v => v.id === vendorOrId);
      if (!found) return;
      vendor = found;
    } else {
      vendor = vendorOrId;
    }
    setSelectedVendor(vendor);
    
    // Fetch menu items for the selected vendor
    try {
      const fetchedMenuItems = await fetchMenuItems(vendor.id);
      setMenuItems(fetchedMenuItems);
    } catch (err) {
      showToast('Failed to load menu items');
    }
    
    setCurrentView('restaurant-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      // Check if item with same variant and modifiers exists
      const existingIdx = prev.findIndex(
        i => i.menuItemId === item.menuItemId &&
        i.selectedVariant?.id === item.selectedVariant?.id &&
        JSON.stringify(i.selectedModifiers.map(m => m.id).sort()) === JSON.stringify(item.selectedModifiers.map(m => m.id).sort())
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += item.quantity;
        return next;
      } else {
        return [...prev, item];
      }
    });
  };

  const handleUpdateCartItemQty = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from tray');
  };

  const handleProceedToCheckout = () => {
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setActiveOrder(newOrder);
    setCartItems([]);
    setCurrentView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Order ${newOrder.orderNumber} placed successfully!`);
  };

  const handleConfirmDeliveryReceipt = (orderId: string) => {
    setActiveOrder(prev => ({
      ...prev,
      status: 'CUSTOMER_CONFIRMED',
      timeline: prev.timeline.map((event, idx) => ({
        ...event,
        completed: true,
        isCurrent: idx === 8
      }))
    }));
    showToast('Delivery receipt confirmed! Mama\'s Kitchen payout released.');
  };

  const handleConfirmDeliveryByRider = (orderId: string) => {
    setActiveOrder(prev => ({
      ...prev,
      status: 'DELIVERED',
      timeline: prev.timeline.map((event, idx) => ({
        ...event,
        completed: idx <= 7,
        isCurrent: idx === 7
      }))
    }));
  };

  // Show auth page if not logged in and trying to access protected routes
  if (!authLoading && !user && (currentView === 'vendor-dashboard' || currentView === 'rider-portal' || currentView === 'admin')) {
    return <AuthPage />;
  }

  // Auto-redirect based on user role after login
  useEffect(() => {
    if (user && userProfile) {
      if (userProfile.role === 'vendor' && currentView === 'explore') {
        setCurrentView('vendor-dashboard');
      } else if (userProfile.role === 'rider' && currentView === 'explore') {
        setCurrentView('rider-portal');
      }
    }
  }, [user, userProfile, currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 font-sans transition-colors">
      
      {/* GLOBAL NAVBAR */}
      <Header
        currentView={currentView}
        setCurrentView={handleNavigate}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        darkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        setDarkMode={setIsDarkMode}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        activeOrderCount={activeOrder ? 1 : 0}
        currentCity={currentCity}
        setCurrentCity={setCurrentCity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCartDrawer={() => {
          if (cartItems.length > 0) {
            handleNavigate('checkout');
          } else {
            showToast('Your food tray is currently empty. Add some delicacies from the menu!');
          }
        }}
        openAuthModal={(mode) => {
          if (!user) {
            setCurrentView('auth');
          } else {
            showToast(`User Account (${mode || 'profile'}) - Signed in as ${user.email}`);
          }
        }}
        user={user}
        onSignOut={async () => {
          await useAuth().signOut();
          setCurrentView('explore');
        }}
      />

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1 w-full">
        {loading && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-[#aa2d00] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Loading delicious options...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md px-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                <X className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Connection Error</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-[#aa2d00] hover:bg-[#aa2d00]/90 text-white rounded-full text-sm font-bold transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && currentView === 'explore' && (
          <ExploreView
            vendors={vendors}
            menuItems={menuItems}
            onSelectVendor={handleSelectVendor}
            onAddToCart={handleAddToCart}
            currentCity={currentCity}
            onShowToast={showToast}
          />
        )}

        {!loading && !error && currentView === 'restaurants' && (
          <RestaurantsView
            vendors={vendors}
            onSelectVendor={handleSelectVendor}
          />
        )}

        {!loading && !error && currentView === 'restaurant-detail' && selectedVendor && (
          <RestaurantDetailView
            vendor={selectedVendor}
            menuItems={menuItems}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCartItemQty={handleUpdateCartItemQty}
            onRemoveCartItem={handleRemoveCartItem}
            onProceedToCheckout={handleProceedToCheckout}
            onShowToast={showToast}
          />
        )}

        {!loading && !error && currentView === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            savedAddresses={savedAddresses}
            onBackToMenu={() => handleNavigate('restaurant-detail')}
            onOrderSuccess={handleOrderSuccess}
            onShowToast={showToast}
          />
        )}

        {!loading && !error && currentView === 'tracking' && activeOrder && (
          <OrderTrackingView
            order={activeOrder}
            onConfirmDeliveryReceipt={handleConfirmDeliveryReceipt}
            onShowToast={showToast}
          />
        )}

        {!loading && !error && currentView === 'vendor-dashboard' && (
          <VendorDashboardView
            menuItems={menuItems}
            onShowToast={showToast}
          />
        )}

        {!loading && !error && currentView === 'rider-portal' && activeOrder && (
          <RiderPortalView
            activeOrder={activeOrder}
            onConfirmDeliveryByRider={handleConfirmDeliveryByRider}
            onShowToast={showToast}
          />
        )}

        {!loading && !error && currentView === 'admin' && (
          <SuperAdminView
            onShowToast={showToast}
          />
        )}
      </main>

      {/* GLOBAL FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold border border-slate-700 dark:border-slate-300 max-w-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            <span className="flex-1">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white dark:hover:text-black p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
