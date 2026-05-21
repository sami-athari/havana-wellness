"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FacilityGallery({ images }: { images: string[] }) {
  const [a, b, c] = images;

  return (
    <div>
      <div className="grid h-[500px] grid-cols-2 grid-rows-2 gap-3">
        <div className="relative row-span-2 overflow-hidden rounded-2xl">
          <motion.div whileHover={{ scale: 1.05 }} className="absolute inset-0">
            <Image src={a} alt="Gallery" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
          </motion.div>
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div whileHover={{ scale: 1.05 }} className="absolute inset-0">
            <Image src={b} alt="Gallery" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
          </motion.div>
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div whileHover={{ scale: 1.05 }} className="absolute inset-0">
            <Image src={c} alt="Gallery" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
          </motion.div>
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </div>
  );
}
