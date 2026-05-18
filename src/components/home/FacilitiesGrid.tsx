"use client";

import { motion } from "framer-motion";
import { FacilityCard } from "@/components/ui/FacilityCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const facilities = [
  {
    slug: "pool",
    name: "Havana Swimming Pool",
    hours: "07:00 – 20:00",
    imageUrl: "https://merlynnparkhotel.com/wp-content/uploads/2024/03/mph_pool1.jpg",
    accent: "#2DD4BF",
  },
  {
    slug: "spa",
    name: "Havana Spa & Wellness",
    hours: "09:00 – 21:00",
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
    accent: "#F43F5E",
  },
  {
    slug: "gym",
    name: "Havana Fitness Center",
    hours: "06:00 – 22:00",
    imageUrl:
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80",
    accent: "#F97316",
  },
  {
    slug: "bbq",
    name: "Havana BBQ Terrace",
    hours: "16:00 – 23:00",
    imageUrl:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
    accent: "#D97706",
  },
];

export function FacilitiesGrid() {
  return (
    <motion.section
      id="facilities"
      className="bg-(--havana-black)"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="OUR FACILITIES" title="Your 7th Floor Sanctuary" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {facilities.map((f) => (
            <FacilityCard
              key={f.slug}
              name={f.name}
              hours={f.hours}
              href={`/${f.slug}`}
              imageUrl={f.imageUrl}
              accent={f.accent}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
