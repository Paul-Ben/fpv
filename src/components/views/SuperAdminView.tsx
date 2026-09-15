/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Bike, 
  ShoppingBag, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  X, 
  Lock, 
  Search, 
  Filter,
  RefreshCw,
  FileText
} from 'lucide-react';

interface SuperAdminViewProps {
  onShowToast: (message: string) => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({ onShowToast }) => {
  const [escrows, setEscrows] = useState([
    {
      id: 'ESC-9941',
      orderNumber: '#FP-108429',
      vendor: "Mama's Kitchen Wurukum",
      vendorAmount: 13500,
      rider: 'Terna Michael',
      riderAmount: 850,
      platformFee: 500,
      status: 'HELD_IN_ESCROW',
      gateway: 'Paystack NIP',
      time: '12 mins ago',
    },
    {
      id: 'ESC-9938',
      orderNumber: '#FP-108422',
      vendor: "Mama's Kitchen Wurukum",
      vendorAmount: 7600,
      rider: 'Terna Michael',
      riderAmount: 800,
      platformFee: 300,
      status: 'SETTLED',
      gateway: 'Flutterwave 3DS',
      time: '24 mins ago',
    },
    {
      id: 'ESC-9920',
      orderNumber: '#FP-108399',
      vendor: "Benue Suya & Grill Spot",
      vendorAmount: 11200,
      rider: 'Simon Ochigbo',
      riderAmount: 1200,
      platformFee: 400,
      status: 'SETTLED',
      gateway: 'Paystack NIP',
      time: '1 hour ago',
    }
  ]);

  const [pendingVendors, setPendingVendors] = useState([
    {
      id: 'v-new-1',
      name: 'Benue Valley Grill & Suya Spot',
      location: 'High-Level Commercial Area, Makurdi',
      cacNumber: 'RC-1928491 (CAC Verified)',
      hygieneRating: 'Level 4 Hygiene Certified',
      cuisine: 'Northern Suya, Kilishi & Grilled Catfish',
    },
    {
      id: 'v-new-2',
      name: 'Makurdi North Fish Bar',
      location: 'Near Old Bridge, North Bank, Makurdi',
      cacNumber: 'BN-8829103 (Business Name)',
      hygieneRating: 'Benue Health Inspector Approved',
      cuisine: 'Fresh River Benue Tilapia & Yam Chips',
    }
  ]);

  const handleForceRelease = (escrowId: string) => {
    setEscrows(prev => prev.map(e => e.id === escrowId ? { ...e, status: 'SETTLED' } : e));
    onShowToast(`Escrow ${escrowId} manually disbursed to vendor & rider.`);
  };

  const handleApproveVendor = (vendorId: string, name: string) => {
    setPendingVendors(prev => prev.filter(v => v.id !== vendorId));
    onShowToast(`Vendor ${name} verified and granted live storefront status!`);
  };

  const handleRejectVendor = (vendorId: string, name: string) => {
    setPendingVendors(prev => prev.filter(v => v.id !== vendorId));
    onShowToast(`Vendor application for ${name} declined.`);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f17] min-h-screen py-8 px-4 sm:px-6 lg:px-12 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PLATFORM HEADER */}
        <div className="bg-white dark:bg-[#181d26] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Super Admin Console
              </span>
              <span className="text-[11px] font-bold text-slate-500">Security Ring 0</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Platform Operations & Escrow Engine
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              5.0% Fixed Platform Cut • Automated 24h Dual Settlement via CBN NIP Protocol
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-3.5 rounded-xl">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                24h Gross Escrow Volume
              </div>
              <div className="text-lg font-black text-amber-400">
                ₦4,850,000.00
              </div>
            </div>
          </div>
        </div>

        {/* 4 PLATFORM METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#181d26] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Vendors</span>
              <Building2 className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              38
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">
              Makurdi & FCT Zones
            </div>
          </div>

          <div className="bg-white dark:bg-[#181d26] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Verified Couriers</span>
              <Bike className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              142 Riders
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              98% on active shift today
            </div>
          </div>

          <div className="bg-white dark:bg-[#181d26] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Today's Orders</span>
              <ShoppingBag className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              1,248
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">
              ₦0 dispute chargeback rate
            </div>
          </div>

          <div className="bg-white dark:bg-[#181d26] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Disbursed to Vendors</span>
              <DollarSign className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              ₦4,120,000
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">
              99.8% on-time settlement
            </div>
          </div>
        </div>

        {/* TWO COLUMN: ESCROW LEDGER (LEFT) & VENDOR ONBOARDING (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ESCROW QUEUE */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#ea580c]" />
                <h2 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Real-time Escrow Ledger & Settlement Queue
                </h2>
              </div>
              <button
                onClick={() => onShowToast('Escrow ledger synchronized')}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-bold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sync</span>
              </button>
            </div>

            <div className="space-y-3">
              {escrows.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#181d26] rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {item.id}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">({item.orderNumber})</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                        {item.gateway}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      item.status === 'SETTLED'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {item.status === 'SETTLED' ? '✓ SETTLED TO NUBAN' : '🔒 HELD IN ESCROW'}
                    </span>
                  </div>

                  <div className="py-3 grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Vendor Cut</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ₦{item.vendorAmount.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate">{item.vendor}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rider Payout</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ₦{item.riderAmount.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 block">{item.rider}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Platform 5% Fee</span>
                      <span className="font-bold text-emerald-600">
                        +₦{item.platformFee.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{item.time}</span>

                    {item.status === 'HELD_IN_ESCROW' ? (
                      <button
                        onClick={() => handleForceRelease(item.id)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-[#aa2d00] text-white font-bold rounded-lg text-xs transition-colors"
                      >
                        Force Manual Release
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        CBN NIP Acknowledged
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VENDOR ONBOARDING & KYC */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-500" />
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white">
                Vendor Onboarding & KYC Approvals ({pendingVendors.length})
              </h2>
            </div>

            {pendingVendors.length === 0 ? (
              <div className="bg-white dark:bg-[#181d26] rounded-2xl p-6 text-center text-xs text-slate-500 border border-slate-200 dark:border-slate-800">
                All restaurant partner applications vetted and approved!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingVendors.map((pv) => (
                  <div
                    key={pv.id}
                    className="bg-white dark:bg-[#181d26] rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 text-xs space-y-3"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {pv.name}
                      </div>
                      <p className="text-slate-500 mt-0.5">{pv.location}</p>
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1">
                        🍽 {pv.cuisine}
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        <FileText className="w-3.5 h-3.5 text-blue-500" />
                        <span>CAC: {pv.cacNumber}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{pv.hygieneRating}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleRejectVendor(pv.id, pv.name)}
                        className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl flex items-center justify-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleApproveVendor(pv.id, pv.name)}
                        className="flex-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-1 shadow"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Vendor</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
