import { supabaseAdmin } from '../db/supabase.js'

export async function registrarUsuarioService({ name, last_name, email, password }) {
  // Aquí usamos supabaseAdmin para tener superpoderes de backend
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: false, // Para manejar tu verificación por Resend
    user_metadata: {
      display_name: `${name} ${last_name}`
    }
  })

  if (authError) throw new Error(authError.message)

  const userId = authData.user.id

  // Insertar en la tabla local de usuarios
  const { error: dbError } = await supabaseAdmin
    .from('usuarios')
    .insert([{ id: userId, name, last_name, email, is_verified: false }])

  if (dbError) throw new Error(dbError.message)

  return { userId, message: 'Usuario creado exitosamente en el backend' }
}