import { passwordsCoinciden } from './validaciones.js';
import {mostrarExito, mostrarError} from './notificaciones.js';
import { registrarUsuario } from './api.js';

export function activarMostrarPassword(boton, campo) {
  boton.addEventListener('click', () => {
    const visible = campo.type === 'text';
    campo.type = visible ? 'password' : 'text';
    boton.textContent = visible ? '👁️' : '👁️⃠';
  });
}

export function activarRegistro(form, DOM) {

  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = {
      name: DOM.name.value,
      last_name: DOM.lastName.value,
      email: DOM.email.value,
      password: DOM.password.value
    };

    console.log(usuario);

    console.log(usuario.password);
    console.log(DOM.passwordConfirm.value);

    if (!passwordsCoinciden(usuario.password, DOM.passwordConfirm.value)) {
      alert('Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.');
      return;
    }

    try {
      const respuestaServidor = await registrarUsuario(usuario);
      mostrarExito(respuestaServidor.message); 

      setTimeout(() => {
          window.location.href = './index.html';
      }, 2000);
    } catch (error) {
      mostrarError('Error al registrar el usuario. Por favor, intenta nuevamente.');
      console.error('Error al registrar el usuario:', error.message);
    }
  });
}

