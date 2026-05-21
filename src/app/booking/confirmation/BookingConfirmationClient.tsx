"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Booking, Facility } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function CheckmarkDraw() {
  return (
    <svg width="96" height="96" viewBox="0 0 52 52" className="text-gold">
      <circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 27 l7 7 l17 -17"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BookingConfirmationClient() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";

  const [booking, setBooking] = React.useState<Booking | null>(null);
  const [facility, setFacility] = React.useState<Facility | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [typedCode, setTypedCode] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      try {
        const supabase = getSupabaseBrowserClient();
        const { data: bookingData } = await supabase
          .from("bookings")
          .select("*")
          .eq("booking_code", code)
          .maybeSingle();

        if (!bookingData || cancelled) return;
        setBooking(bookingData as Booking);

        const { data: facilityData } = await supabase
          .from("facilities")
          .select("*")
          .eq("slug", (bookingData as any).facility_slug)
          .maybeSingle();

        if (!cancelled) setFacility((facilityData ?? null) as Facility | null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (code) void run();
    return () => {
      cancelled = true;
    };
  }, [code]);

  React.useEffect(() => {
    if (!code) return;
    setTypedCode("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTypedCode(code.slice(0, i));
      if (i >= code.length) window.clearInterval(id);
    }, 35);
    return () => window.clearInterval(id);
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#F8F7F4]"
    >
      <div className="mx-auto flex max-w-130 flex-col items-center px-4 py-16 text-center sm:px-6">
        <div className="mb-6">
          <CheckmarkDraw />
        </div>

        <div className="rounded-full bg-gold/10 px-4 py-2 text-[10px] tracking-widest text-gold">
          BOOKING CONFIRMED
        </div>
        <h1 className="mt-4 font-display text-[40px] text-[#111111]">Booking Confirmed</h1>

        <div className="mt-6 w-full rounded-2xl border border-[#E5E2DC] bg-white p-5">
          <div className="text-[11px] uppercase tracking-widest text-[#999999]">Your Booking Code</div>
          <div className="mt-3 font-mono text-[24px] font-bold tracking-wider text-gold">{typedCode}</div>
          <div className="mt-2 text-[12px] text-[#999999]">Save this code</div>
        </div>

        <AnimatePresence>
          {!loading && booking ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 w-full rounded-3xl border border-[#E5E2DC] bg-white p-6 text-left shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="font-display text-[32px] text-[#111111]">Booking Details</div>
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">
                  <CheckCircle2 className="h-4 w-4" /> CONFIRMED
                </span>
              </div>

              <div className="grid gap-3 text-[14px] text-[#555555] sm:grid-cols-2">
                <div>
                  Facility: <span className="text-[#111111]">{facility?.name ?? booking.facility_slug}</span>
                </div>
                <div>
                  Date: <span className="text-[#111111]">{formatDate(new Date(booking.booking_date))}</span>
                </div>
                <div>
                  Time: <span className="text-[#111111]">{booking.time_slot}</span>
                </div>
                <div>
                  Guest Name: <span className="text-[#111111]">{booking.guest_name}</span>
                </div>
                <div>
                  Number of Guests: <span className="text-[#111111]">{booking.num_guests ?? 1}</span>
                </div>
                <div>
                  Payment: <span className="text-[#111111]">{booking.payment_method === "pay_at_venue" ? "Pay at Venue" : "Charge to Room"}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="outline" className="h-12 w-full rounded-full border-[#E5E2DC] bg-white text-[#111111] hover:bg-[#F8F7F4]">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild className="h-12 w-full rounded-full bg-gold text-white hover:bg-gold-hover">
                  <Link href="/booking">Book Another</Link>
                </Button>
                <Button asChild className="h-12 w-full rounded-full bg-[#25D366] text-white hover:bg-[#1fb85a]">
                  <a href="https://wa.me/6281282175856" target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>

              <div className="mt-6 text-[12px] text-[#999999]">
                A confirmation will be sent to {booking.guest_email}. For changes or cancellations, please contact us at least 24 hours before your booking.
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!loading && !booking ? (
          <div className="mt-10 text-sm text-[#555555]">
            Could not load booking details for code: <span className="font-mono text-[#111111]">{code}</span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
