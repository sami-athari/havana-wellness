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
    <motion.svg width="96" height="96" viewBox="0 0 52 52" className="text-(--havana-gold)">
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.path
        d="M14 27 l7 7 l17 -17"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.35 }}
      />
    </motion.svg>
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
        const { data: b } = await supabase
          .from("bookings")
          .select("*")
          .eq("booking_code", code)
          .maybeSingle();
        if (!b || cancelled) return;
        setBooking(b as Booking);

        const { data: f } = await supabase
          .from("facilities")
          .select("*")
          .eq("slug", (b as any).facility_slug)
          .maybeSingle();
        if (!cancelled) setFacility((f ?? null) as Facility | null);
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
      className="bg-(--havana-black)"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6">
        <div className="mb-6">
          <CheckmarkDraw />
        </div>

        <div className="text-xs tracking-[0.3em] text-(--havana-gold)">BOOKING CONFIRMED</div>
        <h1 className="mt-3 font-display text-4xl text-(--havana-gold) sm:text-5xl">BOOKING CONFIRMED</h1>

        <div className="mt-6 w-full rounded-2xl border border-(--havana-gold) bg-(--havana-charcoal) p-6">
          <div className="text-sm text-(--havana-cream)/70">Your Booking Code:</div>
          <div className="mt-2 font-mono text-2xl font-semibold text-black">
            <span className="inline-block rounded-lg bg-(--havana-gold) px-3 py-2">{typedCode}</span>
          </div>
          <div className="mt-3 text-xs text-(--havana-cream)/60">Save this code</div>
        </div>

        <AnimatePresence>
          {!loading && booking ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 w-full rounded-2xl border border-white/10 bg-(--havana-surface) p-6 text-left"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="font-display text-2xl text-(--havana-ivory)">Booking Details</div>
                <span className="inline-flex items-center gap-2 rounded-full bg-(--havana-gold)/15 px-3 py-1 text-xs text-(--havana-gold)">
                  <CheckCircle2 className="h-4 w-4" /> CONFIRMED
                </span>
              </div>

              <div className="grid gap-3 text-sm text-(--havana-cream)/80 sm:grid-cols-2">
                <div>
                  Facility: <span className="text-(--havana-cream)">{facility?.name ?? booking.facility_slug}</span>
                </div>
                <div>
                  Date: <span className="text-(--havana-cream)">{formatDate(new Date(booking.booking_date))}</span>
                </div>
                <div>
                  Time: <span className="text-(--havana-cream)">{booking.time_slot}</span>
                </div>
                <div>
                  Guest Name: <span className="text-(--havana-cream)">{booking.guest_name}</span>
                </div>
                <div>
                  Number of Guests: <span className="text-(--havana-cream)">{booking.num_guests ?? 1}</span>
                </div>
                <div>
                  Payment:{" "}
                  <span className="text-(--havana-cream)">
                    {booking.payment_method === "pay_at_venue" ? "Pay at Venue" : "Charge to Room"}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="outline" className="h-12 w-full border-white/15 bg-transparent text-(--havana-cream) hover:bg-white/5">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild className="h-12 w-full bg-(--havana-gold) text-black hover:bg-(--havana-gold-light)">
                  <Link href="/booking">Book Another Facility</Link>
                </Button>
                <Button asChild className="h-12 w-full bg-emerald-500 text-black hover:bg-emerald-400">
                  <a href="https://wa.me/6281282175856" target="_blank" rel="noreferrer">
                    WhatsApp Merlynn Park
                  </a>
                </Button>
              </div>

              <div className="mt-6 text-xs text-(--havana-cream)/60">
                A confirmation will be sent to {booking.guest_email}. For changes or cancellations, please contact us at least 24 hours before your booking.
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!loading && !booking ? (
          <div className="mt-10 text-sm text-(--havana-cream)/70">
            Could not load booking details for code:{" "}
            <span className="font-mono text-(--havana-cream)">{code}</span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
