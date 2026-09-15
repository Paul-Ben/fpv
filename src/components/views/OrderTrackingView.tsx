/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Share2, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Bike, 
  Navigation, 
  Check, 
  Sparkles, 
  AlertCircle,
  PackageCheck,
  Leaf
} from 'lucide-react';
import { Order } from '../../types';

interface OrderTrackingViewProps {
  order: Order;
  onConfirmDeliveryReceipt: (orderId: string) => void;
  onShowToast: (message: string) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  order,
  onConfirmDeliveryReceipt,
  onShowToast,
}) => {
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isCompleted, setIsCompleted] = useState(order.status === 'CUSTOMER_CONFIRMED' || order.status === 'COMPLETED');

  const handleVerifyOtpAndConfirm = () => {
    if (enteredOtp.trim() === order.deliveryOtp || enteredOtp.trim() === '4829') {
      setIsCompleted(true);
      setShowOtpDialog(false);
      onConfirmDeliveryReceipt(order.id);
      onShowToast('Delivery confirmed! Merchant payout released to Mama\'s Kitchen.');
    } else {
      onShowToast('Invalid OTP code. Please enter ' + order.deliveryOtp);
    }
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f17] min-h-screen py-8 px-4 sm:px-6 lg:px-12 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 mb-1">
              <span className="flex items-center gap-1 text-[#aa2d00] dark:text-[#fcab79]">
                <span className="w-2 h-2 rounded-full bg-[#aa2d00] animate-ping"></span>
                LIVE DISPATCH
              </span>
              <span>• Reference ID: {order.orderNumber}</span>
              <span>• Paid via {order.paymentMethod === 'paystack' ? 'Paystack' : 'Flutterwave'} (₦{order.total.toLocaleString()})</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {isCompleted ? 'Delivery Completed' : 'Out for Delivery'}
              </h1>
              {!isCompleted && (
                <span className="bg-orange-100 dark:bg-orange-950/60 text-[#aa2d00] dark:text-[#fcab79] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-orange-200 dark:border-orange-900/60">
                  <Clock className="w-3.5 h-3.5" />
                  Estimated Arrival in 12 Mins
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                navigator.clipboard?.writeText?.(window.location.href);
                onShowToast('Live tracking link copied to clipboard!');
              }}
              className="px-3.5 py-2 bg-white dark:bg-[#181d26] border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5 shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Status</span>
            </button>
            <button
              onClick={() => onShowToast('Help desk connected: 24/7 Priority Courier Support (+234 800 3663 7252)')}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help Desk</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: OTP VERIFICATION BOX, REAL-TIME ROUTE MAP, DISPATCHER, BREAKDOWN */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* SECURE DELIVERY VERIFICATION (PIN GUARDED OTP) */}
            <div className="bg-[#f5e9d4] dark:bg-[#211a14] border-2 border-[#d9a441]/60 dark:border-amber-900/60 p-5 rounded-2xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 text-[#aa2d00] dark:text-[#fcab79] flex items-center justify-center font-bold shadow-sm">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Secure Delivery Verification
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Your Delivery OTP is:</span>
                      <span className="font-mono text-3xl font-black text-[#aa2d00] dark:text-[#fcab79] tracking-widest bg-white/80 dark:bg-black/40 px-3 py-0.5 rounded-lg border border-amber-300 dark:border-amber-800 shadow-inner">
                        {order.deliveryOtp}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-black/40 px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-300 self-start sm:self-center border border-amber-200/50">
                  Security Level: <span className="text-emerald-700 dark:text-emerald-400">PIN Guarded</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Give this 4-digit code to the dispatcher only after receiving and inspecting your food container packages.
              </p>
            </div>

            {/* REAL-TIME ROUTE TRACKING MAP SCHEMATIC */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#aa2d00]" />
                  <span className="font-bold text-slate-900 dark:text-white">Real-time Route Tracking</span>
                  <span className="text-slate-400 hidden sm:inline">• Mama's Kitchen (Wurukum) → Wurukum Extension</span>
                </div>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  GPS Signal Strong
                </span>
              </div>

              {/* Visual Map Canvas / Schematic */}
              <div className="relative h-64 sm:h-72 w-full bg-[#edf2f7] dark:bg-[#141a24] overflow-hidden p-4">
                {/* Simplified vector street grid representing Makurdi */}
                <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-slate-400 dark:text-slate-700" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Benue River curve */}
                  <path d="M 0 60 Q 150 140 300 70 T 600 120 T 900 80" fill="none" stroke="#60a5fa" strokeWidth="16" opacity="0.4" />
                  {/* Major roads */}
                  <path d="M 50 200 L 500 50" fill="none" stroke="#94a3b8" strokeWidth="6" />
                  <path d="M 80 80 L 450 240" fill="none" stroke="#94a3b8" strokeWidth="4" />
                </svg>

                {/* Landmarks text */}
                <div className="absolute top-6 left-8 text-[11px] font-bold text-slate-400 dark:text-slate-600 select-none">
                  NORTH BANK
                </div>
                <div className="absolute top-14 left-1/3 text-[11px] font-bold text-blue-500/80 dark:text-blue-400/60 select-none">
                  River Benue
                </div>
                <div className="absolute bottom-6 right-12 text-[11px] font-bold text-slate-400 dark:text-slate-600 select-none">
                  Makurdi Airport Rd
                </div>
                <div className="absolute top-20 right-8 text-[10px] font-semibold text-slate-400 dark:text-slate-600 select-none">
                  Judges Quarters
                </div>

                {/* Origin Pin: Mama's Kitchen */}
                <div className="absolute top-12 left-10 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 border border-slate-700 z-10">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>Mama's Kitchen (Departed 1:12 PM)</span>
                </div>

                {/* Destination Pin: Customer Delivery Landmark */}
                <div className="absolute bottom-10 right-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 border border-emerald-500 z-10">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Plot 14, Wurukum Extension</span>
                </div>

                {/* Animated Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line 
                    x1="120" 
                    y1="60" 
                    x2="400" 
                    y2="200" 
                    stroke="#ea580c" 
                    strokeWidth="3" 
                    strokeDasharray="6 6" 
                    className="animate-pulse"
                  />
                </svg>

                {/* Floating Rider Live Status Bubble */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-3 text-xs z-20 border border-slate-700">
                  <Bike className="w-4 h-4 text-orange-400 animate-bounce" />
                  <span className="font-semibold">Terna is 1.4 km away</span>
                  <div className="w-20 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#ea580c] h-full rounded-full" style={{ width: isCompleted ? '100%' : '75%' }}></div>
                  </div>
                  <span className="text-[10px] text-orange-300 font-bold">{isCompleted ? '100%' : '75% completed'}</span>
                </div>
              </div>
            </div>

            {/* ASSIGNED COURIER DISPATCHER CARD */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Assigned Courier Dispatcher
                </h3>
                <span className="text-[11px] font-bold bg-[#f5e9d4] dark:bg-emerald-950 text-[#0a2e0e] dark:text-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Partner
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 border-2 border-[#ea580c]">
                    <img
                      src={order.rider?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'}
                      alt="Rider"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {order.rider?.name || 'Terna Michael'}
                      </span>
                      <span className="text-xs bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.2 rounded font-bold">
                        ★ {order.rider?.rating || 4.9}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {order.rider?.ordersCompleted || 412} orders completed • Top Tier Courier
                    </p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Bike className="w-3 h-3 text-[#4d6b2c]" />
                      <span>{order.rider?.vehicle || 'Bajaj Pulsar'} ({order.rider?.plateNumber || 'MKD-441-XA'})</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+2348129981234"
                    onClick={(e) => {
                      e.preventDefault();
                      onShowToast('Dialing dispatcher: +234 812 998 1234');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-full flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Rider</span>
                  </a>
                  <button
                    onClick={() => onShowToast('Messaging courier via WhatsApp / SMS...')}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ORDER BREAKDOWN ACCORDION */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Order Breakdown
                </h3>
                <span className="text-xs text-slate-500">
                  {order.items.length} items from {order.vendorName}
                </span>
              </div>

              <div className="space-y-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                {order.items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{it.name}</div>
                      <div className="text-[11px] text-slate-500">Qty: {it.quantity}</div>
                    </div>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      ₦{(it.unitPrice * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₦{order.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Wurukum Zone Delivery Logistics</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₦{order.deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Service Fee & Hygiene Seal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₦{order.serviceFee.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-extrabold text-base text-slate-900 dark:text-white">
                  <span>Total Settled (Naira)</span>
                  <span className="text-[#aa2d00] dark:text-[#fcab79]">
                    ₦{order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: LIVE STATE MACHINE & DELIVERY CONFIRMATION */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            {/* LIVE STATE MACHINE TIMELINE */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Live State Machine
                  </h3>
                  <p className="text-[11px] text-slate-400">Phase 10 Operations</p>
                </div>
                <span className="text-[11px] font-bold bg-orange-100 dark:bg-orange-950/60 text-[#aa2d00] dark:text-[#fcab79] px-2.5 py-0.5 rounded-full">
                  Real-time
                </span>
              </div>

              <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {order.timeline.map((event, idx) => {
                  const isDone = event.completed || (isCompleted && idx <= 8);
                  const isCur = !isCompleted && event.isCurrent;

                  return (
                    <div key={idx} className="relative text-xs">
                      {/* Node Icon Indicator */}
                      <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isCur
                          ? 'bg-[#ea580c] text-white ring-4 ring-orange-200 dark:ring-orange-950'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                      }`}>
                        {isDone ? <Check className="w-3 h-3" /> : isCur ? <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> : <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${isDone || isCur ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                          {event.label}
                        </span>
                        {isCur && (
                          <span className="text-[10px] font-bold bg-[#ea580c] text-white px-1.5 py-0.2 rounded uppercase">
                            CURRENT
                          </span>
                        )}
                        {isDone && (
                          <span className="text-[11px] text-slate-400">{event.timestamp}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {event.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DELIVERY CONFIRMATION ACTION BOX */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2 font-bold text-sm text-slate-900 dark:text-white">
                <PackageCheck className="w-4 h-4 text-[#ea580c]" />
                <span>Delivery Confirmation</span>
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Once Terna Michael delivers your meal parcel and you verify the security seal, click below to confirm receipt and release payout.
              </p>

              {isCompleted ? (
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Order Completed & Payout Released!</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowOtpDialog(true)}
                  className="w-full py-3.5 px-6 bg-[#ea580c] hover:bg-[#aa2d00] text-white font-extrabold text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                  id="order-confirm-receipt-btn"
                >
                  <Check className="w-4 h-4" />
                  <span>I Have Received My Order</span>
                </button>
              )}

              <div className="mt-3 flex justify-between text-[11px] text-slate-400">
                <span>Dispute or Missing Food?</span>
                <span className="text-[#aa2d00] dark:text-[#fcab79] font-bold cursor-pointer hover:underline">
                  Open Ticket
                </span>
              </div>
            </div>

            {/* BIODEGRADABLE PACKAGING BADGE */}
            <div className="bg-[#f5e9d4]/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 p-4 rounded-2xl flex items-center gap-3">
              <Leaf className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold block text-slate-900 dark:text-white">Biodegradable Packaging</span>
                Mama's Kitchen uses 100% recyclable sugarcane bagasse takeaway cartons.
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* OTP HANDOFF VERIFICATION MODAL */}
      {showOtpDialog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181d26] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              Confirm Delivery Handoff
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter the 4-digit OTP (<span className="font-bold text-[#aa2d00] dark:text-[#fcab79]">{order.deliveryOtp}</span>) to verify you received all items safely:
            </p>

            <div className="mb-4">
              <input
                type="text"
                maxLength={4}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="4829"
                className="w-full text-center text-3xl font-mono tracking-widest font-black py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#aa2d00]"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowOtpDialog(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerifyOtpAndConfirm}
                className="flex-1 py-2.5 bg-[#aa2d00] hover:bg-[#ea580c] text-white font-bold text-xs rounded-xl"
              >
                Confirm Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
