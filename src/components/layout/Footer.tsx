import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-(--havana-black) text-(--havana-cream)">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-bold text-(--havana-gold)">HAVANA</div>
            <div className="mt-1 text-xs tracking-[0.25em] text-(--havana-cream)/70">
              WELLNESS
            </div>
            <p className="mt-4 text-sm text-(--havana-cream)/80">
              7th Floor Luxury, Merlynn Park Hotel Jakarta
            </p>
            <p className="mt-4 text-sm text-(--havana-cream)/70">
              Jl. KH. Hasyim Ashari No.29–31, Jakarta Pusat
            </p>
            <p className="mt-2 text-sm text-(--havana-cream)/70">Phone: +62 21 3000 6888</p>
            <a
              className="mt-2 inline-flex text-sm text-(--havana-gold) hover:text-(--havana-gold-light)"
              href="https://wa.me/6281282175856"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp: +62 812-8217-5856
            </a>
          </div>

          <div className="border-t border-(--havana-gold)/20 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <div className="text-sm font-semibold tracking-widest text-(--havana-gold)">QUICK LINKS</div>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link className="hover:text-(--havana-gold)" href="/">
                Home
              </Link>
              <Link className="hover:text-(--havana-gold)" href="/pool">
                Pool
              </Link>
              <Link className="hover:text-(--havana-gold)" href="/spa">
                Spa
              </Link>
              <Link className="hover:text-(--havana-gold)" href="/gym">
                Gym
              </Link>
              <Link className="hover:text-(--havana-gold)" href="/bbq">
                BBQ
              </Link>
              <Link className="hover:text-(--havana-gold)" href="/booking">
                Booking
              </Link>
            </div>
          </div>

          <div className="border-t border-(--havana-gold)/20 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <div className="text-sm font-semibold tracking-widest text-(--havana-gold)">
              FACILITIES HOURS
            </div>
            <div className="mt-4 space-y-3 text-sm text-(--havana-cream)/80">
              <div className="flex items-center justify-between gap-4">
                <span>Pool</span>
                <span className="text-(--havana-cream)/60">07:00 – 20:00</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Spa</span>
                <span className="text-(--havana-cream)/60">09:00 – 21:00</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Gym</span>
                <span className="text-(--havana-cream)/60">06:00 – 22:00</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>BBQ</span>
                <span className="text-(--havana-cream)/60">16:00 – 23:00</span>
              </div>
            </div>
          </div>

          <div className="border-t border-(--havana-gold)/20 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <div className="text-sm font-semibold tracking-widest text-(--havana-gold)">
              PLAN YOUR VISIT
            </div>
            <div className="mt-4 rounded-2xl border border-(--havana-gold)/40 bg-(--havana-charcoal) p-5">
              <p className="text-sm text-(--havana-cream)/80">
                Ready to reserve your spot on the 7th floor?
              </p>
              <Button
                asChild
                className="mt-4 h-11 w-full bg-(--havana-gold) text-black hover:bg-(--havana-gold-light)"
              >
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <a
                aria-label="Instagram"
                href="#"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 hover:bg-white/5"
              >
                <span className="text-xs font-semibold tracking-wide text-(--havana-cream)">IG</span>
              </a>
              <a
                aria-label="Facebook"
                href="#"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 hover:bg-white/5"
              >
                <span className="text-xs font-semibold tracking-wide text-(--havana-cream)">FB</span>
              </a>
              <a
                aria-label="WhatsApp"
                href="https://wa.me/6281282175856"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 hover:bg-white/5"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-(--havana-gold)/20 pt-6 text-center text-sm text-(--havana-cream)/60">
          © 2025 Havana Wellness — Merlynn Park Hotel Jakarta
        </div>
      </div>
    </footer>
  );
}
