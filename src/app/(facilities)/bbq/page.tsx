"use client";

import { motion } from "framer-motion";
import { FacilityHero } from "@/components/facility/FacilityHero";
import { FacilityInfo } from "@/components/facility/FacilityInfo";
import { FacilityGallery } from "@/components/facility/FacilityGallery";
import { useFacility } from "@/hooks/useFacilities";

const slug = "bbq";
const accent = "#D97706";
const heroImage = "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=2000&q=80";
const gallery = [
  heroImage,
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?auto=format&fit=crop&w=1600&q=80",
];

export default function BbqPage() {
  const { facility } = useFacility(slug);
  const f = facility ?? {
    id: "",
    slug,
    name: "Havana BBQ Terrace",
    tagline: "Dine Under the Jakarta Sky",
    long_description:
      "Host an unforgettable celebration or enjoy an intimate evening at the Havana BBQ Terrace. Perfect for private parties, corporate gatherings, family celebrations, or romantic evenings for two.",
    opening_hours: "04:00 PM – 11:00 PM",
    price_per_session: 500000,
    max_capacity: 40,
    features: ["Open-Air Rooftop Setting", "Curated BBQ Menu", "City Skyline View", "Dedicated BBQ Staff"],
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-[#F8F7F4]">
      <FacilityHero name={f.name} tagline={f.tagline ?? ""} imageUrl={heroImage} accent={accent} slug={slug} />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <FacilityInfo facility={f as any} accent={accent} />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <h2 className="font-display text-[48px] text-[#111111]">Gallery</h2>
          <div className="mt-6">
            <FacilityGallery images={gallery} />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
