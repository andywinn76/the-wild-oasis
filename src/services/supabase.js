import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = 'https://mnaxolrticxeqqyrczk.supabase.co'
export const supabaseUrl = "https://smnaxolrticxeqqyrczk.supabase.co";

// const supabaseKey = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbmF4b2xydGljeGVxcXlyY3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MTUwMTEsImV4cCI6MjA0OTA5MTAxMX0.mDUR5TxDYlc8sLYsKveYAu980k-FfDcoaplwQK3_dlw"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbmF4b2xydGljeGVxcXlyY3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MTUwMTEsImV4cCI6MjA0OTA5MTAxMX0.mDUR5TxDYlc8sLYsKveYAu980k-FfDcoaplwQK3_dlw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
