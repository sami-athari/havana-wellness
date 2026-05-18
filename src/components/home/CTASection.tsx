"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <motion.section
      className="relative overflow-hidden bg-(--havana-black)"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full gold-gradient blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full gold-gradient blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-4xl text-(--havana-ivory) sm:text-5xl">
          READY TO ESCAPE?
        </h2>
        <p className="mt-4 text-sm text-(--havana-cream)/80 sm:text-base">
          Reserve your spot at Havana Wellness today
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            asChild
            className="h-12 bg-(--havana-gold) px-10 text-black hover:bg-(--havana-gold-light)"
          >
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-(--havana-cream)/70">
          Questions? WhatsApp us:{" "}
          <a
            className="text-(--havana-gold) hover:text-(--havana-gold-light)"
            href="https://wa.me/6281282175856"
            target="_blank"
            rel="noreferrer"
          >
            +62 812-8217-5856
          </a>
        </p>
      </div>
    </motion.section>
  );
}
