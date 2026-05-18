"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TimeSlot } from "@/lib/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function TimeSlotPicker({
  facilitySlug,
  value,
  onChange,
}: {
  facilitySlug: string;
  value: string;
  onChange: (slot: string) => void;
}) {
  const [slots, setSlots] = React.useState<TimeSlot[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!facilitySlug) return;
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const supabase = getSupabaseBrowserClient();
        const { data } = await supabase
          .from("time_slots")
          .select("*")
          .eq("facility_slug", facilitySlug)
          .order("slot_time", { ascending: true });
        if (!cancelled) setSlots((data ?? []) as TimeSlot[]);
      } catch {
        if (!cancelled) setSlots([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [facilitySlug]);

  if (!facilitySlug) {
    return <div className="text-sm text-(--havana-cream)/60">Select a facility first.</div>;
  }

  if (loading) {
    return <div className="text-sm text-(--havana-cream)/60">Loading time slots…</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((s) => {
        const available = s.is_available !== false;
        const selected = value === s.slot_time;
        return (
          <button
            key={s.id}
            type="button"
            disabled={!available}
            onClick={() => available && onChange(s.slot_time)}
            className={cn(
              "min-h-[44px] rounded-full border px-4 py-2 text-sm",
              selected
                ? "border-(--havana-gold) bg-(--havana-gold) text-black"
                : "border-(--havana-gold)/45 text-(--havana-cream) hover:bg-white/5",
              !available && "opacity-40 line-through"
            )}
          >
            {s.slot_label} · {s.slot_time}
          </button>
        );
      })}
      {slots.length === 0 ? (
        <div className="text-sm text-(--havana-cream)/60">No time slots found.</div>
      ) : null}
    </div>
  );
}
