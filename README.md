# Havana Pool & Wellness (Merlynn Park Hotel Jakarta)

Luxury resort-style booking website built with Next.js (App Router), TypeScript, Tailwind, shadcn/ui, Supabase, and Framer Motion.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Postgres + RLS)
- React Hook Form + Zod
- Framer Motion

## Routes

- `/` — Single-page home (hero, facilities, story, gallery, CTA)
- `/pool`, `/spa`, `/gym`, `/bbq` — Facility pages
- `/booking` — Multi-step booking form + summary sidebar
- `/booking/confirmation?code=...` — Confirmation page that loads booking details
- `POST /api/bookings` — Creates a booking and returns `{ bookingCode }`

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy the example file:

```bash
copy .env.example .env.local
```

Set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional:

- `NEXT_PUBLIC_SITE_URL` (defaults to `http://localhost:3000`)

### 3) Create Supabase tables + seed data

Run the SQL in [supabase/schema.sql](supabase/schema.sql) in your Supabase project (SQL Editor). This creates:

- `facilities`, `time_slots`, `promotions`, `bookings`
- Seed data for the 4 facilities + time slots + an active popup promotion
- RLS policies that allow public read/write as required for this demo

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Notes

- The booking form validates input client-side (RHF + Zod) and submits to `POST /api/bookings`.
- Promo codes can be entered in the summary sidebar; the server validates and applies discounts when creating the booking.
