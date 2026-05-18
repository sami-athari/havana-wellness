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
    <div className="relative h-[70vh] overflow-hidden">
      <Image src={imageUrl} alt={name} fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-black/55" />

      <motion.div
        className="relative z-10 flex h-full items-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
          <div className="inline-flex rounded-full border border-(--havana-gold)/40 bg-black/20 px-4 py-2 text-xs tracking-[0.25em] text-(--havana-gold)">
            7th Floor · Merlynn Park Hotel
          </div>
          <h1 className="mt-5 font-display text-4xl text-(--havana-ivory) sm:text-6xl">
            {name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-(--havana-cream)/85 sm:text-base">
            {tagline}
          </p>

          <Button
            asChild
            className="mt-7 h-12 px-8 text-black"
            style={{ backgroundColor: accent }}
          >
            <Link href={`/booking?facility=${slug}`}>Book This Facility</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
