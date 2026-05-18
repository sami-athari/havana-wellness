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
      className="bg-(--havana-black)"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-10">
          <div className="text-xs tracking-[0.3em] text-(--havana-gold)">BOOKING</div>
          <h1 className="mt-3 font-display text-4xl text-(--havana-ivory) sm:text-5xl">
            Reserve your Havana experience
          </h1>
          <p className="mt-3 text-sm text-(--havana-cream)/75 sm:text-base">
            Choose a facility, pick your time, and we&apos;ll confirm your reservation.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="order-1 lg:order-2 lg:w-105">
            <BookingSummary
              draft={draft}
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
            />
          </div>
          <div className="order-2 lg:order-1 lg:flex-1">
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
