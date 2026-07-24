'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Box } from 'lucide-react';

interface FooterProps {
  onReopenBox: () => void;
}

export default function LuxuryFooter({ onReopenBox }: FooterProps) {
  return (
    <footer className="py-16 px-4 sm:px-6 bg-[#DCCFC0]/30 border-t border-[#DCCFC0] text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Monogram Seal */}
        <div className="w-16 h-16 rounded-full gold-wax-seal flex items-center justify-center text-[#FDF6ED] font-serif-luxury text-2xl font-bold shadow-lg">
          A&R
        </div>

        <div className="space-y-2">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#778873] uppercase font-light tracking-widest">
            Ashly & Roshin
          </h2>
          <p className="font-display text-xs tracking-[0.3em] uppercase text-[#AA771C] font-semibold">
            15 August 2026 • Amalapuram & Malayattoor
          </p>
        </div>

        <p className="font-serif-luxury text-base text-[#778873]/80 italic max-w-md">
          &ldquo;Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.&rdquo;
        </p>

        {/* Reopen Box Button */}
        <button
          onClick={onReopenBox}
          className="mt-2 px-6 py-2.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#AA771C] font-sans-clean text-xs font-semibold tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#FDF6ED] transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <Box className="w-4 h-4" />
          <span>Re-open Keepsake Box</span>
        </button>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-2" />

        <p className="font-sans-clean text-[11px] text-[#778873]/60 tracking-wider">
          Handcrafted Luxury Engagement Digital Experience © 2026
        </p>
      </div>
    </footer>
  );
}
