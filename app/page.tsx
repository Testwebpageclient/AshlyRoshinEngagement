'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ThreeKeepsakeBox from '@/components/ThreeKeepsakeBox';
import PetalParticleCanvas from '@/components/PetalParticleCanvas';
import LuxuryHeader from '@/components/LuxuryHeader';
import HeroSection from '@/components/HeroSection';
import EventCardsSection from '@/components/EventCardsSection';
import TimelineSection from '@/components/TimelineSection';
import LocationExperience from '@/components/LocationExperience';
import BlessingsWall from '@/components/BlessingsWall';
import LuxuryFooter from '@/components/LuxuryFooter';
import RsvpModal from '@/components/RsvpModal';
import ShareModal from '@/components/ShareModal';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDF6ED] text-[#778873] relative overflow-x-hidden font-sans-clean">
      {!isOpened ? (
        /* Opening Experience: Floating 3D Handcrafted Keepsake Box */
        <ThreeKeepsakeBox onOpened={() => setIsOpened(true)} />
      ) : (
        /* Unfolded Luxury Digital Engagement Invitation Experience */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Petal & Gold Particle Engine */}
          <PetalParticleCanvas />

          {/* Floating Navigation Bar */}
          <LuxuryHeader
            onOpenRsvp={() => setIsRsvpOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
          />

          {/* Hero Section */}
          <HeroSection />

          {/* Event Details Section */}
          <EventCardsSection />

          {/* Schedule Timeline Section */}
          <TimelineSection />

          {/* Venue & Maps Section */}
          <LocationExperience />

          {/* Blessings Wall */}
          <BlessingsWall />

          {/* Luxury Footer */}
          <LuxuryFooter onReopenBox={() => setIsOpened(false)} />

          {/* RSVP Modal */}
          <RsvpModal
            isOpen={isRsvpOpen}
            onClose={() => setIsRsvpOpen(false)}
          />

          {/* Share Modal */}
          <ShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
          />
        </motion.div>
      )}
    </main>
  );
}
