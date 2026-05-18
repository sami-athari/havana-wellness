import { Suspense } from "react";
import BookingPageClient from "@/app/booking/BookingPageClient";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="bg-(--havana-black)" />}>
      <BookingPageClient />
    </Suspense>
  );
}
