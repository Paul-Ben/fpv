/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExploreView } from './components/views/ExploreView';
import { RestaurantsView } from './components/views/RestaurantsView';
import { RestaurantDetailView } from './components/views/RestaurantDetailView';
import { CheckoutView } from './components/views/CheckoutView';
import { OrderTrackingView } from './components/views/OrderTrackingView';
import { VendorDashboardView } from './components/views/VendorDashboardView';
import { RiderPortalView } from './components/views/RiderPortalView';
import { SuperAdminView } from './components/views/SuperAdminView';
import { 
  mockVendors, 
  mockMenuItems, 
  mockActiveOrder, 
  mockSavedAddresses 
} from './data/mockData';
import { AppView, Vendor, CartItem, Order, Address, CityZone } from './types';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('explore');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<CityZone>('Makurdi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor>(mockVendors[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order>(mockActiveOrder);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(mockSavedAddresses);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    else targetView = 'explore';

    setCurrentView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVendor = (vendorOrId: Vendor | string) => {
    if (typeof vendorOrId === 'string') {
      const found = mockVendors.find(v => v.id === vendorOrId) || mockVendors[0];
      setSelectedVendor(found);
    } else {
      setSelectedVendor(vendorOrId);
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
          showToast(`User Account (${mode || 'profile'}) - Signed in as Emeka Daniel`);
        }}
      />

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1 w-full">
        {currentView === 'explore' && (
          <ExploreView
            vendors={mockVendors}
            menuItems={mockMenuItems}
            onSelectVendor={handleSelectVendor}
            onAddToCart={handleAddToCart}
            currentCity={currentCity}
            onShowToast={showToast}
          />
        )}

        {currentView === 'restaurants' && (
          <RestaurantsView
            vendors={mockVendors}
            onSelectVendor={handleSelectVendor}
          />
        )}

        {currentView === 'restaurant-detail' && (
          <RestaurantDetailView
            vendor={selectedVendor}
            menuItems={mockMenuItems}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCartItemQty={handleUpdateCartItemQty}
            onRemoveCartItem={handleRemoveCartItem}
            onProceedToCheckout={handleProceedToCheckout}
            onShowToast={showToast}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            savedAddresses={savedAddresses}
            onBackToMenu={() => handleNavigate('restaurant-detail')}
            onOrderSuccess={handleOrderSuccess}
            onShowToast={showToast}
          />
        )}

        {currentView === 'tracking' && (
          <OrderTrackingView
            order={activeOrder}
            onConfirmDeliveryReceipt={handleConfirmDeliveryReceipt}
            onShowToast={showToast}
          />
        )}

        {currentView === 'vendor-dashboard' && (
          <VendorDashboardView
            menuItems={mockMenuItems}
            onShowToast={showToast}
          />
        )}

        {currentView === 'rider-portal' && (
          <RiderPortalView
            activeOrder={activeOrder}
            onConfirmDeliveryByRider={handleConfirmDeliveryByRider}
            onShowToast={showToast}
          />
        )}

        {currentView === 'admin' && (
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
