import { createClient } from '@supabase/supabase-js'

// 1. clave pública (publishable) - Úsalo en tu front-end para operaciones normales de lectura/escritura
const supabaseAuth  = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

// 2. clave de servicio (service_role) - Úsalo en tu userService para registrar usuarios, saltarte el RLS, etc.
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export { supabaseAuth , supabaseAdmin }