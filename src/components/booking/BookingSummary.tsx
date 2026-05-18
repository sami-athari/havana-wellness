"use client";

import Image from "next/image";
import * as React from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { useFacilities } from "@/hooks/useFacilities";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Promotion } from "@/lib/types";

const metaImages: Record<string, string> = {
  pool: "https://merlynnparkhotel.com/wp-content/uploads/2024/03/mph_pool1.jpg",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  gym: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1200&q=80",
  bbq: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80",
};

const metaFallback: Record<string, { name: string; price: number }> = {
  pool: { name: "Havana Swimming Pool", price: 150000 },
  spa: { name: "Havana Spa & Wellness", price: 350000 },
  gym: { name: "Havana Fitness Center", price: 100000 },
  bbq: { name: "Havana BBQ Terrace", price: 500000 },
};

export function BookingSummary({
  draft,
  promoCode,
  onPromoCodeChange,
}: {
  draft: { facilitySlug?: string; bookingDate?: Date; timeSlot?: string };
  promoCode: string;
  onPromoCodeChange: (v: string) => void;
}) {
  const { facilities } = useFacilities();
  const [promo, setPromo] = React.useState<Promotion | null>(null);

  const facilitySlug = draft.facilitySlug ?? "";

  const selectedFacility = facilities.find((f) => f.slug === facilitySlug);
  const fallback = metaFallback[facilitySlug];
  const price = selectedFacility?.price_per_session
    ? Number(selectedFacility.price_per_session)
    : fallback?.price ?? 0;
  const discountPercent = promo?.discount_percent ?? 0;
  const discountAmount = Math.round((price * discountPercent) / 100);
  const total = Math.max(0, price - discountAmount);

  async function applyPromo() {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .eq("promo_code", code)
        .eq("is_active", true)
        .maybeSingle();
      if (error || !data) {
        setPromo(null);
        toast.error("Invalid promo code");
        return;
      }
      setPromo(data as Promotion);
      toast.success("Promo applied");
    } catch {
      toast.error("Could not validate promo code");
    }
  }

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-white/10 bg-(--havana-surface) p-6">
        <div className="text-xs tracking-[0.25em] text-(--havana-gold)">SUMMARY</div>
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <div className="relative h-40">
            <Image
              src={metaImages[facilitySlug] ?? metaImages.pool}
              alt="Selected facility"
              fill
              className="object-cover"
              sizes="420px"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="p-4">
            <div className="font-display text-2xl text-(--havana-ivory)">
              {selectedFacility?.name ?? fallback?.name ?? "Select a facility"}
            </div>
            <div className="mt-1 text-sm text-(--havana-cream)/70">
              {draft.bookingDate ? draft.bookingDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Choose a date"}
              {draft.timeSlot ? ` · ${draft.timeSlot}` : ""}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between text-(--havana-cream)/80">
            <span>Session Price</span>
            <span>{price ? formatCurrency(price) : "—"}</span>
          </div>
          <div className="flex items-center justify-between text-(--havana-cream)/80">
            <span>Promo Discount</span>
            <span>{discountPercent ? `-${formatCurrency(discountAmount)}` : "—"}</span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex items-center justify-between">
            <span className="text-(--havana-cream)">Total</span>
            <span className="text-lg font-semibold text-(--havana-gold)">
              {price ? formatCurrency(total) : "—"}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs tracking-[0.25em] text-(--havana-gold)">PROMO CODE</div>
          <div className="mt-3 flex gap-2">
            <input
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
              placeholder="HAVANA20"
              className="h-12 w-full rounded-full border border-white/15 bg-transparent px-4 text-sm text-(--havana-cream) placeholder:text-(--havana-cream)/40"
            />
            <button
              type="button"
              onClick={applyPromo}
              className="h-12 min-w-24 rounded-full bg-(--havana-gold) px-4 text-sm font-semibold text-black hover:bg-(--havana-gold-light)"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="mt-6 text-xs text-(--havana-cream)/60">
          Terms: Full payment required at venue
        </div>
      </div>
    </aside>
  );
}
