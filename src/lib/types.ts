export interface Facility {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  description?: string | null;
  long_description?: string | null;
  floor?: string | null;
  opening_hours?: string | null;
  price_per_session?: number | null;
  price_per_hour?: number | null;
  max_capacity?: number | null;
  image_url?: string | null;
  gallery_images?: string[] | null;
  features?: string[] | null;
  is_active?: boolean | null;
  created_at?: string | null;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type PaymentMethod = "room_charge" | "pay_at_venue";

export interface Booking {
  id: string;
  booking_code: string;
  facility_id?: string | null;
  facility_slug: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  room_number?: string | null;
  booking_date: string;
  time_slot: string;
  duration_hours?: number | null;
  num_guests?: number | null;
  special_requests?: string | null;
  total_price?: number | null;
  status?: BookingStatus | null;
  payment_method?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface BookingFormData {
  facilitySlug: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomNumber?: string;
  bookingDate: string; // YYYY-MM-DD
  timeSlot: string;
  durationHours?: number;
  numGuests: number;
  specialRequests?: string;
  paymentMethod: PaymentMethod;
  promoCode?: string;
}

export interface TimeSlot {
  id: string;
  facility_slug: string;
  slot_label: string;
  slot_time: string;
  is_available?: boolean | null;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  badge_text?: string | null;
  discount_percent?: number | null;
  promo_code?: string | null;
  valid_until?: string | null;
  image_url?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
  is_active?: boolean | null;
  is_popup?: boolean | null;
  created_at?: string | null;
}
