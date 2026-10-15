import { supabaseAdmin, supabaseAuth } from '../db/supabase.js'

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

export const verificarUsuarioService = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from('usuarios')
    .update({ is_verified: true })
    .eq('id', userId);

  if (error) throw new Error(error.message);

  // Marca el email como confirmado también en auth.users
  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    email_confirm: true,
  });
  if (authError) throw new Error(authError.message);

  return data;
};

export const loginUserService = async (email, password) => {
  const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password });
  return { data, error };
};