"use client";

import { motion } from "framer-motion";
import { FacilityHero } from "@/components/facility/FacilityHero";
import { FacilityInfo } from "@/components/facility/FacilityInfo";
import { FacilityGallery } from "@/components/facility/FacilityGallery";
import { FacilityCard } from "@/components/ui/FacilityCard";
import { useFacility } from "@/hooks/useFacilities";

const slug = "gym";
const accent = "#F97316";
const heroImage = "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=2000&q=80";
const gallery = [
  heroImage,
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1600&q=80",
];

export default function GymPage() {
  const { facility } = useFacility(slug);
  const f = facility ?? {
    id: "",
    slug,
    name: "Havana Fitness Center",
    tagline: "Elevate Your Performance",
    long_description:
      "Maintain your fitness routine without compromise at our Havana Fitness Center. Equipped with the latest cardio machines, free weights, and functional training zones.",
    opening_hours: "06:00 AM – 10:00 PM",
    price_per_session: 100000,
    max_capacity: 30,
    features: ["State-of-the-Art Equipment", "Cardio Zone", "Free Weight Area", "Locker Rooms & Showers"],
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
      slug: "spa",
      name: "Havana Spa & Wellness",
      hours: "09:00 – 21:00",
      imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
      accent: "#F43F5E",
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
