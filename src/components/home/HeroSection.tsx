"use client";



import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as React from "react";

const POOL_IMAGE =
  "https://merlynnparkhotel.com/wp-content/uploads/2024/03/mph_pool1.jpg";

export function HeroSection() {
  return (
    <section className="bg-white pt-0">
      <div className="relative mx-3 overflow-hidden rounded-2xl lg:mx-8 lg:rounded-3xl" style={{ height: "55vw", minHeight: 280, maxHeight: "70vh" }}>
        <div className="absolute inset-0 md:hidden">
          <Image src={POOL_IMAGE} alt="Havana Swimming Pool" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image src={POOL_IMAGE} alt="Havana Swimming Pool" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.2)_60%,transparent_100%)]" />

        <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[11px] tracking-[0.15em] text-white backdrop-blur-sm">
          MERLYNN PARK HOTEL · 7TH FLOOR
        </div>

        <div className="absolute left-5 top-20 max-w-[620px] px-0 md:left-10 md:top-24 lg:left-12 lg:top-28">
          <div className="flex flex-col gap-1 md:gap-2">
            {[
              { text: "HAVANA", color: "text-white" },
              { text: "SWIMMING", color: "text-gold" },
              { text: "POOL", color: "text-gold" },
            ].map((line, index) => (
              <motion.h1
                key={line.text}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.7 }}
                className={`font-display text-[36px] font-bold leading-none md:text-[56px] lg:text-[80px] ${line.color}`}
              >
                {line.text}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-6 max-w-[220px] text-[16px] leading-relaxed text-white/80"
          >
            Where Jakarta&apos;s skyline meets crystal blue water
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/booking" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-7 py-3 font-medium text-white transition-colors hover:bg-gold-hover active:bg-gold-hover">
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#facilities" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/50 bg-transparent px-7 py-3 font-medium text-white transition-colors hover:bg-white/10 active:bg-white/10">
              Explore Facilities <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-6 right-6 hidden max-w-[220px] rounded-2xl bg-white p-5 shadow-lg lg:block">
          <div className="flex justify-end">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-white">→</div>
          </div>
          <p className="mt-3 font-display text-[15px] italic text-[#111111]">
            Relax above the city in our rooftop pool with a breathtaking panoramic view.
          </p>
          <div className="mt-4 flex items-end justify-between">
            <span className="text-[9px] tracking-widest text-[#999999]">MERLYNN PARK HOTEL</span>
            <span className="text-[9px] tracking-widest text-[#999999]">01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
