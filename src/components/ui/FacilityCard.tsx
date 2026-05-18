"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FacilityCard({
  name,
  hours,
  href,
  imageUrl,
  accent,
}: {
  name: string;
  hours: string;
  href: string;
  imageUrl: string;
  accent: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="group relative overflow-hidden rounded-2xl">
      <Link href={href} className="block">
        <div className="relative h-[320px] w-full sm:h-[360px]">
          <motion.div whileHover={{ scale: 1.08 }} className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          <div
            className="absolute inset-0 rounded-2xl border transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="absolute inset-0 rounded-2xl border opacity-0 transition-opacity group-hover:opacity-100"
            style={{ borderColor: accent }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs tracking-wide"
              style={{ borderColor: accent, color: "rgba(245,240,232,0.85)" }}
            >
              {hours}
            </div>
            <div className="mt-3 font-display text-2xl text-(--havana-cream) sm:text-3xl">
              {name}
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm text-(--havana-gold)">
              <span className={cn("transition-colors group-hover:text-(--havana-gold-light)")}>
                Explore
              </span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
