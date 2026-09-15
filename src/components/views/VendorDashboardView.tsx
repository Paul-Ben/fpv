/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ShoppingBag, 
  TrendingUp, 
  Check, 
  Printer, 
  Bike, 
  Plus, 
  Search, 
  Building2, 
  Sparkles, 
  ArrowUpRight, 
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { MenuItem } from '../../types';

interface VendorDashboardViewProps {
  menuItems: MenuItem[];
  onShowToast: (message: string) => void;
}

export const VendorDashboardView: React.FC<VendorDashboardViewProps> = ({
  menuItems,
  onShowToast,
}) => {
  const [isOpenForBusiness, setIsOpenForBusiness] = useState(true);
  const [activeKdsFilter, setActiveKdsFilter] = useState<'all' | 'prep' | 'ready' | 'completed'>('all');
  const [itemsStock, setItemsStock] = useState<Record<string, boolean>>({
    'm-jollof-combo': true,
    'm-egusi-pounded': true,
    'm-tilapia-peppersoup': true,
    'm-fried-rice-chicken': true,
    'm-bitterleaf-soup': true,
  });
  const [ticket1Status, setTicket1Status] = useState<'PREPARING' | 'READY_FOR_PICKUP' | 'PICKED_UP'>('PREPARING');
  const [ticket2Status, setTicket2Status] = useState<'READY_FOR_PICKUP' | 'PICKED_UP'>('READY_FOR_PICKUP');
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleStock = (itemId: string) => {
    setItemsStock(prev => {
      const next = !prev[itemId];
      onShowToast(`Menu item ${next ? 'enabled' : 'marked Out of Stock'}`);
      return { ...prev, [itemId]: next };
    });
  };

  const handleWithdrawal = () => {
    onShowToast('Instant settlement request of ₦184,500.00 initiated to Access Bank (...4892).');
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f17] min-h-screen py-8 px-4 sm:px-6 lg:px-12 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Store Status */}
        <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold bg-[#f5e9d4] dark:bg-emerald-950/50 text-[#0a2e0e] dark:text-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Vendor Portal
              </span>
              <span className="text-[11px] font-bold text-slate-500">ID: VEND-WUR-01</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Mama's Kitchen • Wurukum Branch
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Makurdi Urban District • Multi-Channel Kitchen Display & Menu Management
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Store Open/Close Toggle */}
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Storefront: {isOpenForBusiness ? 'OPEN FOR ORDERS' : 'PAUSED'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsOpenForBusiness(!isOpenForBusiness);
                  onShowToast(isOpenForBusiness ? 'Store closed temporarily' : 'Store is now LIVE for orders');
                }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  isOpenForBusiness ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
                aria-label="Toggle store status"
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isOpenForBusiness ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

            {/* Direct Payout Balance Box */}
            <div className="bg-[#181d26] text-white p-3.5 rounded-xl flex items-center gap-4 shadow-sm">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                  Withdrawable Escrow Balance
                </span>
                <span className="text-lg font-black text-amber-400">
                  ₦184,500.00
                </span>
              </div>
              <button
                onClick={handleWithdrawal}
                className="px-3.5 py-1.5 bg-[#ea580c] hover:bg-[#aa2d00] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Instant Payout
              </button>
            </div>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-[#181d26] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#aa2d00]" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              14
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold mt-1 flex items-center gap-1">
              <span>●</span> 6 in Kitchen Prep, 5 Ready
            </div>
          </div>

          <div className="bg-white dark:bg-[#181d26] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Today's Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              ₦248,000.00
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs yesterday
            </div>
          </div>

          <div className="bg-white dark:bg-[#181d26] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Avg Prep Time</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              18.4 Mins
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Target benchmark: &lt; 22 mins
            </div>
          </div>

          <div className="bg-white dark:bg-[#181d26] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Operational Health</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              98.2%
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">
              Zero canceled orders today
            </div>
          </div>
        </div>

        {/* MAIN TWO-COLUMN SPLIT: KDS ORDERS (LEFT) & MENU/PAYOUT (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: LIVE KITCHEN DISPLAY SYSTEM (KDS) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ea580c] animate-pulse"></span>
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Live Kitchen Display (KDS)
                </h2>
              </div>

              {/* KDS filter tabs */}
              <div className="flex items-center gap-1 bg-white dark:bg-[#181d26] p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                {(['all', 'prep', 'ready', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveKdsFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                      activeKdsFilter === filter
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Card 1: Emeka Daniel */}
            {(activeKdsFilter === 'all' || activeKdsFilter === 'prep' || (activeKdsFilter === 'ready' && ticket1Status === 'READY_FOR_PICKUP')) && (
              <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-base text-[#aa2d00] dark:text-[#fcab79]">
                      #FP-108429
                    </span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded-full">
                      Paystack Verified
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">12 mins ago</span>
                </div>

                <div className="py-3 flex justify-between items-start text-xs border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Emeka Daniel (+234 803 123 4567)
                    </span>
                    <span className="text-slate-500">
                      📍 Plot 14, Wurukum Extension, Makurdi
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    ticket1Status === 'PREPARING'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {ticket1Status === 'PREPARING' ? '🍳 PREPPING DISHES' : '📦 READY FOR PICKUP'}
                  </span>
                </div>

                {/* Ticket Items */}
                <div className="py-3 space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        2× Royal Jollof Rice Combo
                      </span>
                      <span className="text-slate-500 block text-[11px]">
                        Party Portion • Extra Dodo • Fried Beef
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">₦9,000</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        1× Egusi Soup & Pounded Yam
                      </span>
                      <span className="text-slate-500 block text-[11px]">
                        Assorted Goat Meat • Hot Spiced
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">₦4,000</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        1× Chilled Zobo Splash (500ml)
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">₦800</span>
                  </div>
                </div>

                {/* Chef Special Note */}
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-2.5 rounded-xl text-xs text-amber-900 dark:text-amber-200 mb-4">
                  <span className="font-bold">Customer Note:</span> "Pack sauce separately please, extra yaji."
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onShowToast('Ticket printed to kitchen thermal station')}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Kitchen Ticket</span>
                  </button>

                  {ticket1Status === 'PREPARING' ? (
                    <button
                      onClick={() => {
                        setTicket1Status('READY_FOR_PICKUP');
                        onShowToast('Order #FP-108429 marked Ready for Pickup! Dispatcher Terna Michael notified.');
                      }}
                      className="px-4 py-2 bg-[#ea580c] hover:bg-[#aa2d00] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Ready for Pickup</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setTicket1Status('PICKED_UP');
                        onShowToast('Order #FP-108429 handed over to courier Terna Michael');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>Handover to Courier</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Ticket Card 2: Grace Alache */}
            {(activeKdsFilter === 'all' || activeKdsFilter === 'ready') && (
              <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-base text-[#aa2d00] dark:text-[#fcab79]">
                      #FP-108422
                    </span>
                    <span className="text-[10px] font-bold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 px-2 py-0.5 rounded-full">
                      Flutterwave 3DS
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">24 mins ago</span>
                </div>

                <div className="py-3 flex justify-between items-start text-xs border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Grace Alache (+234 814 555 7890)
                    </span>
                    <span className="text-slate-500">
                      📍 High-Level Commercial Area, Makurdi
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    READY FOR DISPATCH
                  </span>
                </div>

                <div className="py-3 space-y-1.5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        2× Spicy Tilapia Pepper Soup
                      </span>
                      <span className="text-slate-500 block text-[11px]">
                        Fresh Catfish stock • Extra pepper sauce
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">₦7,600</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Bike className="w-4 h-4 text-[#ea580c]" />
                    <span>Courier Terna Michael arriving in 2 mins</span>
                  </div>

                  <button
                    onClick={() => {
                      setTicket2Status('PICKED_UP');
                      onShowToast('Dispatched to rider Terna Michael');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Handover to Courier</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: QUICK MENU & PRICE STOCK MANAGER */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Quick Menu & Price Stock Manager
                  </h3>
                  <p className="text-[11px] text-slate-400">Toggle instant availability</p>
                </div>
                <button
                  onClick={() => onShowToast('New menu item modal opened')}
                  className="px-3 py-1.5 bg-[#ea580c] hover:bg-[#aa2d00] text-white text-xs font-bold rounded-full flex items-center gap-1 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Item</span>
                </button>
              </div>

              {/* Search input */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter menu catalog..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="space-y-3">
                {[
                  { id: 'm-jollof-combo', name: 'Royal Jollof Rice Combo', price: 4500, category: 'Main Dishes' },
                  { id: 'm-egusi-pounded', name: 'Egusi Soup + Pounded Yam', price: 4000, category: 'Soups & Swallows' },
                  { id: 'm-tilapia-peppersoup', name: 'Spicy Tilapia Pepper Soup', price: 3800, category: 'Soups & Swallows' },
                  { id: 'm-fried-rice-chicken', name: 'Fried Rice & Crispy Chicken', price: 3600, category: 'Main Dishes' },
                  { id: 'm-bitterleaf-soup', name: 'Fresh Bitterleaf Soup', price: 3500, category: 'Soups & Swallows' },
                ]
                  .filter(it => it.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((it) => {
                    const isAvailable = itemsStock[it.id] ?? true;
                    return (
                      <div
                        key={it.id}
                        className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-700 text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{it.name}</div>
                          <div className="text-[11px] text-[#aa2d00] dark:text-[#fcab79] font-bold">
                            ₦{it.price.toLocaleString()} • {it.category}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isAvailable
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          }`}>
                            {isAvailable ? 'In Stock' : 'Sold Out'}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleToggleStock(it.id)}
                            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                              isAvailable ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              isAvailable ? 'translate-x-4' : 'translate-x-0'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* DAILY SETTLEMENT & BANK ACCOUNT */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <Building2 className="w-4 h-4 text-[#aa2d00]" />
                <span>Daily Settlement & Bank Account</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>Bank Name:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Access Bank Nigeria PLC</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>NUBAN Account:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">0048921849</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Beneficiary:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Mama's Kitchen Wurukum Enterprise</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Next Auto-Payout:</span>
                  <span className="font-bold text-emerald-600">Tonight at 00:00 WAT</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Funds are settled through CBN-regulated NIP rails directly to your verified commercial bank account.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
