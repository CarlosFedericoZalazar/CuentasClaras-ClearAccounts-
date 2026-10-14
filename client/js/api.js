
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

