import "server-only";

import type { Booking, BookingFormData, Facility, Promotion, TimeSlot } from "@/lib/types";
import { generateBookingCode } from "@/lib/utils";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function getAllFacilities(): Promise<Facility[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Facility[];
}

export async function getFacilityBySlug(slug: string): Promise<Facility | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as Facility | null;
}

export async function getTimeSlots(facilitySlug: string): Promise<TimeSlot[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("time_slots")
    .select("*")
    .eq("facility_slug", facilitySlug)
    .eq("is_available", true);

  if (error) throw error;
  return (data ?? []) as TimeSlot[];
}

export async function getActivePromotion(): Promise<Promotion | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("is_active", true)
    .eq("is_popup", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as Promotion | null;
}

export async function createBooking(data: BookingFormData): Promise<Pick<Booking, "id" | "booking_code">> {
  const supabase = getSupabaseServerClient();

  const bookingCode = generateBookingCode(new Date(data.bookingDate));

  const { data: inserted, error } = await supabase
    .from("bookings")
    .insert({
      booking_code: bookingCode,
      facility_slug: data.facilitySlug,
      guest_name: data.guestName,
      guest_email: data.guestEmail,
      guest_phone: data.guestPhone,
      room_number: data.roomNumber || null,
      booking_date: data.bookingDate,
      time_slot: data.timeSlot,
      duration_hours: data.durationHours ?? 1,
      num_guests: data.numGuests,
      special_requests: data.specialRequests || null,
      payment_method: data.paymentMethod,
      status: "confirmed",
    })
    .select("id, booking_code")
    .single();

  if (error) throw error;
  return inserted as Pick<Booking, "id" | "booking_code">;
}

export async function getBookingByCode(code: string): Promise<Booking | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("booking_code", code)
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as Booking | null;
}
