"use client";

import { motion } from "framer-motion";
import { FacilityHero } from "@/components/facility/FacilityHero";
import { FacilityInfo } from "@/components/facility/FacilityInfo";
import { FacilityGallery } from "@/components/facility/FacilityGallery";
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
