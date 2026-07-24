'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Sparkles, Building, Church, Compass } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  description: string;
  highlights: string[];
  googleMapsUrl: string;
  appleMapsUrl: string;
  embedUrl: string;
}

export default function LocationExperience() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const venues: Venue[] = [
    {
      id: 'church',
      name: "St. Joseph's Church",
      type: 'Ceremony Venue',
      address: "St. Joseph's Church Road",
      city: 'Amalapuram',
      description: 'A historic and revered sanctuary surrounded by serene greenery, offering a sacred ambiance for Ashly & Roshin’s engagement ceremony.',
      highlights: [],
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=St.+Joseph's+Church+Amalapuram",
      appleMapsUrl: "https://maps.apple.com/?q=St.+Joseph's+Church+Amalapuram",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.123456789!2d76.54321!3d10.12345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDA3JzM0LjQiTiA3NsKwMzInMzUuNiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
    },
    {
      id: 'resort',
      name: 'Mangalath Resorts',
      type: 'Reception Venue',
      address: 'Riverside Road, Near Periyar',
      city: 'Malayattoor',
      description: 'An idyllic resort framed by gentle waters and lush palms, hosting the grand celebratory feast, music, and evening reception.',
      highlights: [],
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mangalath+Resorts+Malayattoor",
      appleMapsUrl: "https://maps.apple.com/?q=Mangalath+Resorts+Malayattoor",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15780.123456789!2d76.58901!3d10.18901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDExJzIwLjQiTiA3NsKwMzUnMjA.0IkE!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
    },
  ];

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="venues" className="py-24 px-4 sm:px-6 relative bg-luxury-paper overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/30 text-[#AA771C] text-xs font-sans-clean tracking-[0.25em] uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Destinations of Joy</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#778873] tracking-wider uppercase font-light">
            Venue Locations
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#778873]/80 italic">
            Navigational details and map links for our honored guests
          </p>
        </motion.div>

        {/* Venue Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {venues.map((venue, idx) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="rounded-3xl bg-linen-card embossed-card border border-[#DCCFC0] overflow-hidden flex flex-col justify-between"
            >
              {/* Header Info */}
              <div className="p-8 sm:p-10 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#FAF3E0] text-[#AA771C] font-display text-xs font-bold tracking-widest uppercase">
                    {venue.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-sans-clean text-[#778873]">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{venue.city}</span>
                  </div>
                </div>

                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#778873] font-normal mb-3">
                  {venue.name}
                </h3>

                <p className="font-serif-luxury text-sm text-[#778873]/80 italic mb-6">
                  {venue.description}
                </p>

                {/* Venue Highlights Chips */}
                {venue.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {venue.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-lg bg-[#FDF6ED] border border-[#DCCFC0]/60 text-[11px] font-sans-clean text-[#778873]"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Address Box */}
                <div className="p-4 rounded-xl bg-[#FDF6ED] border border-[#DCCFC0] flex items-center justify-between gap-3">
                  <div className="text-xs font-sans-clean text-[#778873]">
                    <span className="font-bold block text-[#778873]">{venue.name}</span>
                    <span>{venue.address}, {venue.city}</span>
                  </div>
                  <button
                    onClick={() => handleCopyAddress(venue.id, `${venue.name}, ${venue.address}, ${venue.city}`)}
                    className="p-2 rounded-lg bg-[#FAF3E0] hover:bg-[#D4AF37] hover:text-[#FDF6ED] text-[#AA771C] transition-all shrink-0"
                    title="Copy Address"
                  >
                    {copiedId === venue.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Map Preview Graphic Block */}
              <div className="relative h-48 bg-[#FAF3E0] border-t border-b border-[#DCCFC0] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-80 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Map Pins Visual */}
                <div className="relative z-10 flex flex-col items-center gap-2 p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#778873] text-[#FDF6ED] flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                    <MapPin className="w-6 h-6 text-[#E6CA65]" />
                  </div>
                  <span className="font-serif-luxury text-sm font-bold text-[#778873]">
                    {venue.name} Map Coordinates
                  </span>
                  <span className="text-[11px] font-sans-clean text-[#778873]/70">
                    Tap below for live step-by-step GPS navigation
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-[#FAF3E0]/50 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#778873] text-[#FDF6ED] font-sans-clean text-xs font-semibold tracking-wider uppercase hover:bg-[#5A6C56] transition-all duration-300 flex items-center gap-2 shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E6CA65]" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={venue.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#FDF6ED] border border-[#D4AF37]/50 text-[#AA771C] font-sans-clean text-xs font-semibold tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#FDF6ED] transition-all duration-300 flex items-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Apple Maps</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
