import Link from "next/link";
import { Globe, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-bold text-white">HAVANA</div>
            <div className="mt-1 text-xs tracking-[0.25em] text-[#999999]">
              WELLNESS
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-[#888888]">
              A clean light-luxury escape on the 7th floor of Merlynn Park Hotel Jakarta.
            </p>
            <p className="mt-4 text-sm text-[#888888]">
              Jl. KH. Hasyim Ashari No.29–31, Jakarta Pusat
            </p>
            <p className="mt-2 text-sm text-[#888888]">Phone: +62 21 3000 6888</p>
            <a
              className="mt-2 inline-flex text-sm text-gold hover:text-gold-light"
              href="https://wa.me/6281282175856"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp: +62 812-8217-5856
            </a>
          </div>

          <div className="border-t border-[#222222] pt-8 md:border-t-0 md:pt-0 lg:pl-8">
            <div className="text-[11px] tracking-widest text-[#666666]">QUICK LINKS</div>
            <div className="mt-4 flex flex-col gap-3 text-sm">
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

          <div className="border-t border-[#222222] pt-8 md:border-t-0 md:pt-0 lg:pl-8">
            <div className="text-[11px] tracking-widest text-[#666666]">
              FACILITIES HOURS
            </div>
            <div className="mt-4 space-y-3 text-sm text-[#AAAAAA]">
              <div className="flex items-center justify-between gap-4">
                <span>Pool</span>
                <span className="text-[#666666]">07:00 – 20:00</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Spa</span>
                <span className="text-[#666666]">09:00 – 21:00</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Gym</span>
                <span className="text-[#666666]">06:00 – 22:00</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>BBQ</span>
                <span className="text-[#666666]">16:00 – 23:00</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#222222] pt-8 md:border-t-0 md:pt-0 lg:pl-8">
            <div className="text-[11px] tracking-widest text-[#666666]">
              PLAN YOUR VISIT
            </div>
            <div className="mt-4 rounded-3xl border border-[#2A2A2A] bg-[#161616] p-5">
              <p className="text-sm text-[#AAAAAA]">
                Ready to reserve your spot on the 7th floor?
              </p>
              <Button
                asChild
                className="mt-4 h-11 w-full rounded-full bg-gold text-white hover:bg-gold-hover"
              >
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>

            <div className="mt-6 flex gap-4">
              <a
                aria-label="Instagram"
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#333333] text-[#888888] hover:border-gold hover:text-gold"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                aria-label="Facebook"
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#333333] text-[#888888] hover:border-gold hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                aria-label="Telegram"
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#333333] text-[#888888] hover:border-gold hover:text-gold"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                aria-label="WhatsApp"
                href="https://wa.me/6281282175856"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#333333] text-[#888888] hover:border-gold hover:text-gold"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#222222] pt-8 text-center text-[13px] text-[#555555]">
          © 2025 Havana Wellness — Merlynn Park Hotel Jakarta
        </div>
      </div>
    </footer>
  );
}
