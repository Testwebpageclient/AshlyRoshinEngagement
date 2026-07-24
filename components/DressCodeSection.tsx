'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function DressCodeSection() {
  const colorPalette = [
    { name: 'Soft Ivory', hex: '#FDF6ED', border: true },
    { name: 'Linen Taupe', hex: '#DCCFC0' },
    { name: 'Sage Green', hex: '#A1BC98' },
    { name: 'Deep Moss', hex: '#778873' },
    { name: 'Royal Gold', hex: '#D4AF37' },
  ];

  return (
    <section id="dresscode" className="py-24 px-4 sm:px-6 relative bg-luxury-paper overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/30 text-[#AA771C] text-xs font-sans-clean tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Style Inspiration</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#778873] tracking-wider uppercase font-light">
            Dress Code
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
          <p className="font-display text-xs tracking-[0.3em] uppercase text-[#AA771C] font-semibold">
            Royal Ethnic & Formal Elegance
          </p>
        </motion.div>

        {/* Color Palette Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 sm:p-10 rounded-3xl bg-linen-card embossed-card border border-[#DCCFC0] mb-12"
        >
          <h3 className="font-serif-luxury text-xl text-[#778873] mb-6">
            Suggested Color Palette
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {colorPalette.map((color) => (
              <div key={color.name} className="flex flex-col items-center gap-2.5 group">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300 ${
                    color.border ? 'border border-[#DCCFC0]' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-sans-clean text-xs font-medium text-[#778873]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>

          <p className="font-serif-luxury text-sm text-[#778873]/80 italic mt-8 max-w-xl mx-auto">
            We kindly invite our guests to complement the celebration with subtle pastels, warm ivory, sage greens, or regal gold tones.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
