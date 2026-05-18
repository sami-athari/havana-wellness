"use client";

import { motion } from "framer-motion";
import { FacilityHero } from "@/components/facility/FacilityHero";
import { FacilityInfo } from "@/components/facility/FacilityInfo";
import { FacilityGallery } from "@/components/facility/FacilityGallery";
import { FacilityCard } from "@/components/ui/FacilityCard";
import { useFacility } from "@/hooks/useFacilities";

const slug = "pool";
const accent = "#2DD4BF";
const heroImage = "https://merlynnparkhotel.com/wp-content/uploads/2024/03/mph_pool1.jpg";
const gallery = [
  heroImage,
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&w=1600&q=80",
];

export default function PoolPage() {
  const { facility } = useFacility(slug);
  const f = facility ?? {
    id: "",
    slug,
    name: "Havana Swimming Pool",
    tagline: "Sky High Luxury Above Jakarta",
    long_description:
      "Escape the city bustle and immerse yourself in our crown jewel — the Havana Swimming Pool. Perched on the 7th floor of Merlynn Park Hotel, this stunning infinity-edge pool offers breathtaking panoramic views of Jakarta's skyline.",
    opening_hours: "07:00 AM – 08:00 PM",
    price_per_session: 150000,
    max_capacity: 50,
    features: [
      "Infinity Edge Design",
      "Panoramic City View",
      "Lush Tropical Surroundings",
      "Poolside Lounge Chairs",
    ],
  };

  const more = [
    {
      slug: "spa",
      name: "Havana Spa & Wellness",
      hours: "09:00 – 21:00",
      imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
      accent: "#F43F5E",
    },
    {
      slug: "gym",
      name: "Havana Fitness Center",
      hours: "06:00 – 22:00",
      imageUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80",
      accent: "#F97316",
    },
    {
      slug: "bbq",
      name: "Havana BBQ Terrace",
      hours: "16:00 – 23:00",
      imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
      accent: "#D97706",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <FacilityHero name={f.name} tagline={f.tagline ?? ""} imageUrl={heroImage} accent={accent} slug={slug} />

      <section className="bg-(--havana-black)">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <FacilityInfo facility={f as any} accent={accent} />
        </div>
      </section>

      <section className="bg-(--havana-black)">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl text-(--havana-ivory)">Gallery</h2>
          <div className="mt-6">
            <FacilityGallery images={gallery} />
          </div>
        </div>
      </section>

      <section className="bg-(--havana-black)">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl text-(--havana-ivory)">Explore More</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {more.map((m) => (
              <FacilityCard key={m.slug} name={m.name} hours={m.hours} href={`/${m.slug}`} imageUrl={m.imageUrl} accent={m.accent} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
