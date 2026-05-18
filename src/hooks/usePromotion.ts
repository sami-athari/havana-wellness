"use client";

import * as React from "react";
import type { Promotion } from "@/lib/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const DISMISS_KEY = "havana_promo_dismissed";

export function usePromotion() {
  const [promotion, setPromotion] = React.useState<Promotion | null>(null);
  const [showPopup, setShowPopup] = React.useState(false);

  React.useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (dismissed === "1") return;

    let timeout: number | undefined;
    let cancelled = false;

    async function run() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("promotions")
          .select("*")
          .eq("is_active", true)
          .eq("is_popup", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) return;
        if (cancelled) return;

        if (data) {
          setPromotion(data as Promotion);
          timeout = window.setTimeout(() => {
            if (!cancelled) setShowPopup(true);
          }, 1500);
        }
      } catch {
        // Ignore when env vars aren't set yet.
      }
    }

    void run();

    return () => {
      cancelled = true;
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  const dismissPopup = React.useCallback(() => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setShowPopup(false);
  }, []);

  return { promotion, showPopup, dismissPopup };
}
