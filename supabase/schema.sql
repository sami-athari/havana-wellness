-- Required extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Ensure objects land in the public schema
SET search_path = public;

-- FACILITIES TABLE
CREATE TABLE facilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  long_description TEXT,
  floor TEXT DEFAULT '7th Floor',
  opening_hours TEXT,
  price_per_session DECIMAL(10,2),
  price_per_hour DECIMAL(10,2),
  max_capacity INTEGER,
  image_url TEXT,
  gallery_images TEXT[],
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_code TEXT UNIQUE NOT NULL,
  facility_id UUID REFERENCES facilities(id) ON DELETE CASCADE,
  facility_slug TEXT NOT NULL,
  promo_code TEXT,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  room_number TEXT,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  duration_hours INTEGER DEFAULT 1,
  num_guests INTEGER DEFAULT 1,
  special_requests TEXT,
  total_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_method TEXT DEFAULT 'room_charge',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- PROMOTIONS TABLE
CREATE TABLE promotions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  badge_text TEXT,
  discount_percent INTEGER,
  promo_code TEXT,
  valid_until DATE,
  image_url TEXT,
  cta_text TEXT DEFAULT 'Book Now',
  cta_link TEXT DEFAULT '/booking',
  is_active BOOLEAN DEFAULT true,
  is_popup BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- TIME SLOTS TABLE
CREATE TABLE time_slots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_slug TEXT NOT NULL,
  slot_label TEXT NOT NULL,
  slot_time TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true
);

-- SEED: Insert facilities
INSERT INTO facilities (slug, name, tagline, description, long_description, floor, opening_hours, price_per_session, max_capacity, features) VALUES
('pool', 'Havana Swimming Pool', 'Sky High Luxury Above Jakarta', 'A stunning rooftop infinity pool surrounded by lush greenery offering panoramic city views of Jakarta from the 7th floor.', 'Escape the city bustle and immerse yourself in our crown jewel — the Havana Swimming Pool. Perched on the 7th floor of Merlynn Park Hotel, this stunning infinity-edge pool offers breathtaking panoramic views of Jakarta''s skyline. Surrounded by lush tropical greenery, the pool area creates a resort-like oasis right in the heart of the city. Whether you prefer a refreshing morning swim, a leisurely afternoon float, or a magical evening dip under the stars, our pool is your perfect urban sanctuary.', '7th Floor', '07:00 AM – 08:00 PM', 150000, 50, ARRAY['Infinity Edge Design', 'Panoramic City View', 'Lush Tropical Surroundings', 'Poolside Lounge Chairs', 'Towel Service Included', 'Poolside Refreshments Available', 'Dedicated Lifeguard', 'Kids Shallow Area']),
('spa', 'Havana Spa & Wellness', 'Restore. Revive. Rejuvenate.', 'A tranquil sanctuary offering premium Indonesian and international spa treatments for the ultimate relaxation experience.', 'Step into serenity at Havana Spa & Wellness, where ancient healing traditions meet modern luxury. Our expert therapists are trained in both traditional Indonesian treatments and contemporary wellness therapies. From the soothing Javanese massage to revitalizing body scrubs and aromatic facials, each treatment is tailored to your specific needs. Using only premium natural ingredients and essential oils, your spa journey promises to restore balance to body, mind, and soul.', '7th Floor', '09:00 AM – 09:00 PM', 350000, 20, ARRAY['Private Treatment Rooms', 'Aromatherapy Sessions', 'Traditional Javanese Massage', 'Hot Stone Therapy', 'Body Scrub & Wrap', 'Facial Treatments', 'Couple''s Suite Available', 'Steam Room Access']),
('gym', 'Havana Fitness Center', 'Elevate Your Performance', 'A fully-equipped modern fitness center with state-of-the-art equipment and personal training services.', 'Maintain your fitness routine without compromise at our Havana Fitness Center. Equipped with the latest cardio machines, free weights, resistance equipment, and functional training zones, our gym caters to every fitness level. Our certified personal trainers are available to guide your workout and help you achieve your goals. The floor-to-ceiling windows offer an inspiring view of the city to fuel your motivation throughout your session.', '7th Floor', '06:00 AM – 10:00 PM', 100000, 30, ARRAY['State-of-the-Art Equipment', 'Cardio Zone', 'Free Weight Area', 'Functional Training Zone', 'Personal Training Available', 'City View Windows', 'Locker Rooms & Showers', 'Complimentary Towel & Water']),
('bbq', 'Havana BBQ Terrace', 'Dine Under the Jakarta Sky', 'An open-air rooftop BBQ terrace perfect for private gatherings, sunset dining, and memorable celebrations with a city backdrop.', 'Host an unforgettable celebration or enjoy an intimate evening at the Havana BBQ Terrace. Our open-air rooftop space offers a stunning alfresco dining experience with the Jakarta skyline as your backdrop. Perfect for private parties, corporate gatherings, family celebrations, or romantic evenings for two. Our dedicated BBQ team will prepare a curated selection of premium grilled meats, fresh seafood, and gourmet sides for a feast to remember. Advance reservation required for all BBQ sessions.', '7th Floor', '04:00 PM – 11:00 PM', 500000, 40, ARRAY['Open-Air Rooftop Setting', 'Premium Grill Equipment', 'Curated BBQ Menu', 'Private Event Option', 'City Skyline View', 'Dedicated BBQ Staff', 'Custom Menu Available', 'Minimum 4 Guests']);

-- SEED: Time slots
INSERT INTO time_slots (facility_slug, slot_label, slot_time) VALUES
('pool', 'Morning Session', '07:00 - 09:00'),
('pool', 'Mid Morning', '09:00 - 11:00'),
('pool', 'Midday', '11:00 - 13:00'),
('pool', 'Afternoon', '13:00 - 15:00'),
('pool', 'Late Afternoon', '15:00 - 17:00'),
('pool', 'Evening', '17:00 - 20:00'),
('spa', 'Morning', '09:00 - 11:00'),
('spa', 'Late Morning', '11:00 - 13:00'),
('spa', 'Afternoon', '13:00 - 15:00'),
('spa', 'Late Afternoon', '15:00 - 17:00'),
('spa', 'Evening', '17:00 - 19:00'),
('spa', 'Night', '19:00 - 21:00'),
('gym', 'Early Morning', '06:00 - 08:00'),
('gym', 'Morning', '08:00 - 10:00'),
('gym', 'Midday', '10:00 - 12:00'),
('gym', 'Afternoon', '12:00 - 14:00'),
('gym', 'Late Afternoon', '14:00 - 16:00'),
('gym', 'Evening', '16:00 - 18:00'),
('gym', 'Night', '18:00 - 22:00'),
('bbq', 'Sunset Session', '16:00 - 18:00'),
('bbq', 'Dinner Session', '18:00 - 20:00'),
('bbq', 'Late Night', '20:00 - 22:00');

-- SEED: Active promotion popup
INSERT INTO promotions (title, subtitle, description, badge_text, discount_percent, promo_code, valid_until, cta_text, cta_link, is_active, is_popup) VALUES
('Havana Weekend Bliss', 'Exclusive Pool & Spa Package', 'Book any 2 facilities on weekends and enjoy 20% off your total. Perfect for a luxurious staycation experience above the city.', 'Limited Offer', 20, 'HAVANA20', '2025-12-31', 'Book Now', '/booking', true, true);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read facilities" ON facilities FOR SELECT USING (true);
CREATE POLICY "Public read promotions" ON promotions FOR SELECT USING (true);
CREATE POLICY "Public read time_slots" ON time_slots FOR SELECT USING (true);
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read own booking" ON bookings FOR SELECT USING (true);

-- Required privileges for Supabase PostgREST (anon/authenticated)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON facilities, promotions, time_slots TO anon, authenticated;
GRANT SELECT, INSERT ON bookings TO anon, authenticated;
