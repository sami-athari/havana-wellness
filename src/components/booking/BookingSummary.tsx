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
      <div className="rounded-3xl border border-[#E5E2DC] bg-white p-6 shadow-sm">
        <div className="text-[10px] tracking-widest text-gold">SUMMARY</div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-[#E5E2DC]">
          <div className="relative h-40">
            <Image
              src={metaImages[facilitySlug] ?? metaImages.pool}
              alt="Selected facility"
              fill
              className="object-cover"
              sizes="420px"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div className="p-4">
            <div className="font-display text-[24px] text-[#111111]">
              {selectedFacility?.name ?? fallback?.name ?? "Select a facility"}
            </div>
            <div className="mt-1 text-[13px] text-[#555555]">
              {draft.bookingDate ? draft.bookingDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Choose a date"}
              {draft.timeSlot ? ` · ${draft.timeSlot}` : ""}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-[14px]">
          <div className="flex items-center justify-between text-[#555555]">
            <span>Session Price</span>
            <span>{price ? formatCurrency(price) : "—"}</span>
          </div>
          <div className="flex items-center justify-between text-[#555555]">
            <span>Promo Discount</span>
            <span>{discountPercent ? `-${formatCurrency(discountAmount)}` : "—"}</span>
          </div>
          <div className="h-px bg-[#F0EDE8]" />
          <div className="flex items-center justify-between">
            <span className="font-display text-[22px] text-[#111111]">Total</span>
            <span className="font-display text-[22px] text-gold">
              {price ? formatCurrency(total) : "—"}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-[10px] tracking-widest text-gold">PROMO CODE</div>
          <div className="mt-3 flex gap-2">
            <input
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
              placeholder="HAVANA20"
              className="h-12 w-full rounded-xl border border-[#E5E2DC] bg-white px-4 text-[14px] text-[#111111] placeholder:text-[#999999] focus:border-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={applyPromo}
              className="h-12 min-w-24 rounded-xl border border-gold bg-white px-4 text-[14px] font-medium text-gold hover:bg-[#F8F7F4]"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="mt-6 text-[12px] text-[#999999]">
          Terms: Full payment required at venue
        </div>
      </div>
    </aside>
  );
}
