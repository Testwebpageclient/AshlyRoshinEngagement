'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Church, GlassWater, Music } from 'lucide-react';

interface TimelineStep {
  time: string;
  title: string;
  location: string;
  description: string;
  icon: React.ReactNode;
}

export default function TimelineSection() {
  const steps: TimelineStep[] = [
    {
      time: '4:00 PM',
      title: 'Engagement Ceremony',
      location: "St. Joseph's Church, Amalapuram",
      description: 'The holy prayer, exchange of intentions, and formal engagement blessing.',
      icon: <Church className="w-5 h-5 text-[#AA771C]" />,
    },
    {
      time: '6:00 PM',
      title: 'Grand Evening Reception & Feast',
      location: 'Bosco Parish Hall, Vyakulamatha Church Kaippattor',
      description: 'A warm welcome at the parish hall with traditional celebratory feast, music, and toasts.',
      icon: <GlassWater className="w-5 h-5 text-[#AA771C]" />,
    },
  ];

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 relative bg-luxury-paper overflow-hidden">
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Timeline Of Celebration</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#778873] tracking-wider uppercase font-light">
            Schedule of the Day
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-0">
          {/* Animated Botanical Vine Connecting Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#A1BC98] to-[#D4AF37] transform -translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Floral Node Center Badge */}
                  <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 top-0 z-10 w-12 h-12 rounded-full bg-[#FDF6ED] border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center">
                    {step.icon}
                  </div>

                  {/* Card Content Block */}
                  <div
                    className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                      isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'
                    }`}
                  >
                    <div className="p-6 rounded-2xl bg-linen-card embossed-card border border-[#DCCFC0] hover:border-[#D4AF37]/50 transition-all duration-300">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#FAF3E0] text-[#AA771C] font-display text-xs font-bold tracking-wider mb-2">
                        {step.time}
                      </span>
                      <h3 className="font-serif-luxury text-2xl text-[#778873] font-semibold">
                        {step.title}
                      </h3>
                      <p className="font-sans-clean text-xs font-medium text-[#AA771C] mb-2">
                        📍 {step.location}
                      </p>
                      <p className="font-serif-luxury text-sm text-[#778873]/80 italic">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
