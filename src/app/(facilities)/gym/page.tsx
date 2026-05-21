"use client";

import { motion } from "framer-motion";
import { FacilityHero } from "@/components/facility/FacilityHero";
import { FacilityInfo } from "@/components/facility/FacilityInfo";
import { FacilityGallery } from "@/components/facility/FacilityGallery";
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
