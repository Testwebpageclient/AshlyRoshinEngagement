'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Sparkles, Calendar, Download, Heart, Users, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadIcsFile } from '@/lib/calendar';
import { playSealChime } from '@/lib/audio';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  const [guestName, setGuestName] = useState('');
  const [contact, setContact] = useState('');
  const [attendance, setAttendance] = useState('both');
  const [guestCount, setGuestCount] = useState(2);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Save RSVP to local state / storage
      const rsvpData = {
        guestName,
        contact,
        attendance,
        guestCount,
        notes,
        timestamp: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem('ashly_roshin_rsvps') || '[]');
      localStorage.setItem('ashly_roshin_rsvps', JSON.stringify([rsvpData, ...existing]));

      playSealChime();

      // Launch golden confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF3E0', '#A1BC98', '#E6CA65'],
      });

      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#FDF6ED] border border-[#D4AF37]/60 shadow-2xl overflow-hidden my-8"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#778873] via-[#5A6C56] to-[#778873] px-6 py-5 text-[#FDF6ED] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E6CA65]" />
            <span className="font-display text-xs font-bold tracking-[0.25em] uppercase">
              Royal RSVP Confirmation
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-[#FDF6ED]" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {!isConfirmed ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#778873]">
                  Kindly Respond
                </h3>
                <p className="font-serif-luxury text-sm text-[#778873]/80 italic">
                  Please respond by 5th August 2026 to assist our arrangements
                </p>
              </div>

              {/* Guest Name Input */}
              <div>
                <label className="block font-sans-clean text-xs font-semibold uppercase tracking-wider text-[#778873] mb-1.5">
                  Full Name / Guest Name(s) *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Mr. & Mrs. Philipose"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF3E0] border border-[#DCCFC0] text-[#778873] placeholder-[#778873]/50 focus:outline-none focus:border-[#D4AF37] text-sm font-sans-clean"
                />
              </div>

              {/* Phone / Email Input */}
              <div>
                <label className="block font-sans-clean text-xs font-semibold uppercase tracking-wider text-[#778873] mb-1.5">
                  Mobile Number / Email
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF3E0] border border-[#DCCFC0] text-[#778873] placeholder-[#778873]/50 focus:outline-none focus:border-[#D4AF37] text-sm font-sans-clean"
                />
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block font-sans-clean text-xs font-semibold uppercase tracking-wider text-[#778873] mb-2">
                  Will You Be Attending? *
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'both', label: 'Joyfully Attending Both Ceremony & Reception' },
                    { id: 'ceremony', label: 'Attending Ceremony Only (St. Joseph Church)' },
                    { id: 'reception', label: 'Attending Reception Only (Mangalath Resorts)' },
                    { id: 'declined', label: 'Regretfully Unable To Attend' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs font-sans-clean transition-all ${
                        attendance === opt.id
                          ? 'bg-[#FAF3E0] border-[#D4AF37] text-[#AA771C] font-semibold'
                          : 'bg-[#FDF6ED] border-[#DCCFC0] text-[#778873]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={opt.id}
                        checked={attendance === opt.id}
                        onChange={(e) => setAttendance(e.target.value)}
                        className="accent-[#D4AF37]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guest Count */}
              {attendance !== 'declined' && (
                <div>
                  <label className="block font-sans-clean text-xs font-semibold uppercase tracking-wider text-[#778873] mb-1.5">
                    Number of Guests Attending
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF3E0] border border-[#DCCFC0] text-[#778873] text-sm font-sans-clean focus:outline-none focus:border-[#D4AF37]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Special Wishes or Dietary */}
              <div>
                <label className="block font-sans-clean text-xs font-semibold uppercase tracking-wider text-[#778873] mb-1.5">
                  Blessing Note or Special Dietary Requirements
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional note for the couple..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF3E0] border border-[#DCCFC0] text-[#778873] placeholder-[#778873]/50 focus:outline-none focus:border-[#D4AF37] text-sm font-sans-clean resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#AA771C] to-[#D4AF37] text-[#FDF6ED] font-sans-clean text-xs font-bold tracking-[0.2em] uppercase shadow-lg hover:brightness-110 transition-all duration-300"
              >
                {isSubmitting ? 'Confirming Royal RSVP...' : 'Submit RSVP Confirmation'}
              </button>
            </form>
          ) : (
            /* Confirmation View */
            <div className="flex flex-col items-center text-center py-6 space-y-5">
              {/* Gold Wax Seal Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className="w-20 h-20 rounded-full gold-wax-seal flex items-center justify-center text-[#FDF6ED] shadow-xl"
              >
                <Check className="w-10 h-10 stroke-[3]" />
              </motion.div>

              <h3 className="font-serif-luxury text-3xl text-[#778873] font-semibold">
                RSVP Confirmed
              </h3>

              <p className="font-serif-luxury text-base text-[#778873]/80 italic max-w-sm">
                Thank you, <span className="font-bold text-[#AA771C]">{guestName}</span>! Your presence will add immeasurable warmth to our special day.
              </p>

              <div className="w-full p-4 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/40 text-xs font-sans-clean text-[#778873] space-y-1">
                <p><strong>Status:</strong> {attendance === 'declined' ? 'Regretfully Declined' : 'Attending'}</p>
                {attendance !== 'declined' && <p><strong>Guests Reserved:</strong> {guestCount}</p>}
                <p><strong>Date:</strong> 15th August 2026</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                <button
                  onClick={() => downloadIcsFile()}
                  className="flex-1 py-3 rounded-full bg-[#778873] text-[#FDF6ED] font-sans-clean text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#E6CA65]" />
                  <span>Add To Calendar</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-full bg-[#FAF3E0] border border-[#DCCFC0] text-[#778873] font-sans-clean text-xs font-semibold tracking-wider uppercase"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
