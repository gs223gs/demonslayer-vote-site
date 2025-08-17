import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createAnonClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }
  
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: globalThis.fetch,
    },
  });
}