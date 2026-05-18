"use client";

import * as React from "react";
import type { BookingFormData } from "@/lib/types";

export function useBooking() {
  const [formData, setFormData] = React.useState<Partial<BookingFormData>>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [bookingCode, setBookingCode] = React.useState<string | null>(null);

  const updateFormData = React.useCallback((patch: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  }, []);

  const submitBooking = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    setBookingCode(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as any;
        throw new Error(payload?.message ?? "Failed to submit booking");
      }

      const payload = (await res.json()) as { success: boolean; bookingCode: string };
      setBookingCode(payload.bookingCode);
      return payload.bookingCode;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to submit booking";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return { formData, updateFormData, submitBooking, loading, error, bookingCode };
}
