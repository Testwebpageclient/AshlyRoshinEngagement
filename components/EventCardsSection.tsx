'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Church, GlassWater, ExternalLink, Sparkles, Navigation } from 'lucide-react';

export default function EventCardsSection() {
  return (
    <section id="details" className="py-24 px-4 sm:px-6 relative bg-luxury-paper overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/30 text-[#AA771C] text-xs font-sans-clean tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Sacred Celebrations</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#778873] tracking-wider uppercase font-light">
            Order of Events
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#778873]/80 italic">
            We request the honour of your presence at the solemnization & grand reception
          </p>
        </motion.div>

        {/* Two Flagship Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 w-full">
          {/* Card 1: Engagement Ceremony */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group relative p-8 sm:p-10 rounded-3xl bg-linen-card embossed-card flex flex-col justify-between hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-500 border border-[#DCCFC0]"
          >
            {/* Top Gold Foil Wax Seal Stamp Accent */}
            <div className="absolute -top-5 right-8 w-10 h-10 rounded-full gold-wax-seal flex items-center justify-center text-[#FDF6ED] font-serif-luxury font-bold text-sm shadow-md">
              01
            </div>

            <div>
              {/* Event Icon Header */}
              <div className="w-14 h-14 rounded-2xl bg-[#FAF3E0] border border-[#D4AF37]/40 flex items-center justify-center text-[#AA771C] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Church className="w-7 h-7" />
              </div>

              <span className="font-display text-xs tracking-[0.3em] uppercase text-[#AA771C] font-semibold">
                Ceremony
              </span>

              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#778873] font-normal my-2">
                Engagement Ceremony
              </h3>

              <div className="w-16 h-[1px] bg-[#D4AF37]/50 my-4" />

              <div className="space-y-3 font-sans-clean text-sm text-[#778873]">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="font-semibold">Saturday, 15 August 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>4:00 PM Onwards</span>
                </div>
                <div className="flex items-start gap-3 pt-1">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold block text-[#778873]">St. Joseph&apos;s Church</span>
                    <span className="text-xs text-[#778873]/80">Amalapuram</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#DCCFC0]/60 flex items-center justify-between">
              <a
                href="https://maps.google.com/?q=St.+Joseph's+Church,+Amalapuram"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#AA771C] font-sans-clean text-xs font-semibold tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#FDF6ED] transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href="#venues"
                className="text-xs font-sans-clean font-semibold tracking-wider uppercase text-[#778873] hover:text-[#AA771C] transition-colors flex items-center gap-1"
              >
                <span>Venue Details</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2: Evening Reception */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative p-8 sm:p-10 rounded-3xl bg-linen-card embossed-card flex flex-col justify-between hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-500 border border-[#DCCFC0]"
          >
            {/* Top Gold Foil Wax Seal Stamp Accent */}
            <div className="absolute -top-5 right-8 w-10 h-10 rounded-full gold-wax-seal flex items-center justify-center text-[#FDF6ED] font-serif-luxury font-bold text-sm shadow-md">
              02
            </div>

            <div>
              {/* Event Icon Header */}
              <div className="w-14 h-14 rounded-2xl bg-[#FAF3E0] border border-[#D4AF37]/40 flex items-center justify-center text-[#AA771C] mb-6 group-hover:scale-110 transition-transform duration-300">
                <GlassWater className="w-7 h-7" />
              </div>

              <span className="font-display text-xs tracking-[0.3em] uppercase text-[#AA771C] font-semibold">
                Celebration
              </span>

              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#778873] font-normal my-2">
                Evening Reception
              </h3>

              <div className="w-16 h-[1px] bg-[#D4AF37]/50 my-4" />

              <div className="space-y-3 font-sans-clean text-sm text-[#778873]">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="font-semibold">Saturday, 15 August 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>6:00 PM Onwards</span>
                </div>
                <div className="flex items-start gap-3 pt-1">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold block text-[#778873]">Mangalath Resorts</span>
                    <span className="text-xs text-[#778873]/80">Malayattoor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#DCCFC0]/60 flex items-center justify-between">
              <a
                href="https://maps.google.com/?q=Mangalath+Resorts,+Malayattoor"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#AA771C] font-sans-clean text-xs font-semibold tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#FDF6ED] transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href="#venues"
                className="text-xs font-sans-clean font-semibold tracking-wider uppercase text-[#778873] hover:text-[#AA771C] transition-colors flex items-center gap-1"
              >
                <span>Venue Details</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
