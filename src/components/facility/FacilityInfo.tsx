"use client";

import type { Facility } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function FacilityInfo({ facility, accent }: { facility: Facility; accent: string }) {
  return (
    <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
      <div className="lg:col-span-2">
        <h2 className="font-display text-3xl text-(--havana-ivory)">About</h2>
        <p className="mt-4 text-sm leading-relaxed text-(--havana-cream)/80 sm:text-base">
          {facility.long_description ?? facility.description ?? ""}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-(--havana-surface) p-5">
            <div className="text-xs tracking-[0.25em] text-(--havana-gold)">OPENING HOURS</div>
            <div className="mt-2 text-sm text-(--havana-cream)/80">
              {facility.opening_hours ?? "—"}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-(--havana-surface) p-5">
            <div className="text-xs tracking-[0.25em] text-(--havana-gold)">PRICE / SESSION</div>
            <div className="mt-2 text-sm text-(--havana-cream)/80">
              {facility.price_per_session ? formatCurrency(Number(facility.price_per_session)) : "—"}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-(--havana-surface) p-5">
            <div className="text-xs tracking-[0.25em] text-(--havana-gold)">CAPACITY</div>
            <div className="mt-2 text-sm text-(--havana-cream)/80">
              {facility.max_capacity ? `${facility.max_capacity} guests` : "—"}
            </div>
          </div>
        </div>

        {facility.features?.length ? (
          <div className="mt-10">
            <h3 className="font-display text-2xl text-(--havana-ivory)">Features</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {facility.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-xs"
                  style={{ borderColor: accent, color: "rgba(245,240,232,0.85)" }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-white/10 bg-(--havana-surface) p-6">
        <div className="text-xs tracking-[0.25em] text-(--havana-gold)">QUICK BOOK</div>
        <div className="mt-2 font-display text-2xl text-(--havana-ivory)">{facility.name}</div>
        <p className="mt-2 text-sm text-(--havana-cream)/70">
          Pick a date and time on the booking page.
        </p>
        <a
          href={`/booking?facility=${facility.slug}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-black"
          style={{ backgroundColor: accent }}
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
