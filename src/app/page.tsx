"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/HeroSection";
import { FacilitiesGrid } from "@/components/home/FacilitiesGrid";
import { AboutSection } from "@/components/home/AboutSection";
import { GallerySection } from "@/components/home/GallerySection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <HeroSection />

      {/* SECTION 2: INTRO STATS */}
      <section className="bg-(--havana-black)">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-6 border-y border-(--havana-gold)/20 py-10 lg:grid-cols-4 lg:gap-0">
            {[
              { value: "7th", label: "Floor Location" },
              { value: "4", label: "Luxury Facilities" },
              { value: "07:00", label: "Opens Daily" },
              { value: "★ 4.8", label: "Guest Rating" },
            ].map((s, idx) => (
              <div
                key={s.label}
                className="relative flex flex-col items-center justify-center py-6"
              >
                {idx > 0 ? (
                  <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-(--havana-gold)/20 lg:block" />
                ) : null}
                <div className="text-3xl font-display font-semibold text-(--havana-gold)">
                  {s.value}
                </div>
                <div className="mt-1 text-xs tracking-[0.2em] text-(--havana-cream)/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FacilitiesGrid />
      <AboutSection />
      <GallerySection />
      <CTASection />
    </motion.div>
  );
}

