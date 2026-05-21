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
            "h-12 w-full justify-start rounded-xl border-[#E5E2DC] bg-white text-left font-normal text-[#111111]",
            !value && "text-[#999999]"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
          {value ? format(value, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-[#E5E2DC] bg-white p-0 text-[#111111] shadow-lg">
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
