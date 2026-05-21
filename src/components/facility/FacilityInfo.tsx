"use client";

import type { Facility } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Clock3, Tag, Waves, Wifi, Wind, UtensilsCrossed, Dumbbell, Sparkles, Flame } from "lucide-react";

const featureIcons: Record<string, React.ElementType> = {
  "Infinity Edge Design": Waves,
  "Panoramic City View": Wifi,
  "Lush Tropical Surroundings": Sparkles,
  "Poolside Lounge Chairs": Wind,
  "Private Treatment Rooms": Sparkles,
  "Aromatherapy Sessions": Wind,
  "Hot Stone Therapy": Flame,
  "Steam Room Access": Wind,
  "State-of-the-Art Equipment": Dumbbell,
  "Cardio Zone": Dumbbell,
  "Free Weight Area": Dumbbell,
  "Locker Rooms & Showers": Sparkles,
  "Open-Air Rooftop Setting": Wind,
  "Curated BBQ Menu": UtensilsCrossed,
  "City Skyline View": Wifi,
  "Dedicated BBQ Staff": Sparkles,
};

export function FacilityInfo({ facility, accent }: { facility: Facility; accent: string }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <div>
        <p className="max-w-prose text-[16px] leading-relaxed text-[#555555]">
          {facility.long_description ?? facility.description ?? ""}
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-[#333333]">
            <Clock3 className="h-4 w-4 text-[#111111]" />
            <span className="font-medium">{facility.opening_hours ?? "—"}</span>
          </div>
          <div className="flex items-center gap-3 text-[#333333]">
            <Tag className="h-4 w-4 text-[#111111]" />
            <span className="font-medium">
              {facility.price_per_session ? formatCurrency(Number(facility.price_per_session)) : "—"}
            </span>
          </div>
        </div>

        {facility.features?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {facility.features.map((feature) => {
              const Icon = featureIcons[feature] ?? Waves;
              return (
                <span
                  key={feature}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E2DC] px-4 py-2 text-[12px] text-[#333333]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#111111]" />
                  {feature}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-3xl border border-[#E5E2DC] bg-white p-6 shadow-sm">
          <div className="font-display text-[32px] text-[#111111]">Quick Reserve</div>
          <div className="mt-2 text-[14px] text-[#555555]">{facility.name}</div>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-[#E5E2DC] px-4 py-3 text-[14px] text-[#111111]">Date</div>
            <div className="rounded-xl border border-[#E5E2DC] px-4 py-3 text-[14px] text-[#111111]">Time Slot</div>
          </div>

          <a
            href={`/booking?facility=${facility.slug}`}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gold px-5 py-3.5 font-medium text-white transition-colors hover:bg-gold-hover"
          >
            Book Now
          </a>
        </div>
      </aside>
    </div>
  );
}
