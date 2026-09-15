/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  User, 
  Sun, 
  Moon, 
  MapPin, 
  Search, 
  Menu as MenuIcon, 
  X, 
  ChevronDown,
  Store,
  Bike,
  ShieldCheck
} from 'lucide-react';
import { CityZone } from '../types';

interface HeaderProps {
  currentView: string;
  setCurrentView?: (view: string) => void;
  onNavigate?: (view: string) => void;
  cartCount: number;
  openCartDrawer?: () => void;
  openAuthModal?: (mode?: 'login' | 'register' | 'vendor') => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean | ((prev: boolean) => boolean)) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  currentCity?: CityZone;
  setCurrentCity?: (city: CityZone) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  activeOrderCount?: number;
  user?: any | null;
  onSignOut?: () => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onNavigate,
  cartCount = 0,
  openCartDrawer,
  openAuthModal,
  darkMode,
  setDarkMode,
  isDarkMode,
  onToggleDarkMode,
  currentCity: externalCity,
  setCurrentCity: externalSetCity,
  searchQuery: externalSearchQuery,
  setSearchQuery: externalSetSearchQuery,
  user,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);
  const [internalCity, setInternalCity] = useState<CityZone>('Makurdi');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');

  const currentCity = externalCity ?? internalCity;
  const setCurrentCity = externalSetCity ?? setInternalCity;
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalSetSearchQuery ?? setInternalSearchQuery;

  const handleNavigate = (view: string) => {
    let target = view;
    if (view === 'vendor') target = 'vendor-dashboard';
    if (view === 'rider') target = 'rider-portal';

    if (typeof onNavigate === 'function') {
      onNavigate(target);
    } else if (typeof setCurrentView === 'function') {
      setCurrentView(target);
    }
  };

  const isDarkActive = darkMode ?? isDarkMode ?? false;
  const handleToggleTheme = () => {
    if (typeof onToggleDarkMode === 'function') {
      onToggleDarkMode();
    } else if (typeof setDarkMode === 'function') {
      setDarkMode((prev) => !prev);
    }
  };

  const handleCartClick = () => {
    if (typeof openCartDrawer === 'function') {
      openCartDrawer();
    } else {
      handleNavigate('checkout');
    }
  };

  const handleAuthClick = (mode: 'login' | 'register' | 'vendor' = 'login') => {
    if (user && onSignOut) {
      onSignOut();
    } else if (typeof openAuthModal === 'function') {
      openAuthModal(mode);
    }
  };

  const cities: CityZone[] = ['Makurdi', 'Abuja', 'Lagos'];

  const isPortalActive = ['vendor', 'rider', 'admin', 'vendor-dashboard', 'rider-portal'].includes(currentView);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#111622]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3 max-w-7xl mx-auto">
        
        {/* Left: Brand Logo & City Selector */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <button 
            onClick={() => handleNavigate('explore')} 
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#aa2d00] to-[#ea580c] flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              FP
            </div>
            <div>
              <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight block leading-tight">
                FoodPalace
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#aa2d00] dark:text-[#fcab79] block">
                Express Nigeria
              </span>
            </div>
          </button>

          {/* Location Badge Selector */}
          <div className="relative">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="hidden sm:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              id="header-city-selector"
            >
              <MapPin className="w-3.5 h-3.5 text-[#aa2d00] dark:text-[#ea580c]" />
              <span>{currentCity}, NG</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 w-44 bg-white dark:bg-[#181d26] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-50">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Delivery Hub
                </div>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setCurrentCity(city);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      currentCity === city
                        ? 'text-[#aa2d00] dark:text-[#fcab79] font-bold bg-orange-50/60 dark:bg-orange-950/30'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{city} Metro</span>
                    {currentCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#aa2d00]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="w-full flex items-center bg-slate-100 dark:bg-slate-800/90 rounded-full px-4 py-2 border border-slate-200/80 dark:border-slate-700/80 focus-within:ring-2 focus-within:ring-[#aa2d00]/30 transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search jollof rice, suya, egusi, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-0 focus:outline-none w-full text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400"
              id="global-search-input"
            />
            <span className="text-[10px] font-bold text-[#aa2d00] dark:text-[#fcab79] bg-orange-100 dark:bg-orange-950/50 px-2 py-0.5 rounded-full shrink-0">
              ₦ NGN
            </span>
          </div>
        </div>

        {/* Right: Navigation Links, Theme Toggle, Cart & User */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavigate('explore')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-full transition-colors ${
                currentView === 'explore'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => handleNavigate('restaurants')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-full transition-colors ${
                currentView === 'restaurants'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => handleNavigate('tracking')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-full transition-colors ${
                currentView === 'tracking'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              My Orders
            </button>

            {/* Portals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-full transition-colors flex items-center gap-1 ${
                  isPortalActive
                    ? 'bg-[#aa2d00] text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>Portals</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {portalsDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-52 bg-white dark:bg-[#181d26] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-50">
                  <button
                    onClick={() => {
                      handleNavigate('vendor-dashboard');
                      setPortalsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Store className="w-4 h-4 text-[#ea580c]" />
                    <div>
                      <div className="font-semibold">Vendor Merchant Hub</div>
                      <div className="text-[10px] text-slate-400">Live KDS & Menu 86'd</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      handleNavigate('rider-portal');
                      setPortalsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Bike className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-semibold">Rider Dispatch Desk</div>
                      <div className="text-[10px] text-slate-400">Pickup & OTP Confirm</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      handleNavigate('admin');
                      setPortalsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-semibold">Platform Admin Console</div>
                      <div className="text-[10px] text-slate-400">Approvals & Settlements</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={handleToggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            id="theme-toggle-btn"
          >
            {isDarkActive ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Cart Icon & Live Count */}
          <button
            onClick={handleCartClick}
            className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors"
            id="header-cart-btn"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ea580c] text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth Button */}
          <button
            onClick={() => handleAuthClick('login')}
            className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors flex items-center justify-center"
            id="header-user-btn"
            aria-label={user ? 'Sign Out' : 'Sign In or Account'}
          >
            {user ? (
              <span className="text-xs font-bold">{user.email?.charAt(0).toUpperCase()}</span>
            ) : (
              <User className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#181d26] border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="mb-3">
            <div className="w-full flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-3.5 py-2 border border-slate-200 dark:border-slate-700">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search food or restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 focus:outline-none w-full text-xs text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                handleNavigate('explore');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              🍽️ Explore Market
            </button>
            <button
              onClick={() => {
                handleNavigate('restaurants');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              🥘 Restaurants & Menu
            </button>
            <button
              onClick={() => {
                handleNavigate('tracking');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              📍 Track Active Orders
            </button>
            <button
              onClick={() => {
                handleNavigate('checkout');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              💳 Finalize & Checkout
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  handleNavigate('vendor-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-medium text-[#ea580c] bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1.5 rounded-md"
              >
                Vendor Hub
              </button>
              <button
                onClick={() => {
                  handleNavigate('rider-portal');
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1.5 rounded-md"
              >
                Rider Desk
              </button>
              <button
                onClick={() => {
                  handleNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1.5 rounded-md"
              >
                Admin
              </button>
            </div>
            <button
              onClick={() => {
                handleAuthClick('register');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-white bg-[#aa2d00] px-3 py-1.5 rounded-full"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
