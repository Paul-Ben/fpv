/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  Bike, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Heart, 
  Share2, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  Sparkles, 
  Flame,
  Check
} from 'lucide-react';
import { Vendor, MenuItem, CartItem, ModifierOption, PortionVariant } from '../../types';

interface RestaurantDetailViewProps {
  vendor: Vendor;
  menuItems: MenuItem[];
  cartItems: CartItem[];
  onAddToCart: (item: CartItem) => void;
  onUpdateCartItemQty: (id: string, delta: number) => void;
  onRemoveCartItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onShowToast: (message: string) => void;
}

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  vendor,
  menuItems,
  cartItems,
  onAddToCart,
  onUpdateCartItemQty,
  onRemoveCartItem,
  onProceedToCheckout,
  onShowToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Main Dishes');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, PortionVariant>>({});
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, ModifierOption[]>>({});
  const [isFavorited, setIsFavorited] = useState(false);

  // Filter items for active category
  const categoryItems = menuItems.filter(
    (item) => item.vendorId === vendor.id && item.category === activeCategory
  );

  const categories = [
    { name: 'Main Dishes', count: 8 },
    { name: 'Soups & Swallows', count: 6 },
    { name: 'Grills & Sides', count: 9 },
    { name: 'Cold Drinks', count: 12 },
    { name: 'Desserts', count: 4 },
  ];

  // Calculate cart totals
  const itemsSubtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? vendor.deliveryFee : 0;
  const platformServiceFee = cartItems.length > 0 ? 300 : 0;
  const grandTotal = itemsSubtotal + deliveryFee + platformServiceFee;

  const handleVariantSelect = (itemId: string, variant: PortionVariant) => {
    setSelectedVariants(prev => ({ ...prev, [itemId]: variant }));
  };

  const handleModifierToggle = (itemId: string, mod: ModifierOption) => {
    setSelectedModifiers(prev => {
      const current = prev[itemId] || [];
      const exists = current.some(m => m.id === mod.id);
      if (exists) {
        return { ...prev, [itemId]: current.filter(m => m.id !== mod.id) };
      } else {
        return { ...prev, [itemId]: [...current, mod] };
      }
    });
  };

  const handleAddItemToTray = (item: MenuItem) => {
    const chosenVariant = selectedVariants[item.id] || item.portionVariants?.[0];
    const chosenMods = selectedModifiers[item.id] || [];
    
    const additionalVariantPrice = chosenVariant ? chosenVariant.additionalPrice : 0;
    const modsPrice = chosenMods.reduce((sum, m) => sum + m.price, 0);
    const unitPrice = item.price + additionalVariantPrice + modsPrice;

    const newCartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      basePrice: item.price,
      unitPrice,
      quantity: 1,
      selectedVariant: chosenVariant,
      selectedModifiers: chosenMods,
      vendorId: vendor.id,
      vendorName: vendor.name,
      image: item.image,
    };

    onAddToCart(newCartItem);
    onShowToast(`${item.name} added to your tray!`);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f17] min-h-screen pb-20 transition-colors">
      
      {/* VENDOR COVER HERO */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=1600&auto=format&fit=crop&q=80"
          alt={vendor.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Top Right Action Icons */}
        <div className="absolute top-6 right-6 sm:right-12 flex items-center gap-3 z-10">
          <button
            onClick={() => {
              setIsFavorited(!isFavorited);
              onShowToast(isFavorited ? 'Removed from favorites' : 'Saved to favorites');
            }}
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-800 dark:text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
            aria-label="Favorite"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-red-500' : ''}`} />
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText?.(window.location.href);
              onShowToast('Restaurant link copied to clipboard!');
            }}
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-800 dark:text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* VENDOR PROFILE HEADER CARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-16 sm:-mt-20 relative z-20">
        <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 sm:p-7 shadow-xl border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-slate-800 p-1.5 shadow-md border border-slate-200 dark:border-slate-700 shrink-0 overflow-hidden">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] font-bold bg-[#f5e9d4] dark:bg-emerald-950/50 text-[#0a2e0e] dark:text-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Certified Kitchen
                </span>
                <span className="text-[11px] font-bold bg-[#ea580c] text-white px-2.5 py-0.5 rounded-full">
                  Wurukum Flagship
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {vendor.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {vendor.subtitle}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                📍 {vendor.address}
              </p>
            </div>
          </div>

          {/* Key Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div className="text-left">
              <div className="flex items-center gap-1 text-slate-900 dark:text-white font-extrabold text-base">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{vendor.rating}</span>
              </div>
              <span className="text-[11px] text-slate-500 block">{vendor.reviewCount} reviews</span>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1 text-slate-900 dark:text-white font-extrabold text-base">
                <Clock className="w-4 h-4 text-[#aa2d00]" />
                <span>25–35</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Prep Time (min)</span>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1 text-slate-900 dark:text-white font-extrabold text-base">
                <Bike className="w-4 h-4 text-[#4d6b2c]" />
                <span>₦{vendor.deliveryFee}</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Standard Express</span>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1 text-slate-900 dark:text-white font-extrabold text-base">
                <ShoppingBag className="w-4 h-4 text-[#d9a441]" />
                <span>₦{vendor.minOrder.toLocaleString()}</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Min. Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* THREE-COLUMN LAYOUT: CATEGORIES | MENU ITEMS | ORDER TRAY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: MENU CATEGORIES SIDEBAR */}
          <div className="lg:col-span-3 space-y-4 sticky top-24">
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
                Menu Sections
              </div>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      activeCategory === cat.name
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                      activeCategory === cat.name
                        ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Farm Fresh Quality Callout */}
            <div className="bg-[#f5e9d4]/60 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-900/40 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-[#aa2d00] dark:text-[#fcab79] font-bold text-xs mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Farm Fresh Direct</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                All soups prepared daily with pure palm oil, native herbs, and organic farm produce from Benue Valley farmlands.
              </p>
            </div>
          </div>

          {/* CENTER COLUMN: INTERACTIVE DISHES LIST */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[#aa2d00] rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Featured {activeCategory}
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing {categoryItems.length} Chef Picks
              </span>
            </div>

            {categoryItems.map((item) => {
              const currentVariant = selectedVariants[item.id] || item.portionVariants?.[0];
              const currentMods = selectedModifiers[item.id] || [];
              const variantPrice = currentVariant ? currentVariant.additionalPrice : 0;
              const modsPrice = currentMods.reduce((s, m) => s + m.price, 0);
              const calculatedPrice = item.price + variantPrice + modsPrice;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#181d26] rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.isChefPick && (
                        <div className="absolute top-2 left-2 bg-[#aa2d00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                          BESTSELLER
                        </div>
                      )}
                      {item.isSpicy && !item.isChefPick && (
                        <div className="absolute top-2 left-2 bg-[#af3003] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                          SPICY HOT
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                            {item.name}
                          </h3>
                          <span className="text-base font-extrabold text-[#aa2d00] dark:text-[#fcab79] shrink-0">
                            ₦{calculatedPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Portion Variants (if any) */}
                      {item.portionVariants && item.portionVariants.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">
                            1. Select Portion Size
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {item.portionVariants.map((variant) => (
                              <button
                                key={variant.id}
                                onClick={() => handleVariantSelect(item.id, variant)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between border transition-all ${
                                  (currentVariant?.id || 'standard') === variant.id
                                    ? 'bg-[#181d26] text-white border-transparent dark:bg-white dark:text-slate-900'
                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                <span>{variant.name.split('(')[0]}</span>
                                {variant.additionalPrice > 0 && (
                                  <span className="text-[10px] font-bold text-[#fcab79] dark:text-[#aa2d00]">
                                    +₦{variant.additionalPrice.toLocaleString()}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Extra Modifiers (if any) */}
                      {item.modifiers && item.modifiers.length > 0 && (
                        <div className="mt-2.5">
                          <span className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">
                            2. Add Extra Modifiers
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.modifiers.map((mod) => {
                              const isChecked = currentMods.some(m => m.id === mod.id);
                              return (
                                <button
                                  key={mod.id}
                                  onClick={() => handleModifierToggle(item.id, mod)}
                                  className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 transition-all ${
                                    isChecked
                                      ? 'bg-orange-100 text-[#aa2d00] border-orange-300 dark:bg-orange-950/60 dark:text-[#fcab79] dark:border-orange-800 font-bold'
                                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                  }`}
                                >
                                  {isChecked ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                  <span>{mod.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Add Button */}
                      <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs text-slate-500 font-medium">
                          🍴 Chef Prepared Fresh
                        </span>
                        <button
                          onClick={() => handleAddItemToTray(item)}
                          className="px-4 py-2 bg-[#181d26] hover:bg-[#aa2d00] dark:bg-slate-100 dark:hover:bg-[#ea580c] text-white dark:text-slate-900 dark:hover:text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow transition-all active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: STICKY "YOUR ORDER TRAY" */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 shadow-xl border border-slate-200/80 dark:border-slate-800">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#aa2d00]" />
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Your Order Tray
                  </h3>
                </div>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-full">
                  {cartItems.length} items
                </span>
              </div>

              {/* PRD Mandate Note: One Cart = One Vendor */}
              <div className="my-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-2.5 rounded-xl flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-800 dark:text-amber-200 leading-snug">
                  <span className="font-bold">One Cart = One Vendor:</span> Ordering exclusively from <span className="font-bold">{vendor.name}</span>.
                </div>
              </div>

              {/* Delivery destination preview */}
              <div className="mb-4 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Delivering To</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Wurukum Extension, Makurdi</span>
                </div>
                <span className="text-[11px] font-bold text-[#aa2d00] dark:text-[#fcab79] cursor-pointer">
                  Change
                </span>
              </div>

              {/* Cart Items List */}
              {cartItems.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingBag className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-medium">Your tray is empty.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Select delicious dishes from the menu to start!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {cartItems.map((cItem) => (
                    <div
                      key={cItem.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl flex items-start justify-between gap-3 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {cItem.name}
                        </h4>
                        {cItem.selectedVariant && (
                          <div className="text-[11px] text-[#aa2d00] dark:text-[#fcab79] font-medium mt-0.5">
                            {cItem.selectedVariant.name}
                          </div>
                        )}
                        {cItem.selectedModifiers.length > 0 && (
                          <div className="text-[10px] text-slate-500">
                            {cItem.selectedModifiers.map(m => m.name).join(', ')}
                          </div>
                        )}
                        <div className="font-extrabold text-xs text-slate-900 dark:text-white mt-1">
                          ₦{(cItem.unitPrice * cItem.quantity).toLocaleString()}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="flex items-center gap-1.5 bg-white dark:bg-[#181d26] border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-full">
                          <button
                            onClick={() => onUpdateCartItemQty(cItem.id, -1)}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">
                            {cItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateCartItemQty(cItem.id, 1)}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveCartItem(cItem.id)}
                          className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-0.5"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Calculation Summary */}
              {cartItems.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ₦{itemsSubtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Delivery Fee (Wurukum)</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ₦{deliveryFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Platform Service Fee</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ₦{platformServiceFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm font-extrabold text-slate-900 dark:text-white">
                    <span>Grand Total</span>
                    <span className="text-lg text-[#aa2d00] dark:text-[#fcab79]">
                      ₦{grandTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Proceed to Checkout CTA */}
                  <button
                    onClick={onProceedToCheckout}
                    className="w-full mt-4 py-3.5 px-6 bg-[#ea580c] hover:bg-[#aa2d00] text-white font-extrabold text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                    id="tray-proceed-to-checkout-btn"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      100% Encrypted Naira Settlement (Paystack / Flutterwave)
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Vendor Information Box */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-[#aa2d00]" />
                <span>Vendor Information</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Operating Hours:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">8:00 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Kitchen Inspection:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Level 5 Food Hygiene</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Direct Dispatch:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Hot-insulated thermal bags</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
