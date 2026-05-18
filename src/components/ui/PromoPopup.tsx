"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePromotion } from "@/hooks/usePromotion";
import { Button } from "@/components/ui/button";

export function PromoPopup() {
  const { promotion, showPopup, dismissPopup } = usePromotion();

  if (!promotion) return null;

  return (
    <AnimatePresence>
      {showPopup ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            aria-label="Dismiss promotion"
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissPopup}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-(--havana-gold) bg-(--havana-charcoal) text-(--havana-cream) shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={dismissPopup}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-(--havana-cream) hover:bg-black/30"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="mb-4 inline-flex rounded-full border border-(--havana-gold) bg-black/20 px-3 py-1 text-xs tracking-widest text-(--havana-gold)">
                {(promotion.badge_text ?? "LIMITED OFFER").toUpperCase()}
              </div>

              <h2 className="text-3xl sm:text-4xl font-display text-(--havana-ivory)">
                {promotion.title}
              </h2>
              {promotion.subtitle ? (
                <p className="mt-2 text-sm tracking-wide text-(--havana-gold)">
                  {promotion.subtitle}
                </p>
              ) : null}

              {promotion.description ? (
                <p className="mt-4 text-sm leading-relaxed text-(--havana-cream)/80">
                  {promotion.description}
                </p>
              ) : null}

              {promotion.promo_code ? (
                <div className="mt-6 rounded-xl bg-(--havana-gold) p-4 text-center text-black">
                  <div className="text-xs tracking-widest">PROMO CODE</div>
                  <div className="mt-1 font-mono text-2xl font-semibold">
                    {promotion.promo_code}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 w-full bg-(--havana-gold) text-black hover:bg-(--havana-gold-light)"
                >
                  <Link href={promotion.cta_link ?? "/booking"} onClick={dismissPopup}>
                    {promotion.cta_text ?? "Book Now"}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full border-white/15 bg-transparent text-(--havana-cream) hover:bg-white/5"
                  onClick={dismissPopup}
                >
                  Maybe later
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
