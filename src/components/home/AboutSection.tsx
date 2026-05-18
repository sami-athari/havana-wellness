"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const IMAGE =
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80";

export function AboutSection() {
  return (
    <motion.section
      className="bg-(--havana-black)"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl text-(--havana-ivory) sm:text-4xl">
              Above the City, In Another World
            </h2>
            <div className="mt-5 h-px w-20 bg-(--havana-gold)" />
            <p className="mt-6 text-sm leading-relaxed text-(--havana-cream)/80 sm:text-base">
              Perched on the 7th floor of Merlynn Park Hotel Jakarta, Havana Wellness is
              your elevated escape from the urban rush. Swim above the skyline, restore
              your body in our spa sanctuary, train at the peak of the city, and feast
              under open skies. Four extraordinary experiences, one unforgettable floor.
            </p>
            <Link
              href="#"
              className="mt-6 inline-flex items-center gap-2 text-sm text-(--havana-gold) hover:text-(--havana-gold-light)"
            >
              Discover Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-[440px] overflow-hidden rounded-2xl border border-white/10 lg:h-[520px]">
            <Image
              src={IMAGE}
              alt="Havana Wellness"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
