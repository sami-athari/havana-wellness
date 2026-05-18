"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FacilitySelector } from "@/components/booking/FacilitySelector";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import { cn } from "@/lib/utils";

const phoneRegex = /^(\+62|0)8\d{7,12}$/;

const schema = z.object({
  facilitySlug: z.enum(["pool", "spa", "gym", "bbq"], { message: "Choose a facility" }),
  bookingDate: z.date({ message: "Choose a date" }),
  timeSlot: z.string().min(1, "Choose a time slot"),
  guestName: z.string().min(2, "Full name must be at least 2 characters"),
  guestEmail: z.string().email("Enter a valid email"),
  guestPhone: z.string().regex(phoneRegex, "Enter a valid Indonesian phone number"),
  roomNumber: z.string().optional(),
  numGuests: z.number().min(1).max(8),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(["room_charge", "pay_at_venue"]),
});

type FormValues = z.infer<typeof schema>;

function FieldStatus({ ok }: { ok: boolean }) {
  return ok ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : null;
}

export function BookingForm({
  promoCode,
  onDraftChange,
}: {
  promoCode: string;
  onDraftChange: (patch: { facilitySlug?: string; bookingDate?: Date; timeSlot?: string }) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const facilityParam = searchParams.get("facility");

  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      facilitySlug: (facilityParam as any) ?? "pool",
      bookingDate: undefined as any,
      timeSlot: "",
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      roomNumber: "",
      numGuests: 1,
      specialRequests: "",
      paymentMethod: "room_charge",
    },
  });

  React.useEffect(() => {
    if (!facilityParam) return;
    if (["pool", "spa", "gym", "bbq"].includes(facilityParam)) {
      form.setValue("facilitySlug", facilityParam as any, { shouldValidate: true });
    }
  }, [facilityParam, form]);

  React.useEffect(() => {
    const sub = form.watch((values) => {
      onDraftChange({
        facilitySlug: values.facilitySlug,
        bookingDate: values.bookingDate as any,
        timeSlot: values.timeSlot,
      });
    });
    return () => sub.unsubscribe();
  }, [form, onDraftChange]);

  const facilitySlug = form.watch("facilitySlug");
  const bookingDate = form.watch("bookingDate");

  async function nextFromStep1() {
    const ok = await form.trigger(["facilitySlug"]);
    if (ok) setStep(2);
  }

  async function nextFromStep2() {
    const ok = await form.trigger(["bookingDate"]);
    if (ok) setStep(3);
  }

  async function nextFromStep3() {
    const ok = await form.trigger(["timeSlot"]);
    if (ok) setStep(4);
  }

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facilitySlug: values.facilitySlug,
          bookingDate: values.bookingDate.toISOString().slice(0, 10),
          timeSlot: values.timeSlot,
          guestName: values.guestName,
          guestEmail: values.guestEmail,
          guestPhone: values.guestPhone,
          roomNumber: values.roomNumber,
          numGuests: values.numGuests,
          specialRequests: values.specialRequests,
          paymentMethod: values.paymentMethod,
          promoCode: promoCode?.trim() ? promoCode.trim().toUpperCase() : undefined,
        }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as any;
        throw new Error(payload?.message ?? "Booking failed");
      }

      const payload = (await res.json()) as { success: true; bookingCode: string };
      toast.success("Reservation confirmed");
      router.push(`/booking/confirmation?code=${encodeURIComponent(payload.bookingCode)}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-2xl border border-white/10 bg-(--havana-surface) p-6">
      <div className="text-xs tracking-[0.25em] text-(--havana-gold)">BOOKING FORM</div>

      <div className="mt-6 flex items-center gap-2 text-sm text-(--havana-cream)/70">
        <span className={cn("rounded-full px-3 py-1", step === 1 ? "bg-(--havana-gold) text-black" : "bg-black/20")}>1</span>
        <span className={cn(step === 1 && "text-(--havana-cream)")}>Choose Facility</span>
        <span className="mx-1 text-(--havana-cream)/30">/</span>
        <span className={cn("rounded-full px-3 py-1", step === 2 ? "bg-(--havana-gold) text-black" : "bg-black/20")}>2</span>
        <span className={cn(step === 2 && "text-(--havana-cream)")}>Choose Date</span>
        <span className="mx-1 text-(--havana-cream)/30">/</span>
        <span className={cn("rounded-full px-3 py-1", step === 3 ? "bg-(--havana-gold) text-black" : "bg-black/20")}>3</span>
        <span className={cn(step === 3 && "text-(--havana-cream)")}>Choose Time</span>
        <span className="mx-1 text-(--havana-cream)/30">/</span>
        <span className={cn("rounded-full px-3 py-1", step === 4 ? "bg-(--havana-gold) text-black" : "bg-black/20")}>4</span>
        <span className={cn(step === 4 && "text-(--havana-cream)")}>Guest Details</span>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-2xl text-(--havana-ivory)">Step 1 — Choose Facility</h3>
              <p className="mt-2 text-sm text-(--havana-cream)/70">Select one facility for this reservation.</p>

              <div className="mt-5">
                <FacilitySelector
                  value={facilitySlug}
                  onChange={(slug) => form.setValue("facilitySlug", slug as any, { shouldValidate: true })}
                />
                {form.formState.errors.facilitySlug ? (
                  <div className="mt-2 text-sm text-red-400">{form.formState.errors.facilitySlug.message}</div>
                ) : null}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={nextFromStep1}
                  className="h-12 min-w-35 rounded-full bg-(--havana-gold) px-6 text-sm font-semibold text-black hover:bg-(--havana-gold-light)"
                >
                  Next
                </button>
              </div>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-2xl text-(--havana-ivory)">Step 2 — Choose Date</h3>
              <p className="mt-2 text-sm text-(--havana-cream)/70">Select your preferred date.</p>

              <div className="mt-5">
                <div className="mb-2 text-sm text-(--havana-cream)">Date</div>
                <DatePicker
                  value={bookingDate}
                  onChange={(d) => form.setValue("bookingDate", d as any, { shouldValidate: true })}
                />
                {form.formState.errors.bookingDate ? (
                  <div className="mt-2 text-sm text-red-400">{form.formState.errors.bookingDate.message as any}</div>
                ) : null}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-12 min-w-35 rounded-full border border-white/15 bg-transparent px-6 text-sm text-(--havana-cream) hover:bg-white/5"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextFromStep2}
                  className="h-12 min-w-35 rounded-full bg-(--havana-gold) px-6 text-sm font-semibold text-black hover:bg-(--havana-gold-light)"
                >
                  Next
                </button>
              </div>
            </motion.div>
          ) : null}

          {step === 3 ? (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-2xl text-(--havana-ivory)">Step 3 — Choose Time Slot</h3>
              <p className="mt-2 text-sm text-(--havana-cream)/70">Select your preferred time.</p>

              <div className="mt-5">
                <div className="mb-2 text-sm text-(--havana-cream)">Time Slot</div>
                <TimeSlotPicker
                  facilitySlug={facilitySlug}
                  value={form.watch("timeSlot")}
                  onChange={(v) => form.setValue("timeSlot", v, { shouldValidate: true })}
                />
                {form.formState.errors.timeSlot ? (
                  <div className="mt-2 text-sm text-red-400">{form.formState.errors.timeSlot.message}</div>
                ) : null}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="h-12 min-w-35 rounded-full border border-white/15 bg-transparent px-6 text-sm text-(--havana-cream) hover:bg-white/5"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextFromStep3}
                  className="h-12 min-w-35 rounded-full bg-(--havana-gold) px-6 text-sm font-semibold text-black hover:bg-(--havana-gold-light)"
                >
                  Next
                </button>
              </div>
            </motion.div>
          ) : null}

          {step === 4 ? (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-2xl text-(--havana-ivory)">Step 4 — Guest Details</h3>
              <p className="mt-2 text-sm text-(--havana-cream)/70">Tell us who the reservation is for.</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm text-(--havana-cream)">Full Name *</label>
                  <div className="relative mt-2">
                    <input
                      {...form.register("guestName")}
                      className="h-12 w-full rounded-full border border-white/15 bg-transparent px-4 pr-10 text-sm text-(--havana-cream)"
                      placeholder="Your full name"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <FieldStatus ok={!!form.formState.touchedFields.guestName && !form.formState.errors.guestName} />
                    </div>
                  </div>
                  {form.formState.errors.guestName ? (
                    <div className="mt-2 text-sm text-red-400">{form.formState.errors.guestName.message}</div>
                  ) : null}
                </div>

                <div>
                  <label className="text-sm text-(--havana-cream)">Email *</label>
                  <div className="relative mt-2">
                    <input
                      {...form.register("guestEmail")}
                      className="h-12 w-full rounded-full border border-white/15 bg-transparent px-4 pr-10 text-sm text-(--havana-cream)"
                      placeholder="name@email.com"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <FieldStatus ok={!!form.formState.touchedFields.guestEmail && !form.formState.errors.guestEmail} />
                    </div>
                  </div>
                  {form.formState.errors.guestEmail ? (
                    <div className="mt-2 text-sm text-red-400">{form.formState.errors.guestEmail.message}</div>
                  ) : null}
                </div>

                <div>
                  <label className="text-sm text-(--havana-cream)">Phone *</label>
                  <div className="relative mt-2">
                    <input
                      {...form.register("guestPhone")}
                      className="h-12 w-full rounded-full border border-white/15 bg-transparent px-4 pr-10 text-sm text-(--havana-cream)"
                      placeholder="08xx or +628xx"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <FieldStatus ok={!!form.formState.touchedFields.guestPhone && !form.formState.errors.guestPhone} />
                    </div>
                  </div>
                  {form.formState.errors.guestPhone ? (
                    <div className="mt-2 text-sm text-red-400">{form.formState.errors.guestPhone.message}</div>
                  ) : null}
                </div>

                <div>
                  <label className="text-sm text-(--havana-cream)">Room Number</label>
                  <input
                    {...form.register("roomNumber")}
                    className="mt-2 h-12 w-full rounded-full border border-white/15 bg-transparent px-4 text-sm text-(--havana-cream)"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label className="text-sm text-(--havana-cream)">Number of Guests *</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    {...form.register("numGuests", { valueAsNumber: true })}
                    className="mt-2 h-12 w-full rounded-full border border-white/15 bg-transparent px-4 text-sm text-(--havana-cream)"
                  />
                  {form.formState.errors.numGuests ? (
                    <div className="mt-2 text-sm text-red-400">{form.formState.errors.numGuests.message as any}</div>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-(--havana-cream)">Special Requests</label>
                  <textarea
                    {...form.register("specialRequests")}
                    className="mt-2 min-h-27.5 w-full rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-(--havana-cream)"
                    placeholder="Optional"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-(--havana-cream)">Payment Method</label>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-white/15 bg-black/10 px-4 py-3 text-sm">
                      <input type="radio" value="room_charge" {...form.register("paymentMethod")} />
                      <span>Charge to Room</span>
                    </label>
                    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-white/15 bg-black/10 px-4 py-3 text-sm">
                      <input type="radio" value="pay_at_venue" {...form.register("paymentMethod")} />
                      <span>Pay at Venue</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="h-12 min-w-35 rounded-full border border-white/15 bg-transparent px-6 text-sm text-(--havana-cream) hover:bg-white/5"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 min-w-55 items-center justify-center gap-2 rounded-full bg-(--havana-gold) px-6 text-sm font-semibold text-black hover:bg-(--havana-gold-light) disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Processing your reservation...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
