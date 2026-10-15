import { registrarUsuarioService, verificarUsuarioService, loginUserService } from "../service/user.service.js";
import { generarToken, enviarEmailVerificacion, verificarToken } from "../tools/resend.mail.js";

export const registerUser = async (req, res) => {
  try {
    const { name, last_name, email, password } = req.body;
    const user = await registrarUsuarioService({
      name,
      last_name,
      email,
      password,
    });
    console.log("USUARIO CREADO:", user)

    const token = generarToken(user); // Generar el token de verificación
    await enviarEmailVerificacion(email, token);

    res.status(201).json({ message: "User registered successfully desde Controller" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const { data, error } = await loginUserService(email, password);

    if (error || !data?.session) {
      console.log("Error de login:", error?.message);
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.status(200).json({
      message: "User logged in successfully",
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.display_name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).send("<h1>❌ Error: Token no proporcionado</h1>");
  }

  // 1. Verificar el token usando la función que creaste (o jwt.verify directo)
  const decoded = verificarToken(token);

  if (!decoded) {
    return res.status(400).send(`
      <h1>❌ Enlace inválido o expirado</h1>
      <p>El token de verificación ya expiró o no es válido.</p>
    `);
  }

  try {
    // 2. Buscar al usuario por el ID que viene dentro del token y actualizar su estado a verificado en la BD
    // (Asumiendo que tenés una función en tu service para esto, ej: verificarUsuarioService)
    console.log(`Usuario con ID ${decoded.userId}.`);
    await verificarUsuarioService(decoded.userId);

    res.send(`
      <h1>✅ ¡Cuenta verificada con éxito!</h1>
      <p>Tu cuenta ya está activa. ¡Ahora puedes iniciar sesión!</p>
    `);
  } catch (error) {
    res.status(500).send(`
      <h1>❌ Error del servidor</h1>
      <p>No se pudo verificar la cuenta: ${error.message}</p>
    `);
  }
};