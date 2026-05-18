"use client";

import * as React from "react";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePicker({
  value,
  onChange,
}: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}) {
  const today = new Date();
  const min = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const max = addDays(today, 90);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-12 w-full justify-start border-white/15 bg-transparent text-left font-normal text-(--havana-cream)",
            !value && "text-(--havana-cream)/50"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-(--havana-gold)" />
          {value ? format(value, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-white/10 bg-(--havana-charcoal) p-0 text-(--havana-cream)">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) => date < min || date > max}
        />
      </PopoverContent>
    </Popover>
  );
}
