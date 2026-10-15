
const API_BASE_URL = 'http://localhost:3000/';

export const registrarUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_BASE_URL}api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) {
        throw new Error(`Error al registrar el usuario. ${response.message || 'Error desconocido'}`);

    }
    return await response.json();
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const respuestaServidor = await fetch(`${API_BASE_URL}api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await respuestaServidor.json();

    if (!respuestaServidor.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }
    console.log(data);
    localStorage.setItem("token", data.token);
    return data;
  } catch (e) {
    console.error("Error al iniciar sesión:", e);
    throw e;
  }
};