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
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 60 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            aria-label="Dismiss promotion"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissPopup}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-[90vw] overflow-hidden rounded-3xl bg-white p-8 text-[#111111] shadow-2xl"
            style={{ maxWidth: 440 }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={dismissPopup}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F5] text-[#666666] hover:bg-[#EEEEEE]"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="mb-4 inline-flex rounded-full bg-gold/10 px-4 py-2 text-[11px] tracking-widest text-gold">
                {(promotion.badge_text ?? "LIMITED OFFER").toUpperCase()}
              </div>

              <h2 className="font-display text-[36px] text-[#111111]">
                {promotion.title}
              </h2>
              {promotion.subtitle ? (
                <p className="mt-2 text-[15px] text-[#555555]">
                  {promotion.subtitle}
                </p>
              ) : null}

              {promotion.description ? (
                <p className="mt-4 text-[15px] leading-relaxed text-[#555555]">
                  {promotion.description}
                </p>
              ) : null}

              {promotion.promo_code ? (
                <div className="mt-5 rounded-xl border border-dashed border-gold bg-[#F8F7F4] p-4 text-center">
                  <div className="text-[11px] uppercase tracking-widest text-[#999999]">PROMO CODE</div>
                  <div className="mt-1 font-mono text-[22px] font-bold text-gold">
                    {promotion.promo_code}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 w-full rounded-xl bg-gold text-white hover:bg-gold-hover"
                >
                  <Link href={promotion.cta_link ?? "/booking"} onClick={dismissPopup}>
                    {promotion.cta_text ?? "Book Now"}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-xl border-[#E5E2DC] bg-white text-[#111111] hover:bg-[#F8F7F4]"
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
