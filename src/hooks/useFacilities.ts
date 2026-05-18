"use client";

import * as React from "react";
import type { Facility } from "@/lib/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function useFacilities() {
  const [facilities, setFacilities] = React.useState<Facility[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("facilities")
          .select("*")
          .eq("is_active", true)
          .order("name", { ascending: true });
        if (error) throw error;
        if (!cancelled) setFacilities((data ?? []) as Facility[]);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load facilities");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { facilities, loading, error };
}

export function useFacility(slug: string) {
  const [facility, setFacility] = React.useState<Facility | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("facilities")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();
        if (error) throw error;
        if (!cancelled) setFacility((data ?? null) as Facility | null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load facility");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { facility, loading, error };
}
