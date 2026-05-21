"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pool", label: "Pool" },
  { href: "/spa", label: "Spa" },
  { href: "/gym", label: "Gym" },
  { href: "/bbq", label: "BBQ" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <motion.header className="fixed left-0 right-0 top-0 z-50 border-b border-[#F0EDE8] bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:h-16 lg:px-10">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-[22px] font-bold tracking-tight text-[#111111]">
            HAVANA
          </span>
          <span className="mt-0.5 text-[10px] tracking-[0.25em] text-[#999999]">
            WELLNESS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "border-b-2 border-transparent pb-0.5 text-[14px] font-medium text-[#333333] transition-colors hover:text-gold",
                  active && "border-gold font-semibold text-[#111111]"
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <Button
            asChild
            className="h-auto rounded-full bg-gold px-6 py-2.5 text-[14px] font-medium text-white hover:bg-gold-hover"
          >
            <Link href="/booking">Book Now</Link>
          </Button>
        </nav>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#111111] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-white md:hidden"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full flex-col bg-white px-6 pb-8 pt-4">
              <div className="flex items-start justify-end">
                <button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F5F5] text-[#111111]"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                className="mt-10 flex flex-1 flex-col items-center justify-center gap-6 text-center"
              >
                {navLinks.map((l) => (
                  <motion.div key={l.href} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-3xl text-[#111111]"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <Button asChild className="mt-6 w-full rounded-full bg-gold py-3 text-[14px] font-medium text-white hover:bg-gold-hover">
                <Link href="/booking" onClick={() => setOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
