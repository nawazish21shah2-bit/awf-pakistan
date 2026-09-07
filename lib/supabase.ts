import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jgglinfqwodsmtodsqus.supabase.co";
const DEFAULT_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZ2xpbmZxd29kc210b2RzcXVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDM2NDM2MywiZXhwIjoyMDk5OTQwMzYzfQ.cJvI40bM1qF-xkTNOtS2zBYl2EzH9n92BJCPepsDeE4";

const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  DEFAULT_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabase = createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

