"use client";

import { motion } from "framer-motion";
import { ArrowRight, Coffee, Star, Waves, Wine } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { FacilitiesGrid } from "@/components/home/FacilitiesGrid";

function PromiseRow() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-10 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <div className="inline-flex w-fit rounded-full bg-[#111111] px-4 py-2 text-[10px] tracking-widest text-white">
            OUR PROMISE
          </div>
          <h2 className="mt-6 max-w-[280px] font-display text-[36px] leading-tight text-[#111111] lg:text-[44px]">
            Wellness, elevated for your everyday
          </h2>
          <button className="mt-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#111111] text-[#111111] transition-colors hover:bg-[#111111] hover:text-white active:bg-[#111111] active:text-white">
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-8 flex items-center gap-3 text-sm text-[#555555]">
            <div className="flex items-center gap-1 text-gold">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold text-[#111111]">4.9</span>
            </div>
            <span>Google Reviews</span>
          </div>

          <div className="mt-4 flex items-center">
            <div className="flex -space-x-2">
              {['A', 'M', 'P', 'J'].map((initial, index) => (
                <div
                  key={initial}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white"
                  style={{ backgroundColor: ["#C9A84C", "#0EA5E9", "#F43F5E", "#F97316"][index] }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <span className="ml-4 text-[11px] tracking-widest text-[#999999]">+120</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[380px] overflow-hidden rounded-3xl bg-[#F2F0EC] lg:min-h-[520px]"
        >
          <img
            src="https://merlynnparkhotel.com/wp-content/uploads/2024/03/mph_pool1.jpg"
            alt="Crystal Blue Water"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div>
                <div className="font-display text-[14px] font-semibold text-[#111111]">Crystal Blue Water</div>
                <div className="text-[12px] text-[#999999]">Always Clean &amp; Fresh</div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white">↗</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between"
        >
          <div>
            <div className="font-display text-[72px] font-light leading-none text-[#111111]">81%</div>
            <div className="mt-2 text-[14px] text-[#555555]">Guest satisfaction</div>
            <div className="text-[14px] text-[#555555]">for our pool experience</div>
          </div>

          <div className="mt-8 border-t border-[#E5E2DC] pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: Waves, label: "INFINITY POOL" },
                { icon: Coffee, label: "POOL LOUNGE" },
                { icon: Wine, label: "POOL BAR" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <Icon className="h-5 w-5 text-[#111111]" />
                  <div className="text-[11px] tracking-widest text-[#111111]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white text-[#111111]">
      <HeroSection />
      <PromiseRow />
      <FacilitiesGrid />
    </motion.div>
  );
}

