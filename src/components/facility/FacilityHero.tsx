"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FacilityHero({
  name,
  tagline,
  imageUrl,
  accent,
  slug,
}: {
  name: string;
  tagline: string;
  imageUrl: string;
  accent: string;
  slug: string;
}) {
  return (
    <div className="mx-4 overflow-hidden rounded-3xl lg:mx-8">
      <div className="relative h-[60vh] overflow-hidden rounded-3xl">
        <Image src={imageUrl} alt={name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.2)_60%,transparent_100%)]" />

        <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[11px] tracking-[0.15em] text-white backdrop-blur-sm">
          MERLYNN PARK HOTEL · 7TH FLOOR
        </div>

        <motion.div
          className="relative z-10 flex h-full items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto w-full max-w-7xl px-5 pb-10 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-[36px] text-white md:text-[56px] lg:text-[80px]">
                {name}
              </h1>
              <p className="mt-4 max-w-[320px] text-[16px] text-white/80">
                {tagline}
              </p>
            </div>

            <div className="mt-8 hidden w-fit rounded-3xl bg-white p-5 shadow-lg lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white">→</div>
                <div>
                  <div className="text-[10px] tracking-widest text-[#999999]">QUICK RESERVE</div>
                  <div className="font-display text-[15px] text-[#111111]">Book This Facility</div>
                </div>
              </div>
              <Button asChild className="mt-4 h-11 w-full rounded-full bg-gold text-white hover:bg-gold-hover">
                <Link href={`/booking?facility=${slug}`}>Book This Facility</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
