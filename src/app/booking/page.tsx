import { Suspense } from "react";
import BookingPageClient from "@/app/booking/BookingPageClient";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F7F4]" />}>
      <BookingPageClient />
    </Suspense>
  );
}
