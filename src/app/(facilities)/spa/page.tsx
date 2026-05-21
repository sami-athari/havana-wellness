"use client";

import { motion } from "framer-motion";
import { FacilityHero } from "@/components/facility/FacilityHero";
import { FacilityInfo } from "@/components/facility/FacilityInfo";
import { FacilityGallery } from "@/components/facility/FacilityGallery";
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
