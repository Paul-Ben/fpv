/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Star, Clock, Bike, Filter, MapPin, CheckCircle2 } from 'lucide-react';
import { Vendor } from '../../types';

interface RestaurantsViewProps {
  vendors: Vendor[];
  onSelectVendor: (vendor: Vendor) => void;
}

export const RestaurantsView: React.FC<RestaurantsViewProps> = ({
  vendors,
  onSelectVendor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  const categories = ['All', 'Nigerian Jollof', 'Native Soups', 'Catfish & Peppersoup', 'Grills & Suya', 'Continental'];

  const filteredVendors = vendors.filter((v) => {
    const matchesCategory = selectedCategory === 'All' || v.cuisine.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLoc = selectedLocation === 'All' || v.address.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesCategory && matchesSearch && matchesLoc;
  });

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f17] min-h-screen py-8 px-4 sm:px-6 lg:px-12 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold bg-[#f5e9d4] dark:bg-emerald-950/50 text-[#0a2e0e] dark:text-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Benue & FCT Kitchens
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Explore Kitchens & Vendors
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Order fresh authentic meals directly from verified commercial restaurants
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or restaurants..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#181d26] rounded-full text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-[#181d26] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => onSelectVendor(vendor)}
              className="bg-white dark:bg-[#181d26] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={vendor.coverImage}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{vendor.rating} ({vendor.reviewCount})</span>
                  </div>
                  {vendor.badge && (
                    <div className={`absolute top-3 right-3 ${vendor.badgeColor || 'bg-[#aa2d00] text-white'} px-2.5 py-1 rounded-full text-[10px] font-bold shadow`}>
                      {vendor.badge}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-[#aa2d00] transition-colors">
                      {vendor.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                    {vendor.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                      {vendor.cuisine}
                    </span>
                    <span className="text-[10px] font-semibold bg-orange-50 dark:bg-orange-950/40 text-[#aa2d00] dark:text-[#fcab79] px-2 py-0.5 rounded-full">
                      {vendor.famousFor}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{vendor.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5 text-slate-400" />
                  <span>₦{vendor.deliveryFee} Express</span>
                </div>
                <div className="font-bold text-[#aa2d00] dark:text-[#fcab79]">
                  Min ₦{vendor.minOrder.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
