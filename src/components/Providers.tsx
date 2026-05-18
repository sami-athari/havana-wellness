"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { PromoPopup } from "@/components/ui/PromoPopup";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
      <PromoPopup />
      <Toaster richColors theme="dark" />
    </ThemeProvider>
  );
}
