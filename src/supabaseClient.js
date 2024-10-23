// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uvzrxforqipdtbdcwxvx.supabase.co'; // Reemplaza con tu URL de Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2enJ4Zm9ycWlwZHRiZGN3eHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzkxMDUsImV4cCI6MjA0NTIxNTEwNX0.F6219fMH56lgymUYBijDEbB148A8P-TMCLdyYOeM1os'; // Reemplaza con tu anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
