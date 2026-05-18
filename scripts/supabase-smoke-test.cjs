/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

function readEnvFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    env[key] = value;
  }
  return env;
}

async function main() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("Missing .env.local");
    process.exit(1);
  }

  const env = readEnvFile(envPath);
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
    process.exit(1);
  }

  if (url.includes("/rest/v1")) {
    console.error("NEXT_PUBLIC_SUPABASE_URL should be the base project URL, not /rest/v1");
    console.error("Example: https://<ref>.supabase.co");
    process.exit(1);
  }

  const { createClient } = require("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const tables = ["facilities", "time_slots", "promotions", "bookings"];
  console.log("Supabase URL:", url);
  console.log("Checking tables:", tables.join(", "));

  for (const table of tables) {
    const { error } = await supabase.from(table).select("*").limit(1);
    if (error) {
      console.error(`FAIL ${table}:`, error.message);
      if (error.code) console.error(`  code: ${error.code}`);

      if (error.code === "PGRST205") {
        console.error("\nThis usually means one of these:");
        console.error("1) The schema SQL did not run successfully (often missing pgcrypto for gen_random_uuid()).");
        console.error("2) The table exists, but anon/authenticated roles lack GRANT privileges (PostgREST hides it).");
        console.error("3) PostgREST schema cache needs reload.");
        console.error("\nRun this in Supabase SQL Editor (then retry):\n");
        console.error(
          [
            "CREATE EXTENSION IF NOT EXISTS pgcrypto;",
            "GRANT USAGE ON SCHEMA public TO anon, authenticated;",
            "GRANT SELECT ON public.facilities, public.time_slots, public.promotions, public.bookings TO anon, authenticated;",
            "GRANT INSERT ON public.bookings TO anon, authenticated;",
            "ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS promo_code TEXT;",
            "NOTIFY pgrst, 'reload schema';",
          ].join("\n")
        );
      }

      process.exit(2);
    }
    console.log(`OK   ${table}`);
  }

  console.log("All good.");
}

main().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(3);
});
