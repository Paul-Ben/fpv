/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, PhoneCall, Mail, CreditCard } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#181d26] text-white pt-16 pb-12 mt-16 border-t border-slate-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Nigerian Naira Assurance */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-white tracking-tight">FoodPalace</span>
              <span className="bg-[#af3003] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                NG
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Nigeria's leading multi-vendor culinary network. Fresh local delicacies delivered swiftly across Makurdi, Abuja, and Lagos.
            </p>
            <div className="flex items-center gap-2 text-[#fcab79] text-xs font-semibold pt-1">
              <CreditCard className="w-4 h-4 text-[#ea580c]" />
              <span>All transactions settled securely in Nigerian Naira (₦).</span>
            </div>
          </div>

          {/* Col 2: Cities Covered */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-3 tracking-wide">
              Cities Covered
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white transition-colors"
                >
                  Makurdi Express Zones (Wurukum, High Level, BSU)
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Abuja Central, Wuse II & Gwarinpa
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Lagos Mainland & Lekki Phase 1
                </span>
              </li>
              <li>
                <span className="text-slate-500 italic">
                  Port Harcourt Hub (Launching Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform Ecosystem */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-3 tracking-wide">
              Platform Ecosystem
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('vendor')}
                  className="hover:text-white transition-colors text-left"
                >
                  Vendor Merchant Hub (Live KDS & 86'd Stock)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('rider')}
                  className="hover:text-white transition-colors text-left"
                >
                  Rider Dispatch Operations & OTP Check
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition-colors text-left"
                >
                  Admin Super Console & Approvals
                </button>
              </li>
              <li>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  NAFDAC & Hygiene Verification Standards
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Regulatory */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-3 tracking-wide">
              Support & Inquiries
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              24/7 dedicated assistance for diners, kitchen merchants, and dispatch couriers.
            </p>
            <div className="bg-[#1d1f25] border border-slate-800 p-3 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-[#a8d8c4] font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hotline: +234 (0) 800 3663 7252</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@foodpalace.ng</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                CAC RC: 1849204 | NDPR Data Compliant
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2025 FoodPalace Logistics Nigeria Limited. All rights reserved. Powered by Naira instant settlement engine.</p>
          <div className="flex items-center gap-5">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Merchant SLA</span>
            <span className="hover:text-slate-300 cursor-pointer">NDPR Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
