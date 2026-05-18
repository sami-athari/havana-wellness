"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FacilityGallery({ images }: { images: string[] }) {
  const [a, b, c] = images;

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/10 lg:col-span-2 lg:h-[420px]">
          <motion.div whileHover={{ scale: 1.05 }} className="absolute inset-0">
            <Image src={a} alt="Gallery" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
          </motion.div>
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="grid gap-4">
          {[b, c].map((src) => (
            <div key={src} className="relative h-[200px] overflow-hidden rounded-2xl border border-white/10">
              <motion.div whileHover={{ scale: 1.05 }} className="absolute inset-0">
                <Image src={src} alt="Gallery" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </motion.div>
              <div className="absolute inset-0 bg-black/15" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          className="h-12 border-white/15 bg-transparent px-10 text-(--havana-cream) hover:bg-white/5"
        >
          View All Photos
        </Button>
      </div>
    </div>
  );
}
