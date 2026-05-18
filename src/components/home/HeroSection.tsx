"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

const POOL_IMAGE =
  "https://merlynnparkhotel.com/wp-content/uploads/2024/03/mph_pool1.jpg";

export function HeroSection() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative h-[100vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={POOL_IMAGE}
          alt="Havana Swimming Pool"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center sm:px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-3xl"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="inline-flex rounded-full border border-(--havana-gold)/40 bg-black/20 px-4 py-2 text-xs tracking-[0.25em] text-(--havana-gold)"
          >
            MERLYNN PARK HOTEL · 7TH FLOOR
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 font-display text-4xl leading-[0.95] text-(--havana-cream) sm:text-6xl lg:text-8xl"
          >
            HAVANA{" "}
            <span className="text-(--havana-gold)">SWIMMING POOL</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="mt-5 text-sm text-(--havana-cream)/85 sm:text-base"
          >
            Where Jakarta&apos;s skyline meets crystal blue water
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Button
              asChild
              className="h-12 bg-(--havana-gold) px-8 text-black hover:bg-(--havana-gold-light)"
            >
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 border-(--havana-cream)/30 bg-transparent px-8 text-(--havana-cream) hover:bg-white/5"
            >
              <Link href="#facilities">Explore Facilities</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--havana-gold)/40 bg-black/20 text-(--havana-gold)"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </div>
    </section>
  );
}
