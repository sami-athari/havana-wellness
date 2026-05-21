"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingSummary } from "@/components/booking/BookingSummary";

export default function BookingPageClient() {
  const [draft, setDraft] = React.useState<{
    facilitySlug?: string;
    bookingDate?: Date;
    timeSlot?: string;
  }>({});
  const [promoCode, setPromoCode] = React.useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#F8F7F4] text-[#111111]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex rounded-full bg-gold/10 px-4 py-2 text-[10px] tracking-widest text-gold">
            BOOKING
          </div>
          <h1 className="mt-4 font-display text-[40px] text-[#111111] lg:text-[56px]">
            Reserve your Havana experience
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[#555555]">
            Choose a facility, pick your time, and we&apos;ll confirm your reservation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="order-1 lg:order-2">
            <BookingSummary
              draft={draft}
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
            />
          </div>
          <div className="order-2 lg:order-1">
            <BookingForm
              promoCode={promoCode}
              onDraftChange={(patch) => setDraft((prev) => ({ ...prev, ...patch }))}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
