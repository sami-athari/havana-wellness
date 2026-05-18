import { Suspense } from "react";
import BookingConfirmationClient from "@/app/booking/confirmation/BookingConfirmationClient";

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="bg-(--havana-black)" />}>
      <BookingConfirmationClient />
    </Suspense>
  );
}
