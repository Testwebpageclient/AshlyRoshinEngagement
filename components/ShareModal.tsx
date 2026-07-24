'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Share2, MessageCircle, Sparkles, QrCode } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://ashly-roshin-engagement.com';
  const shareText = `You are cordially invited to celebrate the Engagement Ceremony of Ashly & Roshin on August 15, 2026. Explore the digital invitation: ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ashly & Roshin Engagement Invitation',
          text: 'You are cordially invited to celebrate the Engagement of Ashly & Roshin.',
          url: shareUrl,
        });
      } catch (e) {}
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-md rounded-3xl bg-[#FDF6ED] border border-[#D4AF37]/60 shadow-2xl p-6 sm:p-8 text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#FAF3E0] text-[#778873] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/40 text-[#AA771C] flex items-center justify-center mx-auto mb-4">
          <Share2 className="w-6 h-6" />
        </div>

        <h3 className="font-serif-luxury text-2xl text-[#778873] font-semibold mb-1">
          Share Invitation
        </h3>
        <p className="font-serif-luxury text-sm text-[#778873]/80 italic mb-6">
          Pass along the joyous news to family & friends
        </p>

        {/* Copy Link Input */}
        <div className="p-2 rounded-xl bg-[#FAF3E0] border border-[#DCCFC0] flex items-center gap-2 mb-6">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent px-2 text-xs font-sans-clean text-[#778873] focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg bg-[#778873] text-[#FDF6ED] text-xs font-sans-clean font-bold uppercase shrink-0 flex items-center gap-1 hover:bg-[#5A6C56] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsApp}
            className="py-3 px-4 rounded-xl bg-[#25D366] text-white font-sans-clean text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-sm hover:brightness-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="py-3 px-4 rounded-xl bg-[#D4AF37] text-white font-sans-clean text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-sm hover:brightness-105"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
