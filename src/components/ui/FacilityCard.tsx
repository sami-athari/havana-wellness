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
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="group relative overflow-hidden rounded-3xl">
      <Link href={href} className="block">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
          <motion.div whileHover={{ scale: 1.08 }} className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7)_0%,transparent_60%)]" />

          <div className="absolute right-4 top-4 h-3 w-3 rounded-full" style={{ backgroundColor: accent }} />

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="inline-flex items-center rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[12px] text-white backdrop-blur-sm">
              {hours}
            </div>
            <div className="mt-3 font-display text-[32px] font-semibold text-white">
              {name}
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm text-white/80">
              <span className={cn("rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[12px] transition-colors", "group-hover:bg-white/30")}>
                Explore
              </span>
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
