import jwt from "jsonwebtoken";
import { Resend } from "resend";

const JWT_SECRET = "clave_secreta_de_prueba_123";

const resend = new Resend(process.env.RESEND_API_KEY);

export const generarToken = (nuevoUsuario) => {
  // 2. Generar el JWT firmado
  const token = jwt.sign(
    { userId: nuevoUsuario.userId},
    JWT_SECRET,
    { expiresIn: "5m" }, // Caduca en 5 minutos
  );
  return token;
}

export const enviarEmailVerificacion = async (email, token) => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const urlVerificacion = `${baseUrl}/api/auth/verify?token=${token}`;
  try {
    // 4. ¡ENVIAR EL MAIL DE VERDAD!
    await resend.emails.send({
      from: "onboarding@resend.dev", // Resend te da este remitente por defecto para pruebas
      to: email, // El correo que mandó el usuario en Postman
      subject: "Confirma tu cuenta en Mi App",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>¡Bienvenido!</h2>
          <p>Estás a un paso de activar tu cuenta. Haz clic en el siguiente botón para confirmar tu correo:</p>
          <a href="${urlVerificacion}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verificar mi cuenta</a>
          <p>O copia y pega este enlace en tu navegador:</p>
          <p>${urlVerificacion}</p>
          <p><small>Este enlace expira en 15 minutos.</small></p>
        </div>
      `,
    });

    console.log(`✅ E-mail real enviado exitosamente a: ${email}`);
  } catch (error) {
    console.error(`❌ Error al enviar el e-mail a ${email}:`, error);
  }
}

export const verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token verificado correctamente:", decoded);
    return decoded; // Retorna el payload decodificado si es válido
  }
    catch (error) {
    console.error("Error al verificar el token:", error);
    return null; // Retorna null si el token no es válido o ha expirado
  }
}