/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Clock, 
  Bike, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  TrendingUp, 
  Tag, 
  ShieldCheck, 
  Zap, 
  Award,
  Navigation
} from 'lucide-react';
import { Vendor, MenuItem, CartItem, CityZone } from '../../types';

interface ExploreViewProps {
  vendors: Vendor[];
  menuItems: MenuItem[];
  onSelectVendor: (vendorId: string) => void;
  onAddToCart: (item: CartItem) => void;
  currentCity: CityZone;
  onShowToast: (message: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  vendors,
  menuItems,
  onSelectVendor,
  onAddToCart,
  currentCity,
  onShowToast,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'rice' | 'grills' | 'soups'>('all');
  const [locationInput, setLocationInput] = useState('Wurukum Market Road, Makurdi');
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleGpsClick = () => {
    onShowToast('GPS detected: High Level, Makurdi (Accuracy: 12m)');
    setLocationInput('High Level Commercial Way, Makurdi');
  };

  // Filter meals
  const filteredMeals = menuItems.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'rice') return item.name.toLowerCase().includes('rice');
    if (activeFilter === 'grills') return item.category === 'Grills & Sides' || item.name.toLowerCase().includes('suya') || item.name.toLowerCase().includes('shawarma');
    if (activeFilter === 'soups') return item.category === 'Soups & Swallows' || item.name.toLowerCase().includes('soup');
    return true;
  });

  const handleQuickAdd = (item: MenuItem) => {
    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      basePrice: item.price,
      unitPrice: item.price,
      quantity: 1,
      selectedModifiers: [],
      vendorId: item.vendorId,
      vendorName: vendors.find(v => v.id === item.vendorId)?.name || "Mama's Kitchen",
      image: item.image,
    };
    onAddToCart(cartItem);
    onShowToast(`${item.name} added to tray! (₦${item.price.toLocaleString()})`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#0d1218] px-4 sm:px-6 lg:px-12 pt-8 pb-16 transition-colors">
        {/* Glow gradients */}
        <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[#fcab79]/20 dark:bg-[#fcab79]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-48 left-1/4 w-80 h-80 rounded-full bg-[#f4d35e]/15 dark:bg-[#f4d35e]/5 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Tag / Scope */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5e9d4] dark:bg-[#221c16] text-[#0a2e0e] dark:text-[#fcab79] mb-4 shadow-sm border border-orange-200/50 dark:border-orange-900/30">
            <Sparkles className="w-4 h-4 text-[#aa2d00]" />
            <span className="text-xs uppercase tracking-wider font-bold">
              Benue Valley & National Culinary Network
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 max-w-3xl leading-tight">
            Craving delectable dishes from your favorite local vendors?
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Authentic Benue yam flour delicacies, wood-smoked suya skewers, and rich party jollof, prepared fresh by certified neighborhood kitchens and delivered swiftly to your doorstep.
          </p>

          {/* Search & Location Bar */}
          <div className="w-full max-w-3xl bg-white dark:bg-[#181d26] p-2 rounded-2xl md:rounded-full shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-2">
            <div className="flex items-center gap-2 flex-1 w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl md:rounded-full">
              <MapPin className="w-5 h-5 text-[#aa2d00] shrink-0" />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter street, area (e.g. Wurukum, High Level, Makurdi)..."
                className="bg-transparent text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none w-full placeholder-slate-400"
                id="hero-address-input"
              />
              <button
                type="button"
                onClick={handleGpsClick}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1 bg-slate-200 dark:bg-slate-700 px-2.5 py-1 rounded-full shrink-0"
              >
                <Navigation className="w-3 h-3 text-[#aa2d00]" />
                <span>GPS</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onSelectVendor('mamas-kitchen')}
              className="w-full md:w-auto px-6 py-3 bg-[#181d26] hover:bg-[#0d1218] dark:bg-[#ea580c] dark:hover:bg-[#aa2d00] text-white font-bold text-xs sm:text-sm rounded-xl md:rounded-full flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
              id="hero-explore-kitchens-btn"
            >
              <span>Explore Kitchens</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Cravings Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-slate-600 dark:text-slate-300">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mr-1">Trending Cravings:</span>
            {[
              { label: 'Jollof Rice', color: 'bg-[#aa2d00]' },
              { label: 'Spicy Suya', color: 'bg-[#ea580c]' },
              { label: 'Shawarma', color: 'bg-[#d9a441]' },
              { label: 'Pounded Yam & Egusi', color: 'bg-[#4d6b2c]' },
              { label: 'Fresh Meat Pies', color: 'bg-[#fcab79]' },
            ].map((craving) => (
              <button
                key={craving.label}
                onClick={() => {
                  if (craving.label.includes('Rice')) setActiveFilter('rice');
                  else if (craving.label.includes('Suya') || craving.label.includes('Shawarma')) setActiveFilter('grills');
                  else if (craving.label.includes('Egusi')) setActiveFilter('soups');
                  else setActiveFilter('all');
                  onShowToast(`Showing results for: ${craving.label}`);
                }}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium rounded-full transition-colors flex items-center gap-1.5"
              >
                <span className={`w-2 h-2 rounded-full ${craving.color}`}></span>
                {craving.label}
              </button>
            ))}
          </div>

          {/* Quick Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-10 pt-6 max-w-4xl w-full">
            <div className="flex items-center gap-3 p-3 bg-slate-50/90 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-left">
              <div className="w-10 h-10 rounded-full bg-[#f5e9d4] dark:bg-orange-950/40 text-[#aa2d00] flex items-center justify-center font-bold shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">28 Mins</div>
                <div className="text-[11px] text-slate-500">Average {currentCity} Dispatch</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50/90 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-left">
              <div className="w-10 h-10 rounded-full bg-[#a8d8c4] dark:bg-emerald-950/40 text-[#0a2e0e] dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">140+ Kitchens</div>
                <div className="text-[11px] text-slate-500">NAFDAC & Certified</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50/90 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-left">
              <div className="w-10 h-10 rounded-full bg-[#fcab79]/50 dark:bg-orange-950/40 text-[#601500] dark:text-[#fcab79] flex items-center justify-center font-bold shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">₦0 Surcharge</div>
                <div className="text-[11px] text-slate-500">Instant Naira Settlement</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50/90 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-left">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white flex items-center justify-center font-bold shrink-0">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">4.9 / 5.0</div>
                <div className="text-[11px] text-slate-500">18,400+ Diner Reviews</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORY CURATED CATALOG SLIDER */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-10 bg-slate-50 dark:bg-[#111622] transition-colors border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#aa2d00] dark:text-[#fcab79] font-bold block">
                Curated Catalog
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Explore by Culinary Style
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollSlider('left')}
                className="w-9 h-9 rounded-full bg-white dark:bg-[#181d26] text-slate-800 dark:text-slate-200 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Previous Category"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                className="w-9 h-9 rounded-full bg-white dark:bg-[#181d26] text-slate-800 dark:text-slate-200 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Next Category"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Card 1: African Traditional */}
            <div
              onClick={() => {
                setActiveFilter('soups');
                onSelectVendor('mamas-kitchen');
              }}
              className="group min-w-[210px] md:min-w-[230px] p-4 rounded-xl bg-[#f5e9d4] dark:bg-[#201a14] text-slate-900 dark:text-white cursor-pointer hover:-translate-y-1 transition-all duration-200 shadow-sm flex flex-col justify-between h-64 border border-orange-200/60 dark:border-orange-950"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/40 text-[#0a2e0e] dark:text-[#a8d8c4] font-bold">
                  42 Kitchens
                </span>
                <span className="text-xs font-bold text-[#0a2e0e] dark:text-[#fcab79]">Swallows</span>
              </div>
              <div className="my-2 h-28 overflow-hidden rounded-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpjZZp225To6nevVs0eMV-Mmc8xkuj9NwBfKPeLfGgrSDMiQ9_uUMXwAJoUJDf0_MNaJOqU7OdP7Em8r75os8jaDXab88K_L_cFRhXzMqM2iHjAvsHlY6f1cXC6acrVbJEbOpwazAAtPZkahQTMO-c1vOv9X1X8h1C8Hjy5vqtaRDEOjr62XpTyFr13mTVMa7UWu5AapnQlcoRE80AFyIAoTXUJAb6mY7yKdZtTkMlBCU2hWNhA29U"
                  alt="African Traditional delicacies"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">African Traditional</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Swallow, Soups & Stews</p>
              </div>
            </div>

            {/* Card 2: Fast Food & Grills */}
            <div
              onClick={() => {
                setActiveFilter('grills');
                onSelectVendor('royal-palace-grills');
              }}
              className="group min-w-[210px] md:min-w-[230px] p-4 rounded-xl bg-[#ffdbd1] dark:bg-[#2a1712] text-slate-900 dark:text-white cursor-pointer hover:-translate-y-1 transition-all duration-200 shadow-sm flex flex-col justify-between h-64 border border-orange-200/60 dark:border-orange-950"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/40 text-[#af3003] dark:text-[#ffb5a0] font-bold">
                  36 Kitchens
                </span>
                <span className="text-xs font-bold text-[#af3003] dark:text-[#ffb5a0]">Charcoal</span>
              </div>
              <div className="my-2 h-28 overflow-hidden rounded-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3o6tUuyAqN_ENIiZBDNEYM3GcfCCodFFTVljSYoXeW2thUy7WyjUo9myThF3DzT0KDuniwzuz9mPmeiGvmkW5nQlcfdzKfYhe9PnoUmF4PrmOAasfSrb098Yf3vnJL9d8LKyScnLjLIbyU2Ttri-oxbu19jCk_yTyl1JD70y27Az0mwF9Ls2COVa4QIsfywFqCfP2NcT8FZv598G7kMeY8y2p03bdeyT2ombP8fV5-pJ1wagrlfbh"
                  alt="Fast Food & Grills suya"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Fast Food & Grills</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Suya, Shawarma, Wings</p>
              </div>
            </div>

            {/* Card 3: Pizza & Burgers */}
            <div
              onClick={() => onSelectVendor('royal-palace-grills')}
              className="group min-w-[210px] md:min-w-[230px] p-4 rounded-xl bg-[#c4eebd] dark:bg-[#142316] text-slate-900 dark:text-white cursor-pointer hover:-translate-y-1 transition-all duration-200 shadow-sm flex flex-col justify-between h-64 border border-emerald-200/60 dark:border-emerald-950"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/40 text-[#0a2e0e] dark:text-emerald-400 font-bold">
                  19 Kitchens
                </span>
                <span className="text-xs font-bold text-[#0a2e0e] dark:text-emerald-400">Oven Fire</span>
              </div>
              <div className="my-2 h-28 overflow-hidden rounded-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgcMaq6j2sNcJDP1Bd1fB2dp57pHatXjhXSwQpgUA1bz0UXQsgA9pstYN4ZstpTEcKOnm2KLJ7C4BNO1IDsYq1mznWvJSlEy1TFtxGKYdC4kMOdG30cxGU6d4OjTampvSilVWmqP0gVQ1R-lVG1GC2aQAo6W8JKRYc11WmZgFvY-fvf1KqHwKtFK6lxNkAYPHGgdGpMJlikIjPd5Frqn92N6hOgsHUD7qee3jvIJdlW1XiVWdakfNn"
                  alt="Pizza & Burgers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Pizza & Burgers</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Artisan Crusts & Patties</p>
              </div>
            </div>

            {/* Card 4: Bakery & Sweets */}
            <div
              onClick={() => onSelectVendor('benue-delight-bakers')}
              className="group min-w-[210px] md:min-w-[230px] p-4 rounded-xl bg-[#fcab79]/30 dark:bg-[#2b1b15] text-slate-900 dark:text-white cursor-pointer hover:-translate-y-1 transition-all duration-200 shadow-sm flex flex-col justify-between h-64 border border-orange-200/60 dark:border-orange-950"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/40 text-[#aa2d00] dark:text-[#fcab79] font-bold">
                  24 Bakeries
                </span>
                <span className="text-xs font-bold text-[#aa2d00] dark:text-[#fcab79]">Fresh Oven</span>
              </div>
              <div className="my-2 h-28 overflow-hidden rounded-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu1zdfSvXl4efYC-4p2MeWQ6TqiMDTAfM7XtU5DVqll4DbM5sQHKay7_wO9KpO2dFykFnWGTvoh56inPRbT0J1MmId9m_D136sZ0rmsvAAoolFDbBU-vB29IHIuvA1CK2bolLROqqShZMQOr6i30FYSF6mPc_cEFnO-KiQ56O3rEGp19Zr12gxcqmy3boa54COPIsfz2EIa3832SLZh7a3z1WL7kaGmNNbV37MgzfeeFMD-8v0cocS"
                  alt="Bakery & Sweets pastries"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Bakery & Sweets</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Pastries, Doughnuts & Breads</p>
              </div>
            </div>

            {/* Card 5: Fresh Drinks & Smoothies */}
            <div
              onClick={() => onSelectVendor('mamas-kitchen')}
              className="group min-w-[210px] md:min-w-[230px] p-4 rounded-xl bg-[#f4d35e]/30 dark:bg-[#262010] text-slate-900 dark:text-white cursor-pointer hover:-translate-y-1 transition-all duration-200 shadow-sm flex flex-col justify-between h-64 border border-amber-200/60 dark:border-amber-950"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/40 text-slate-900 dark:text-amber-400 font-bold">
                  18 Spots
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Cold Pressed</span>
              </div>
              <div className="my-2 h-28 overflow-hidden rounded-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV-fVarBwZUS2qXEoOZSl_-b1ELmbpoF7pvFzufHi1UUX176-QWseeCO1ltRYtHrwlVis4lNFO5tThY_z0-vvhHZcRTfrXsMygtp9vjxksgp6J6fgQMQTrFFwBWE0N-XUU9SBKrVr5mDbzXnQL-7AaYFzIPlu7S5dcg0Bb0V6QfnOfuu6bt0GBKLTCYcquRmTOH_YedqXuV5NYLhjBxf4RSKmRAFtCuHaWsz2-VOlQ8gdSsbi4vHLY"
                  alt="Zobo & fresh drinks"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Fresh Drinks</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Zobo, Smoothies & Juices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VENDORS SPOTLIGHT */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-14 bg-white dark:bg-[#0d1218] transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-5 h-5 text-[#aa2d00]" />
                <span className="text-xs uppercase tracking-wider text-[#aa2d00] dark:text-[#fcab79] font-bold">
                  Quality Assured Kitchens
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Featured Vendors in {currentCity}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                High-volume, top-rated Benue culinary kitchens vetted for cleanliness and rapid fulfillment.
              </p>
            </div>
            <button
              onClick={() => onSelectVendor('mamas-kitchen')}
              className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs hover:text-[#aa2d00] dark:hover:text-[#fcab79] transition-colors"
            >
              <span>View All 84 Kitchens</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendors.slice(0, 3).map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white dark:bg-[#181d26] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all duration-300 flex flex-col group"
              >
                {/* Accent line */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: vendor.accentColor || '#aa2d00' }}
                ></div>

                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={vendor.coverImage}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{vendor.rating}</span>
                    <span className="text-slate-300 text-[10px]">({vendor.reviewCount}+)</span>
                  </div>

                  {vendor.badge && (
                    <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm ${vendor.badgeColor || 'bg-[#ea580c] text-white'}`}>
                      <Flame className="w-3 h-3" />
                      <span>{vendor.badge}</span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#aa2d00] dark:group-hover:text-[#fcab79] transition-colors">
                        {vendor.name}
                      </h3>
                      {vendor.verified && (
                        <span className="text-[11px] font-bold bg-[#f5e9d4] dark:bg-emerald-950/40 text-[#0a2e0e] dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      {vendor.cuisine} • {vendor.address.split(',')[0]}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 mb-3">
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5 text-[#aa2d00]" />
                        <span>{vendor.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                        <Bike className="w-3.5 h-3.5 text-[#4d6b2c]" />
                        <span>₦{vendor.deliveryFee} Express</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
                      Famous: {vendor.famousFor}
                    </span>
                    <button
                      onClick={() => onSelectVendor(vendor.id)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-[#aa2d00] dark:bg-slate-100 dark:hover:bg-[#ea580c] text-white dark:text-slate-900 dark:hover:text-white text-xs font-bold rounded-full transition-colors shrink-0 shadow-sm"
                    >
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR MEALS GRID: INTERACTIVE WITH PORTION & ADD */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-14 bg-slate-50 dark:bg-[#111622] transition-colors border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4d35e]/30 dark:bg-amber-950/40 text-slate-900 dark:text-amber-300 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#aa2d00]" />
                <span className="text-xs font-bold">Trending Today in {currentCity}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Popular Meals in Makurdi
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Directly ordered from certified Benue kitchens with instant delivery queueing.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm ${
                  activeFilter === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-white dark:bg-[#181d26] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Dishes
              </button>
              <button
                onClick={() => setActiveFilter('rice')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm ${
                  activeFilter === 'rice'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-white dark:bg-[#181d26] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Rice Specials
              </button>
              <button
                onClick={() => setActiveFilter('grills')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm ${
                  activeFilter === 'grills'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-white dark:bg-[#181d26] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Grills & Meats
              </button>
              <button
                onClick={() => setActiveFilter('soups')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm ${
                  activeFilter === 'soups'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-white dark:bg-[#181d26] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Soups & Bowls
              </button>
            </div>
          </div>

          {/* Meals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMeals.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#181d26] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all duration-200 flex flex-col group"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isChefPick && (
                    <div className="absolute top-2 left-2 bg-[#aa2d00] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      Chef Pick
                    </div>
                  )}
                  {item.isSpicy && !item.isChefPick && (
                    <div className="absolute top-2 left-2 bg-[#af3003] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      Extra Spicy
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-slate-900/70 backdrop-blur text-white text-[11px] px-2 py-0.5 rounded font-medium">
                    {vendors.find(v => v.id === item.vendorId)?.name || "Mama's Kitchen"}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#aa2d00] dark:group-hover:text-[#fcab79] transition-colors leading-snug line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Portion Price</span>
                      <span className="text-base font-extrabold text-slate-900 dark:text-white">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(item)}
                      className="px-3.5 py-2 bg-[#181d26] hover:bg-[#ea580c] dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-[#ea580c] dark:hover:text-white text-white rounded-full text-xs font-bold flex items-center gap-1 transition-all active:scale-95 shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL PROMOTIONS BANNER: 20% OFF WEEKEND FEASTS */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-12 bg-white dark:bg-[#0d1218] transition-colors">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden bg-[#181d26] text-white p-6 sm:p-10 relative shadow-2xl border border-slate-800">
          
          {/* Ambient Glow */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#aa2d00]/30 blur-3xl pointer-events-none"></div>
          <div className="absolute left-1/2 -top-24 w-60 h-60 rounded-full bg-[#ea580c]/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#aa2d00] text-white text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                Limited Weekend Deal
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                20% OFF Weekend Feasts on orders above ₦8,000
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                Gather friends and family for traditional Benue spreads. Use coupon code{' '}
                <span className="bg-[#1d1f25] text-[#fcab79] px-2 py-0.5 rounded font-mono font-bold border border-slate-700">
                  BENUEFEAST20
                </span>{' '}
                during checkout. Valid through Sunday midnight.
              </p>

              {/* Instant Settlement Gateways */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-slate-300 text-xs">
                <span className="font-semibold text-white">Instant Checkout Protected By:</span>
                <div className="flex items-center gap-1.5 bg-[#1d1f25] border border-slate-700 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Paystack Instant NIP Transfer & Cards</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#1d1f25] border border-slate-700 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>Flutterwave Gateway</span>
                </div>
              </div>
            </div>

            {/* Flash Cart Builder preview */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="w-full bg-[#1d1f25]/90 border border-slate-700 p-5 rounded-2xl backdrop-blur-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-[#fcab79] uppercase">Flash Cart Builder</span>
                  <span className="text-[11px] bg-[#ea580c] text-white px-2 py-0.5 rounded-full font-bold">
                    Instant Promo
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Family Jollof Tub + Suya Skewers</span>
                    <span className="text-white font-semibold">₦9,200</span>
                  </div>
                  <div className="flex justify-between text-[#a8d8c4]">
                    <span>Weekend 20% Voucher (BENUEFEAST20)</span>
                    <span>- ₦1,840</span>
                  </div>
                  <div className="pt-2 border-t border-slate-700 flex justify-between font-bold text-sm text-white">
                    <span>Total Payable</span>
                    <span className="text-[#fcab79]">₦7,360 NGN</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectVendor('mamas-kitchen');
                  onShowToast('Promo code BENUEFEAST20 pre-activated for checkout!');
                }}
                className="w-full text-center py-3.5 px-6 bg-[#aa2d00] hover:bg-[#af3003] text-white font-bold text-sm rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Claim 20% Discount Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
