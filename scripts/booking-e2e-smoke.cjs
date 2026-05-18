/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

function readEnvFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    env[key] = value;
  }
  return env;
}

function bookingCodeForToday() {
  const iso = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SMK-${iso}-${rand}`;
}

async function main() {
  const envPath = path.join(process.cwd(), ".env.local");
  const env = readEnvFile(envPath);
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
    process.exit(1);
  }

  const { createClient } = require("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { data: facility, error: facilityError } = await supabase
    .from("facilities")
    .select("id, slug, name, price_per_session")
    .eq("slug", "pool")
    .maybeSingle();

  if (facilityError || !facility) {
    console.error("Failed to load facility 'pool':", facilityError?.message ?? "not found");
    process.exit(2);
  }

  const { data: promo } = await supabase
    .from("promotions")
    .select("promo_code, discount_percent, is_active")
    .eq("promo_code", "HAVANA20")
    .eq("is_active", true)
    .maybeSingle();

  const basePrice = facility.price_per_session ? Number(facility.price_per_session) : 0;
  const discountPercent = promo?.discount_percent ?? 0;
  const totalPrice = Math.max(0, Math.round(basePrice - (basePrice * discountPercent) / 100));

  const bookingCode = bookingCodeForToday();
  const bookingDate = new Date();
  bookingDate.setDate(bookingDate.getDate() + 2);
  const dateStr = bookingDate.toISOString().slice(0, 10);

  const insertPayload = {
    booking_code: bookingCode,
    facility_id: facility.id,
    facility_slug: facility.slug,
    guest_name: "Smoke Test User",
    guest_email: "smoke.test@example.com",
    guest_phone: "081234567890",
    room_number: "701",
    booking_date: dateStr,
    time_slot: "07:00 - 09:00",
    duration_hours: 1,
    num_guests: 2,
    special_requests: "Supabase e2e smoke test",
    total_price: totalPrice,
    status: "confirmed",
    payment_method: "room_charge",
  };

  // Prefer inserting promo_code (if the column exists), but retry without it if needed.
  const firstAttempt = await supabase
    .from("bookings")
    .insert({ ...insertPayload, promo_code: promo?.promo_code ?? null })
    .select("id, booking_code, facility_slug, booking_date, time_slot, total_price")
    .single();

  let inserted = firstAttempt.data;
  let insertError = firstAttempt.error;

  if (insertError && String(insertError.message).includes("promo_code")) {
    console.warn("promo_code column missing; retrying insert without promo_code...");
    const retry = await supabase
      .from("bookings")
      .insert(insertPayload)
      .select("id, booking_code, facility_slug, booking_date, time_slot, total_price")
      .single();
    inserted = retry.data;
    insertError = retry.error;
  }

  if (insertError) {
    console.error("Insert booking failed:", insertError.message);
    process.exit(3);
  }

  console.log("Inserted booking:", inserted);

  const { data: fetched, error: fetchError } = await supabase
    .from("bookings")
    .select("*")
    .eq("booking_code", bookingCode)
    .maybeSingle();

  if (fetchError || !fetched) {
    console.error("Fetch booking by code failed:", fetchError?.message ?? "not found");
    process.exit(4);
  }

  console.log("Fetched booking by code OK:", {
    booking_code: fetched.booking_code,
    facility_slug: fetched.facility_slug,
    booking_date: fetched.booking_date,
    time_slot: fetched.time_slot,
    total_price: fetched.total_price,
  });

  console.log("All good.");
}

main().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(9);
});
