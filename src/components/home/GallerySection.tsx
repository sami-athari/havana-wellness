"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "https://merlynnparkhotel.com/wp-content/uploads/2024/03/mph_pool1.jpg",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1501117716987-c8e1ecb21003?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1542317854-2d7b0901c3b6?auto=format&fit=crop&w=1400&q=80",
];

export function GallerySection() {
  return (
    <motion.section
      className="bg-(--havana-black)"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div>
          <div className="text-xs tracking-[0.3em] text-(--havana-gold)">GALLERY</div>
          <div className="mt-3 font-display text-3xl text-(--havana-cream) sm:text-4xl">
            A glimpse of the 7th floor
          </div>
        </div>

        <div className="mt-8 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch]">
          <div className="flex min-w-max gap-4">
            {images.map((src, i) => (
              <div
                key={src + i}
                className="relative h-[360px] w-[240px] overflow-hidden rounded-2xl border border-white/10"
              >
                <motion.div whileHover={{ scale: 1.06 }} className="absolute inset-0">
                  <Image src={src} alt="Gallery" fill className="object-cover" sizes="240px" />
                </motion.div>
                <div className="absolute inset-0 bg-black/15" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
