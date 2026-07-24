'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Heart, MapPin, Sparkles, Clock, ArrowDown } from 'lucide-react';
import { downloadIcsFile, generateGoogleCalendarUrl } from '@/lib/calendar';

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-08-15T16:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-between px-4 sm:px-6 overflow-hidden bg-luxury-paper text-center">
      {/* Background Floral SVG Framing Accents */}
      <div className="absolute top-12 left-4 sm:left-12 opacity-30 pointer-events-none w-36 sm:w-56 h-36 sm:h-56">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#A1BC98]">
          <path d="M20 100 C 20 50, 50 20, 100 20 C 70 40, 40 70, 20 100 Z" fill="currentColor" opacity="0.6" />
          <path d="M100 20 C 150 20, 180 50, 180 100 C 160 70, 130 40, 100 20 Z" fill="currentColor" opacity="0.4" />
          <circle cx="100" cy="100" r="8" fill="#D4AF37" />
        </svg>
      </div>

      <div className="absolute bottom-12 right-4 sm:right-12 opacity-30 pointer-events-none w-36 sm:w-56 h-36 sm:h-56 transform rotate-180">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#A1BC98]">
          <path d="M20 100 C 20 50, 50 20, 100 20 C 70 40, 40 70, 20 100 Z" fill="currentColor" opacity="0.6" />
          <path d="M100 20 C 150 20, 180 50, 180 100 C 160 70, 130 40, 100 20 Z" fill="currentColor" opacity="0.4" />
          <circle cx="100" cy="100" r="8" fill="#D4AF37" />
        </svg>
      </div>

      {/* Hero Top Monogram & Subheading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex flex-col items-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#FAF3E0]/80 border border-[#D4AF37]/40 text-[#AA771C] shadow-sm mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-display text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase">
            Save The Date
          </span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <p className="font-serif-luxury text-lg sm:text-xl text-[#778873] italic tracking-wide mb-2">
          Together with their families
        </p>
      </motion.div>

      {/* Center Dominant Names: ASHLY & ROSHIN */}
      <div className="my-auto py-8 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative"
        >
          {/* Subtle Golden Glow Halo behind Names */}
          <div className="absolute -inset-10 bg-radial from-[#F3E5AB]/40 via-transparent to-transparent blur-2xl pointer-events-none" />

          <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl text-[#778873] tracking-widest font-light uppercase leading-none mb-3 sm:mb-4">
            Ashly
          </h1>

          <div className="flex items-center justify-center gap-4 my-2 sm:my-3">
            <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="font-script text-4xl sm:text-6xl text-[#AA771C] select-none">
              &
            </span>
            <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl text-[#778873] tracking-widest font-light uppercase leading-none">
            Roshin
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 sm:mt-8 flex flex-col items-center gap-2"
        >
          <div className="font-display text-sm sm:text-base tracking-[0.4em] uppercase text-[#AA771C] font-semibold">
            Engagement Ceremony & Reception
          </div>
          <p className="font-serif-luxury text-lg sm:text-2xl text-[#778873] italic">
            Saturday, 15 August 2026
          </p>
        </motion.div>
      </div>

      {/* Countdown Timer Block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="w-full max-w-xl mx-auto mt-4 mb-8"
      >
        <div className="p-6 sm:p-8 rounded-2xl bg-linen-card embossed-card flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-sans-clean uppercase tracking-[0.2em] text-[#778873]">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>Counting Down To Forever</span>
          </div>

          {/* Time Units Grid */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-md">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit, i) => (
              <div
                key={unit.label}
                className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[#FDF6ED] border border-[#DCCFC0]/60 shadow-inner"
              >
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#AA771C]">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="font-sans-clean text-[10px] sm:text-xs tracking-wider uppercase text-[#778873]/80 mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Add To Calendar Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
            <button
              onClick={() => downloadIcsFile()}
              className="px-5 py-2.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#778873] font-sans-clean text-xs font-semibold tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#FDF6ED] transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Apple / iCal Export</span>
            </button>
            <a
              href={generateGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#778873] text-[#FDF6ED] font-sans-clean text-xs font-semibold tracking-wider uppercase hover:bg-[#5A6C56] transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#E6CA65]" />
              <span>Google Calendar</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#details"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center gap-1 text-[#778873]/80 hover:text-[#AA771C] transition-colors"
      >
        <span className="font-sans-clean text-[10px] tracking-[0.25em] uppercase">
          Explore Invitation
        </span>
        <ArrowDown className="w-4 h-4 text-[#D4AF37]" />
      </motion.a>
    </section>
  );
}
