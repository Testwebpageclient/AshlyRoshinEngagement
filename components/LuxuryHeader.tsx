'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Share2, Calendar, Menu, X, Heart, Sparkles } from 'lucide-react';
import { toggleAmbientMusic } from '@/lib/audio';

interface HeaderProps {
  onOpenRsvp: () => void;
  onOpenShare: () => void;
}

export default function LuxuryHeader({ onOpenRsvp, onOpenShare }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMusicToggle = () => {
    const playing = toggleAmbientMusic();
    setIsMusicPlaying(playing);
  };

  const navLinks = [
    { name: 'Ceremony', href: '#details' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Venues', href: '#venues' },
    { name: 'Dress Code', href: '#dresscode' },
    { name: 'Blessings', href: '#blessings' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FDF6ED]/90 backdrop-blur-md py-3 shadow-sm border-b border-[#DCCFC0]/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Royal Monogram Emblem */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA771C] flex items-center justify-center p-0.5 shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-[#FDF6ED] flex items-center justify-center">
              <span className="font-serif-luxury text-sm font-bold text-[#AA771C] tracking-tighter">
                A&R
              </span>
            </div>
          </div>
          <span className="font-serif-luxury text-lg tracking-wider text-[#778873] hidden sm:inline-block font-semibold">
            Ashly & Roshin
          </span>
        </a>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans-clean text-xs font-medium tracking-[0.2em] uppercase text-[#778873] hover:text-[#AA771C] transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Actions (Music, Share, RSVP) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Music Equalizer Button */}
          <button
            onClick={handleMusicToggle}
            aria-label="Toggle Ambient Music"
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-[#FDF6ED] border border-[#DCCFC0] text-[#778873] hover:border-[#D4AF37] transition-all duration-300 flex items-center gap-2 text-xs shadow-sm"
            title={isMusicPlaying ? 'Mute Music' : 'Play Ambient Music'}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                <span className="hidden sm:inline font-sans-clean text-[11px] tracking-wider uppercase">
                  Sound On
                </span>
                {/* Equalizer Bars */}
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-[#D4AF37] animate-bounce" style={{ animationDuration: '0.6s' }} />
                  <span className="w-0.5 h-2/3 bg-[#D4AF37] animate-bounce" style={{ animationDuration: '0.9s' }} />
                  <span className="w-0.5 h-full bg-[#D4AF37] animate-bounce" style={{ animationDuration: '0.7s' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#778873]" />
                <span className="hidden sm:inline font-sans-clean text-[11px] tracking-wider uppercase">
                  Muted
                </span>
              </>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            aria-label="Share Invitation"
            className="p-2 rounded-full bg-[#FDF6ED] border border-[#DCCFC0] text-[#778873] hover:border-[#D4AF37] hover:text-[#AA771C] transition-all duration-300 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Luxury RSVP CTA */}
          <button
            onClick={onOpenRsvp}
            className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-[#778873] to-[#5A6C56] text-[#FDF6ED] font-sans-clean text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
            <span>RSVP</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full bg-[#FDF6ED] border border-[#DCCFC0] text-[#778873] md:hidden"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FDF6ED] border-b border-[#DCCFC0] px-6 py-6 shadow-xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif-luxury text-xl text-[#778873] hover:text-[#AA771C] py-2 border-b border-[#DCCFC0]/30 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-sans-clean tracking-widest uppercase text-[#A1BC98]">
                    Explore →
                  </span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
