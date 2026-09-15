/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bike, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Navigation, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Check, 
  AlertTriangle,
  Compass
} from 'lucide-react';
import { Order } from '../../types';

interface RiderPortalViewProps {
  activeOrder: Order;
  onConfirmDeliveryByRider: (orderId: string) => void;
  onShowToast: (message: string) => void;
}

export const RiderPortalView: React.FC<RiderPortalViewProps> = ({
  activeOrder,
  onConfirmDeliveryByRider,
  onShowToast,
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [riderStep, setRiderStep] = useState<'TRANSIT' | 'ARRIVED' | 'CONFIRMED'>(
    activeOrder.status === 'DELIVERED' || activeOrder.status === 'CUSTOMER_CONFIRMED'
      ? 'CONFIRMED'
      : 'TRANSIT'
  );
  const [customerOtpInput, setCustomerOtpInput] = useState('');

  const handleVerifyOtp = () => {
    if (customerOtpInput.trim() === activeOrder.deliveryOtp || customerOtpInput.trim() === '4829') {
      setRiderStep('CONFIRMED');
      onConfirmDeliveryByRider(activeOrder.id);
      onShowToast('Delivery verified successfully! ₦850 logistics fee credited to rider wallet.');
    } else {
      onShowToast(`Invalid OTP. Ask customer for 4-digit code (Hint: ${activeOrder.deliveryOtp})`);
    }
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f17] min-h-screen py-8 px-4 sm:px-6 lg:px-12 transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* RIDER PROFILE & STATUS HEADER */}
        <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border-2 border-[#ea580c] shrink-0">
              <img
                src={activeOrder.rider?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"}
                alt="Terna Michael"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Terna Michael
                </h1>
                <span className="text-xs bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full">
                  ★ 4.9 (412 trips)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Bajaj Pulsar 150 (Plate: MKD-441-XA • Benue)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Duty toggle */}
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Duty: {isOnline ? 'ONLINE & DISPATCHABLE' : 'OFFLINE'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsOnline(!isOnline);
                  onShowToast(isOnline ? 'Rider duty paused' : 'Rider duty ACTIVE');
                }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isOnline ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

            {/* Today's Earnings */}
            <div className="bg-slate-900 text-white p-3 rounded-xl">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Today's Payout</div>
              <div className="text-base font-black text-emerald-400">₦28,400.00</div>
            </div>
          </div>
        </div>

        {/* ACTIVE MISSION CARD */}
        <div className="bg-white dark:bg-[#181d26] rounded-2xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ea580c] animate-ping"></span>
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white">
                Active Dispatch Mission • {activeOrder.orderNumber}
              </h2>
            </div>
            <span className="text-xs font-bold text-[#aa2d00] dark:text-[#fcab79] bg-orange-100 dark:bg-orange-950/60 px-3 py-1 rounded-full">
              Standard Express • ₦850 Logistics Fee
            </span>
          </div>

          {/* Route details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs mb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">1. Pick Up Restaurant</span>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                Mama's Kitchen (Wurukum Flagship)
              </div>
              <p className="text-slate-500">Wurukum Market Road, Makurdi</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">2. Deliver To Customer</span>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {activeOrder.customerName} ({activeOrder.customerPhone})
              </div>
              <p className="text-slate-500">
                {activeOrder.deliveryAddress.addressText}
              </p>
              <p className="text-[11px] text-[#aa2d00] dark:text-[#fcab79] font-medium">
                Landmark: {activeOrder.deliveryAddress.landmark}
              </p>
            </div>
          </div>

          {/* Milestone Action Flow */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Trip Milestone Checklist
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>1. Collected & Inspected Hot Bags at Mama's Kitchen</span>
                </div>
                <span className="text-[11px] text-emerald-600">01:12 PM</span>
              </div>

              {riderStep === 'TRANSIT' && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-900 text-xs">
                  <div>
                    <span className="font-bold text-orange-950 dark:text-orange-200 block">
                      2. Riding to Customer Destination (Wurukum Extension)
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Follow GPS coordinates on Benue Urban road network.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setRiderStep('ARRIVED');
                      onShowToast('Customer notified: Courier has arrived at the gate.');
                    }}
                    className="px-4 py-2 bg-[#ea580c] hover:bg-[#aa2d00] text-white font-bold rounded-xl text-xs shadow shrink-0"
                  >
                    I Have Arrived at Delivery Address
                  </button>
                </div>
              )}

              {riderStep === 'ARRIVED' && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 text-xs space-y-3">
                  <div>
                    <span className="font-bold text-amber-950 dark:text-amber-200 block text-sm">
                      3. Collect Customer 4-Digit Handover OTP
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px]">
                      Inspect package seal with customer and enter their OTP to finalize delivery.
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      maxLength={4}
                      value={customerOtpInput}
                      onChange={(e) => setCustomerOtpInput(e.target.value)}
                      placeholder="Enter 4829"
                      className="w-36 text-center font-mono font-bold text-lg py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                    />
                    <button
                      onClick={handleVerifyOtp}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow"
                    >
                      Verify OTP & Complete Trip
                    </button>
                  </div>
                </div>
              )}

              {riderStep === 'CONFIRMED' && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-center font-bold text-emerald-800 dark:text-emerald-300">
                  🎉 Trip #FP-108429 Complete! Logistics fee credited to your account.
                </div>
              )}
            </div>
          </div>

          {/* Quick Communication & Map Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Launch GPS Navigation</span>
            </a>

            <button
              onClick={() => onShowToast('Calling customer: +234 803 123 4567')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call Customer</span>
            </button>

            <button
              onClick={() => onShowToast('Opening WhatsApp chat with customer')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span>WhatsApp Chat</span>
            </button>
          </div>

        </div>

        {/* TRIP EARNINGS HISTORY */}
        <div className="bg-white dark:bg-[#181d26] rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
            Recent Completed Dispatches Today
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-700">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Trip #FP-108399 • High-Level Commercial Area</div>
                <div className="text-slate-500">Spicy Tilapia • Delivered in 16 mins</div>
              </div>
              <span className="font-bold text-emerald-600">₦1,200 + ₦500 tip</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-700">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Trip #FP-108385 • Judges Quarters</div>
                <div className="text-slate-500">Pounded Yam Combo • Delivered in 21 mins</div>
              </div>
              <span className="font-bold text-emerald-600">₦1,500</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-700">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Trip #FP-108361 • Wurukum Market</div>
                <div className="text-slate-500">Fresh Egusi Soup • Delivered in 11 mins</div>
              </div>
              <span className="font-bold text-emerald-600">₦800</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
