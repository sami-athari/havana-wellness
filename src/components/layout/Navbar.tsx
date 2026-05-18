"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pool", label: "Pool" },
  { href: "/spa", label: "Spa" },
  { href: "/gym", label: "Gym" },
  { href: "/bbq", label: "BBQ Terrace" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-colors"
      )}
      animate={{
        backgroundColor: scrolled ? "rgba(26,26,26,0.75)" : "rgba(0,0,0,0)",
        backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
        borderBottomColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.25 }}
      style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-xl font-bold tracking-wide text-(--havana-gold)">
            HAVANA
          </span>
          <span className="mt-0.5 text-[10px] tracking-[0.25em] text-(--havana-cream)/80">
            WELLNESS
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative text-sm tracking-wide text-(--havana-cream)/80 hover:text-(--havana-cream)",
                  active && "text-(--havana-cream)"
                )}
              >
                {l.label}
                {active ? (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-(--havana-gold)" />
                ) : null}
              </Link>
            );
          })}
          <Button
            asChild
            className="h-10 bg-(--havana-gold) px-5 text-black hover:bg-(--havana-gold-light)"
          >
            <Link href="/booking">Book Now</Link>
          </Button>
        </nav>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-(--havana-cream) md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full bg-(--havana-black) px-6 pt-10">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
                className="flex flex-col gap-6"
              >
                {[...navLinks, { href: "/booking", label: "Book Now" }].map((l) => (
                  <motion.div
                    key={l.href}
                    variants={{ hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0 } }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block text-2xl font-display tracking-wide text-(--havana-cream)"
                    >
                      <span className={cn(l.href === "/booking" && "text-(--havana-gold)")}>{l.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
