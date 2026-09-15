/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  MapPin, 
  Plus, 
  Phone, 
  User, 
  CreditCard, 
  Check, 
  Info, 
  CheckCircle2, 
  Lock, 
  Building2, 
  Home, 
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { CartItem, Address, PaymentMethod, Order } from '../../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  savedAddresses: Address[];
  onBackToMenu: () => void;
  onOrderSuccess: (newOrder: Order) => void;
  onShowToast: (message: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  savedAddresses,
  onBackToMenu,
  onOrderSuccess,
  onShowToast,
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string>(savedAddresses[0]?.id || 'addr-1');
  const [dispatchInstructions, setDispatchInstructions] = useState('Call when at the gate');
  const [customerName, setCustomerName] = useState('Emeka Daniel');
  const [customerPhone, setCustomerPhone] = useState('803 123 4567');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paystack');
  const [chefInstructions, setChefInstructions] = useState('Pack sauce separately please');
  const [promoCode, setPromoCode] = useState('FOODPALACE1K');
  const [promoApplied, setPromoApplied] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

  // Form states for new address
  const [newAddrLabel, setNewAddrLabel] = useState<'HOME' | 'OFFICE' | 'OTHER'>('HOME');
  const [newAddrText, setNewAddrText] = useState('');
  const [newAddrLandmark, setNewAddrLandmark] = useState('');

  // Calculations
  const foodSubtotal = cartItems.length > 0 
    ? cartItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0)
    : 12000;
  const deliveryFee = 800;
  const serviceFee = 300;
  const discount = promoApplied ? 1000 : 0;
  const totalPayable = foodSubtotal + deliveryFee + serviceFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'FOODPALACE1K' || promoCode.trim().toUpperCase() === 'BENUEFEAST20') {
      setPromoApplied(true);
      onShowToast('Promo code applied: -₦1,000 discount!');
    } else {
      onShowToast('Invalid promo code. Try FOODPALACE1K');
    }
  };

  const handleInitiatePayment = () => {
    setShowPaymentModal(true);
  };

  const handleConfirmGatewayPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);

      const chosenAddress = savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0];

      // Create new active order matching PRD and screen3.png
      const createdOrder: Order = {
        id: `fp-${Math.floor(100000 + Math.random() * 900000)}`,
        orderNumber: '#FP-108429',
        customerName,
        customerPhone: `+234 ${customerPhone}`,
        vendorId: 'mamas-kitchen',
        vendorName: "Mama's Kitchen",
        items: cartItems.length > 0 ? cartItems : [
          {
            id: 'it-1',
            menuItemId: 'm-jollof-combo',
            name: 'Royal Jollof Rice Combo',
            basePrice: 4500,
            unitPrice: 6000,
            quantity: 2,
            selectedModifiers: [],
            vendorId: 'mamas-kitchen',
            vendorName: "Mama's Kitchen"
          }
        ],
        subtotal: foodSubtotal,
        deliveryFee,
        serviceFee,
        discount,
        total: totalPayable,
        status: 'OUT_FOR_DELIVERY',
        deliveryOtp: '4829',
        deliveryAddress: {
          ...chosenAddress,
          instructions: dispatchInstructions
        },
        paymentMethod,
        isPaid: true,
        paidAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WAT',
        rider: {
          id: 'rider-terna',
          name: 'Terna Michael',
          phone: '+234 812 998 1234',
          rating: 4.9,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
          vehicle: 'Bajaj Pulsar 150',
          plateNumber: 'MKD-441-XA (Benue)',
          etaMinutes: 12,
          ordersCompleted: 412,
          currentLocationName: 'Wurukum Market bypass'
        },
        customerNote: chefInstructions,
        createdAt: new Date().toISOString(),
        timeline: [
          {
            status: 'PAID',
            label: 'Order Placed & Paid',
            timestamp: 'Just now',
            description: `${paymentMethod === 'paystack' ? 'Paystack' : 'Flutterwave'} Instant Settlement Confirmed`,
            completed: true
          },
          {
            status: 'ACCEPTED',
            label: 'Vendor Accepted',
            timestamp: 'Just now',
            description: "Mama's Kitchen Wurukum Flagship",
            completed: true
          },
          {
            status: 'PREPARING',
            label: 'Food Being Prepared',
            timestamp: 'In progress',
            description: 'Chef station packing fresh batches',
            completed: true
          },
          {
            status: 'READY_FOR_PICKUP',
            label: 'Ready for Pickup',
            timestamp: 'Pending',
            description: 'Bagged with tamper-proof security seal',
            completed: true
          },
          {
            status: 'DISPATCH_ASSIGNED',
            label: 'Dispatcher Assigned',
            timestamp: 'Pending',
            description: 'Terna Michael assigned to delivery',
            completed: true
          },
          {
            status: 'PICKED_UP',
            label: 'Order Picked Up',
            timestamp: 'Pending',
            description: 'Courier collected from restaurant',
            completed: true
          },
          {
            status: 'OUT_FOR_DELIVERY',
            label: 'Out for Delivery',
            timestamp: 'Active',
            description: 'Courier in transit on motorcycle (12 min eta)',
            completed: false,
            isCurrent: true
          },
          {
            status: 'DELIVERED',
            label: 'Delivered to Gate / Door',
            timestamp: 'Awaiting',
            description: 'Awaiting courier arrival at delivery landmark',
            completed: false
          },
          {
            status: 'CUSTOMER_CONFIRMED',
            label: 'Customer Confirmed',
            timestamp: 'Awaiting',
            description: 'Awaiting 4-digit OTP verification (4829)',
            completed: false
          }
        ]
      };

      onOrderSuccess(createdOrder);
    }, 1600);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f17] min-h-screen py-8 px-4 sm:px-6 lg:px-12 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMenu}
              className="p-2 rounded-full bg-white dark:bg-[#181d26] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
              aria-label="Back to restaurant menu"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-xs font-bold text-[#aa2d00] dark:text-[#fcab79] uppercase tracking-wider">
                Step 2 of 2 • Instant Dispatch Order
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Finalize & Pay
              </h1>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-800 dark:text-emerald-300 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>256-Bit Encrypted Nigerian Naira Settlement</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ORDER CHECKOUT FORM */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Delivery Destination */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#181d26] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h2 className="font-bold text-base text-slate-900 dark:text-white">
                    Delivery Destination
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNewAddressModal(true)}
                  className="text-xs font-bold text-[#aa2d00] dark:text-[#fcab79] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="space-y-3">
                {savedAddresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-[#aa2d00] bg-orange-50/40 dark:bg-orange-950/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full mt-0.5 border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#aa2d00] bg-[#aa2d00] text-white'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                              {addr.label}
                            </span>
                            {addr.tag && (
                              <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full">
                                {addr.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                            {addr.addressText}
                          </p>
                          <p className="text-[11px] text-[#aa2d00] dark:text-[#fcab79] font-medium mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>Landmark: {addr.landmark}</span>
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Instructions for Dispatch Rider
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 text-xs mr-2">🛵</span>
                  <input
                    type="text"
                    value={dispatchInstructions}
                    onChange={(e) => setDispatchInstructions(e.target.value)}
                    placeholder="e.g. Call when at the gate, don't ring bell..."
                    className="bg-transparent text-xs text-slate-900 dark:text-white w-full focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Recipient Contact Details */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#181d26] text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h2 className="font-bold text-base text-slate-900 dark:text-white">
                    Recipient Contact Details
                  </h2>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">SMS & Call updates</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Customer Full Name
                  </label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 rounded-xl px-3 py-2.5 border border-slate-200 dark:border-slate-700">
                    <User className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Emeka Daniel"
                      className="bg-transparent text-xs text-slate-900 dark:text-white w-full focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Active Nigerian Mobile (WhatsApp Ready)
                  </label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 rounded-xl px-3 py-2.5 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mr-2 flex items-center gap-1 border-r border-slate-300 dark:border-slate-600 pr-2">
                      🇳🇬 +234
                    </span>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="803 123 4567"
                      className="bg-transparent text-xs text-slate-900 dark:text-white w-full focus:outline-none font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Settlement Channels (Zero Surcharge) */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#181d26] text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h2 className="font-bold text-base text-slate-900 dark:text-white">
                    Settlement Channels
                  </h2>
                </div>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  ZERO SURCHARGE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Paystack */}
                <div
                  onClick={() => setPaymentMethod('paystack')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'paystack'
                      ? 'border-[#aa2d00] bg-orange-50/40 dark:bg-orange-950/20 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'paystack' ? 'border-[#aa2d00] bg-[#aa2d00]' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'paystack' && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">Paystack</span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#181d26] text-white px-2 py-0.5 rounded-full">
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Mastercard, Visa, Verve, Instant NIP Bank Transfer & USSD (*737#, *894#, *966#).
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>💳 🏦 📱</span>
                    <span className="text-emerald-600">99.98% Success Rate</span>
                  </div>
                </div>

                {/* Flutterwave */}
                <div
                  onClick={() => setPaymentMethod('flutterwave')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'flutterwave'
                      ? 'border-[#aa2d00] bg-orange-50/40 dark:bg-orange-950/20 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'flutterwave' ? 'border-[#aa2d00] bg-[#aa2d00]' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'flutterwave' && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">Flutterwave</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">Pan-Africa Multi-Pay</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Cards, Mobile Money, Direct Debit, Barter, and NQR Direct Scanning.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>💳 📱 🔲</span>
                    <span className="text-blue-600">Secure 3DS2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Special Instructions for Kitchen Chef */}
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#181d26] text-white flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <h2 className="font-bold text-base text-slate-900 dark:text-white">
                  Special Instructions for Kitchen Chef
                </h2>
              </div>

              <textarea
                rows={2}
                value={chefInstructions}
                onChange={(e) => setChefInstructions(e.target.value)}
                placeholder="Pack sauce separately please, extra yaji, cutlery..."
                className="w-full bg-slate-50 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Special requests are subject to kitchen availability and handled with high culinary hygiene.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: SELECTED BASKET SUMMARY */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="bg-white dark:bg-[#181d26] rounded-2xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-800">
              
              {/* Vendor Info header */}
              <div className="bg-slate-900 text-white p-3.5 rounded-xl flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-600 p-1 flex items-center justify-center font-bold text-base">
                    MK
                  </div>
                  <div>
                    <div className="font-bold text-sm flex items-center gap-1">
                      <span>Mama's Kitchen</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-[11px] text-slate-300">Wurukum District • ⏱ 25–35 mins</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#af3003] px-2 py-0.5 rounded-full uppercase">
                  Single Vendor
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Selected Basket Items ({cartItems.length || 3})
                </span>
                <button
                  onClick={onBackToMenu}
                  className="text-xs font-bold text-[#aa2d00] dark:text-[#fcab79] hover:underline"
                >
                  Modify Cart
                </button>
              </div>

              {/* Items Snapshot */}
              <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                {cartItems.length > 0 ? (
                  cartItems.map((it) => (
                    <div key={it.id} className="flex justify-between items-start text-xs">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {it.name} <span className="text-slate-400 font-normal">× {it.quantity}</span>
                        </div>
                        {it.selectedVariant && (
                          <div className="text-[11px] text-slate-500">{it.selectedVariant.name}</div>
                        )}
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white shrink-0">
                        ₦{(it.unitPrice * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          Royal Jollof Rice <span className="text-slate-400 font-normal">× 2</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Smokey party style • Beef chunk</div>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">₦7,000</span>
                    </div>

                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          Extra Plantain (Dodo) <span className="text-slate-400 font-normal">× 2</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Sweet sliced portion</div>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">₦1,000</span>
                    </div>

                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          Egusi Soup + Pounded Yam <span className="text-slate-400 font-normal">× 1</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Assorted meat & stockfish</div>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">₦4,000</span>
                    </div>
                  </>
                )}
              </div>

              {/* Promo Code Input */}
              <div className="my-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon / Promo Code"
                    className="bg-slate-50 dark:bg-slate-800/80 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white w-full uppercase font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shrink-0"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Charges Summary */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Food Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₦{foodSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Express Dispatch (Wurukum)</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Platform Service Fee</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₦{serviceFee.toLocaleString()}
                  </span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      PROMO DISCOUNT: FOODPALACE1K
                    </span>
                    <span>-₦{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                      Total Payable
                    </span>
                    <span className="text-[10px] text-slate-400">All statutory local taxes inclusive</span>
                  </div>
                  <span className="text-2xl font-black text-[#aa2d00] dark:text-[#fcab79]">
                    ₦{totalPayable.toLocaleString()}
                  </span>
                </div>

                {/* Big Action Button */}
                <button
                  onClick={handleInitiatePayment}
                  className="w-full mt-4 py-4 px-6 bg-slate-900 hover:bg-[#aa2d00] dark:bg-white dark:text-slate-900 dark:hover:bg-[#ea580c] dark:hover:text-white text-white font-black text-sm rounded-full shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98"
                  id="checkout-pay-button"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    Pay ₦{totalPayable.toLocaleString()} with {paymentMethod === 'paystack' ? 'Paystack' : 'Flutterwave'}
                  </span>
                </button>

                <div className="pt-2 text-center space-y-1">
                  <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> Paystack
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span> Flutterwave
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> NDPR Certified
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Your payment is held in escrow until dispatch verification by mama's kitchen rider.
                  </p>
                </div>
              </div>

            </div>

            {/* Fresh Food Policy Callout */}
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 p-4 rounded-2xl flex items-start gap-3">
              <span className="text-xl">🍲</span>
              <div className="text-xs text-orange-900 dark:text-orange-200">
                <span className="font-bold block mb-0.5">Fresh Food Policy:</span>
                Dishes are made-to-order. Once paid, the vendor immediately begins fresh preparation. No cancellations after 5 minutes.
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* PAYMENT GATEWAY INTERACTIVE MODAL (PAYSTACK / FLUTTERWAVE SIMULATION) */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181d26] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${paymentMethod === 'paystack' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                <span className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  {paymentMethod === 'paystack' ? 'Paystack Checkout' : 'Flutterwave Gateway'}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#aa2d00] dark:text-[#fcab79]">
                ₦{totalPayable.toLocaleString()} NGN
              </span>
            </div>

            <div className="my-6 space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs space-y-2">
                <div className="flex justify-between text-slate-500">
                  <span>Merchant:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">FoodPalace Nigeria (Escrow)</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Vendor Destination:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Mama's Kitchen Wurukum</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Customer:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{customerName} (+234 {customerPhone})</span>
                </div>
              </div>

              {/* Payment Type Selection tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button className="py-2.5 px-2 rounded-xl bg-slate-900 text-white text-xs font-bold text-center">
                  🏦 NIP Transfer
                </button>
                <button className="py-2.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold text-center hover:bg-slate-200">
                  💳 Debit Card
                </button>
                <button className="py-2.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold text-center hover:bg-slate-200">
                  📱 USSD Dial
                </button>
              </div>

              {/* Bank Transfer Details Simulation */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-2">
                <div className="text-blue-900 dark:text-blue-200 font-semibold">
                  Transfer exact amount to the dedicated virtual NUBAN account:
                </div>
                <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-blue-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Wema Bank / Titan Trust</span>
                    <span className="font-mono text-sm font-black text-slate-900 dark:text-white">9938 1084 29</span>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded font-bold">
                    Expires in 29:50
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                disabled={isProcessingPayment}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmGatewayPayment}
                disabled={isProcessingPayment}
                className="flex-2 py-3 bg-[#aa2d00] hover:bg-[#ea580c] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying with CBN NIP...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>I Have Sent ₦{totalPayable.toLocaleString()}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW ADDRESS MODAL */}
      {showNewAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181d26] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
              Add New Delivery Landmark
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Location Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['HOME', 'OFFICE', 'OTHER'] as const).map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setNewAddrLabel(label)}
                      className={`py-2 px-3 rounded-xl font-bold transition-colors ${
                        newAddrLabel === label
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Street / House Address
                </label>
                <input
                  type="text"
                  value={newAddrText}
                  onChange={(e) => setNewAddrText(e.target.value)}
                  placeholder="e.g. Block 4, Judges Quarters, Makurdi"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nearest Notable Landmark (Essential in Nigeria)
                </label>
                <input
                  type="text"
                  value={newAddrLandmark}
                  onChange={(e) => setNewAddrLandmark(e.target.value)}
                  placeholder="e.g. Opposite BSU Second Gate, beside FCMB"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowNewAddressModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newAddrText) {
                    onShowToast('Please enter an address');
                    return;
                  }
                  setShowNewAddressModal(false);
                  onShowToast('Address saved successfully!');
                }}
                className="flex-1 py-2.5 bg-[#aa2d00] hover:bg-[#ea580c] text-white font-bold text-xs rounded-xl"
              >
                Save Landmark
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
