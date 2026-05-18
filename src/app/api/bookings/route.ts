import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const phoneRegex = /^(\+62|0)8\d{7,12}$/;

const BookingSchema = z.object({
  facilitySlug: z.enum(["pool", "spa", "gym", "bbq"]),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(1),
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().regex(phoneRegex),
  roomNumber: z.string().optional(),
  numGuests: z.number().int().min(1).max(8),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(["room_charge", "pay_at_venue"]),
  promoCode: z.string().min(1).optional(),
});

function generateBookingCodeForDateString(bookingDate: string) {
  const datePart = bookingDate.replaceAll("-", "");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const random = Array.from({ length: 4 })
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join("");
  return `HVN-${datePart}-${random}`;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const input = BookingSchema.parse(json);

    const supabase = getSupabaseServerClient();

    const { data: facility } = await supabase
      .from("facilities")
      .select("id, slug, price_per_session")
      .eq("slug", input.facilitySlug)
      .maybeSingle();

    const basePrice = facility?.price_per_session ? Number(facility.price_per_session) : null;

    let discountPercent = 0;
    const promoCode = input.promoCode?.trim().toUpperCase();
    if (promoCode) {
      const { data: promo } = await supabase
        .from("promotions")
        .select("promo_code, discount_percent, valid_until, is_active")
        .eq("promo_code", promoCode)
        .eq("is_active", true)
        .maybeSingle();

      const now = new Date();
      const stillValid =
        !promo?.valid_until || new Date(promo.valid_until as any).getTime() >= now.setHours(0, 0, 0, 0);

      if (promo && stillValid) {
        discountPercent = promo.discount_percent ?? 0;
      }
    }

    const totalPrice =
      basePrice == null
        ? null
        : Math.max(0, Math.round(basePrice - (basePrice * discountPercent) / 100));

    const bookingCode = generateBookingCodeForDateString(input.bookingDate);

    const baseInsert = {
      booking_code: bookingCode,
      facility_id: facility?.id ?? null,
      facility_slug: input.facilitySlug,
      guest_name: input.guestName,
      guest_email: input.guestEmail,
      guest_phone: input.guestPhone,
      room_number: input.roomNumber ?? null,
      booking_date: input.bookingDate,
      time_slot: input.timeSlot,
      duration_hours: 1,
      num_guests: input.numGuests,
      special_requests: input.specialRequests ?? null,
      total_price: totalPrice,
      status: "confirmed",
      payment_method: input.paymentMethod,
    } as const;

    // Prefer storing promo_code, but gracefully fallback if the DB doesn't have the column yet.
    const { data: inserted, error } = await supabase
      .from("bookings")
      .insert({ ...baseInsert, promo_code: promoCode ?? null } as any)
      .select("id, booking_code")
      .single();

    let finalInserted = inserted;
    let finalError = error;

    if (
      finalError &&
      typeof finalError.message === "string" &&
      finalError.message.includes("promo_code")
    ) {
      const retry = await supabase
        .from("bookings")
        .insert(baseInsert as any)
        .select("id, booking_code")
        .single();
      finalInserted = retry.data;
      finalError = retry.error;
    }

    if (finalError || !finalInserted) {
      return NextResponse.json(
        {
          success: false,
          message: finalError?.message ?? "Insert booking failed (no data returned)",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      bookingCode: finalInserted.booking_code,
      bookingId: finalInserted.id,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid booking data", issues: e.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
