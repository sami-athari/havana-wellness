"use client";

import { motion } from "framer-motion";
import { FacilityHero } from "@/components/facility/FacilityHero";
import { FacilityInfo } from "@/components/facility/FacilityInfo";
import { FacilityGallery } from "@/components/facility/FacilityGallery";
import { FacilityCard } from "@/components/ui/FacilityCard";
import { useFacility } from "@/hooks/useFacilities";

const slug = "spa";
const accent = "#F43F5E";
const heroImage = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=80";
const gallery = [
  heroImage,
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1600&q=80",
];

export default function SpaPage() {
  const { facility } = useFacility(slug);
  const f = facility ?? {
    id: "",
    slug,
    name: "Havana Spa & Wellness",
    tagline: "Restore. Revive. Rejuvenate.",
    long_description:
      "Step into serenity at Havana Spa & Wellness, where ancient healing traditions meet modern luxury. Each treatment is tailored to your needs using premium natural ingredients.",
    opening_hours: "09:00 AM – 09:00 PM",
    price_per_session: 350000,
    max_capacity: 20,
    features: ["Private Treatment Rooms", "Aromatherapy Sessions", "Hot Stone Therapy", "Steam Room Access"],
  };

  const more = [
    {
      slug: "pool",
      name: "Havana Swimming Pool",
      hours: "07:00 – 20:00",
      imageUrl: "https://merlynnparkhotel.com/wp-content/uploads/2024/03/mph_pool1.jpg",
      accent: "#2DD4BF",
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
