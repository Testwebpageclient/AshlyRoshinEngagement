'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Sparkles, MessageCircle, User } from 'lucide-react';

interface Blessing {
  id: string;
  name: string;
  message: string;
  date: string;
}

const initialBlessings: Blessing[] = [
  {
    id: '1',
    name: 'Uncle George & Family',
    message: 'May your union be blessed with endless laughter, boundless peace, and everlasting grace. So thrilled for you both!',
    date: 'July 24, 2026',
  },
  {
    id: '2',
    name: 'Anjali & Vivek',
    message: 'Wishing Ashly and Roshin a lifetime of love and beautiful adventures together. Looking forward to the celebration!',
    date: 'July 24, 2026',
  },
  {
    id: '3',
    name: 'Rev. Fr. Thomas',
    message: 'May God abundantly bless your engagement and guide your steps towards a joyful and holy journey together.',
    date: 'July 23, 2026',
  },
];

export default function BlessingsWall() {
  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ashly_roshin_blessings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return initialBlessings;
  });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newBlessing: Blessing = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };

      const updated = [newBlessing, ...blessings];
      setBlessings(updated);
      localStorage.setItem('ashly_roshin_blessings', JSON.stringify(updated));

      setName('');
      setMessage('');
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }, 600);
  };

  return (
    <section id="blessings" className="py-24 px-4 sm:px-6 relative bg-luxury-paper overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/30 text-[#AA771C] text-xs font-sans-clean tracking-[0.25em] uppercase mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
            <span>Showers Of Love</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#778873] tracking-wider uppercase font-light">
            Blessings & Wishes
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#778873]/80 italic">
            Leave a loving note for Ashly & Roshin as they begin their forever
          </p>
        </motion.div>

        {/* Input Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 sm:p-10 rounded-3xl bg-linen-card embossed-card border border-[#DCCFC0] mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-sans-clean text-xs font-semibold uppercase tracking-wider text-[#778873] mb-2">
                Your Name / Family
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Uncle Mathew & Family"
                  className="w-full px-4 py-3 rounded-xl bg-[#FDF6ED] border border-[#DCCFC0] text-[#778873] placeholder-[#778873]/50 focus:outline-none focus:border-[#D4AF37] text-sm font-sans-clean transition-all"
                />
                <User className="absolute right-4 top-3.5 w-4 h-4 text-[#AA771C]" />
              </div>
            </div>

            <div>
              <label className="block font-sans-clean text-xs font-semibold uppercase tracking-wider text-[#778873] mb-2">
                Your Heartfelt Message
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your blessing, prayer, or warm wishes..."
                className="w-full px-4 py-3 rounded-xl bg-[#FDF6ED] border border-[#DCCFC0] text-[#778873] placeholder-[#778873]/50 focus:outline-none focus:border-[#D4AF37] text-sm font-serif-luxury text-base transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <AnimatePresence>
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-sans-clean font-semibold text-green-700 flex items-center gap-1"
                  >
                    ✦ Thank you! Your blessing has been posted on the wall.
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto px-6 py-3 rounded-full bg-[#778873] text-[#FDF6ED] font-sans-clean text-xs font-semibold tracking-wider uppercase hover:bg-[#5A6C56] transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#E6CA65]" />
                <span>{isSubmitting ? 'Posting...' : 'Post Blessing'}</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Wishes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {blessings.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-linen-card embossed-card border border-[#DCCFC0] flex flex-col justify-between"
              >
                <p className="font-serif-luxury text-base sm:text-lg text-[#778873] italic mb-4">
                  &ldquo;{b.message}&rdquo;
                </p>

                <div className="flex items-center justify-between border-t border-[#DCCFC0]/40 pt-3">
                  <span className="font-sans-clean text-xs font-bold text-[#AA771C]">
                    {b.name}
                  </span>
                  <span className="font-sans-clean text-[11px] text-[#778873]/70">
                    {b.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
