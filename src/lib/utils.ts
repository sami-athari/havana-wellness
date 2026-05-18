import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateBookingCode(date: Date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const random = Array.from({ length: 4 })
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join("");

  return `HVN-${y}${m}${d}-${random}`;
}

export function formatCurrency(amount: number) {
  const rounded = Number.isFinite(amount) ? Math.round(amount) : 0;
  const formatted = new Intl.NumberFormat("id-ID").format(rounded);
  return `Rp ${formatted}`;
}

export function formatDate(date: Date) {
  return format(date, "EEEE, d MMMM yyyy");
}
