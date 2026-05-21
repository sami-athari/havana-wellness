import { Suspense } from "react";
import BookingConfirmationClient from "@/app/booking/confirmation/BookingConfirmationClient";

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F7F4]" />}>
      <BookingConfirmationClient />
    </Suspense>
  );
}
