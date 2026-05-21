"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { useFacilities } from "@/hooks/useFacilities";

const facilityMeta = [
  {
    slug: "pool",
    name: "Havana Swimming Pool",
    hours: "07:00 – 20:00",
    price: 150000,
    imageUrl: "https://merlynnparkhotel.com/wp-content/uploads/2024/03/mph_pool1.jpg",
  },
  {
    slug: "spa",
    name: "Havana Spa & Wellness",
    hours: "09:00 – 21:00",
    price: 350000,
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "gym",
    name: "Havana Fitness Center",
    hours: "06:00 – 22:00",
    price: 100000,
    imageUrl:
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "bbq",
    name: "Havana BBQ Terrace",
    hours: "16:00 – 23:00",
    price: 500000,
    imageUrl:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
  },
];

export function FacilitySelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (slug: string) => void;
}) {
  const { facilities } = useFacilities();

  const merged = facilityMeta.map((m) => {
    const db = facilities.find((f) => f.slug === m.slug);
    return {
      ...m,
      hours: db?.opening_hours ? db.opening_hours.replace("AM", "").replace("PM", "") : m.hours,
      price: db?.price_per_session ? Number(db.price_per_session) : m.price,
    };
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {merged.map((f) => {
        const selected = value === f.slug;
        return (
          <motion.button
            key={f.slug}
            type="button"
            onClick={() => onChange(f.slug)}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all",
              selected ? "border-gold bg-gold/5" : "border-[#E5E2DC] hover:border-gold"
            )}
          >
            <div className="absolute inset-0 opacity-15">
              <Image src={f.imageUrl} alt={f.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-white" />
            </div>

            <div className="relative z-10 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="font-display text-[16px] text-[#111111]">{f.name}</div>
                {selected ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
                    <Check className="h-4 w-4" /> Selected
                  </span>
                ) : null}
              </div>
              <div className="mt-2 text-[12px] text-[#999999]">{f.hours}</div>
              <div className="mt-3 text-[14px] text-[#111111]">{formatCurrency(f.price)}</div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
