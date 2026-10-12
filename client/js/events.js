import { passwordsCoinciden } from './validaciones.js';
import {mostrarExito} from './notificaciones.js';

export function activarMostrarPassword(boton, campo) {
  boton.addEventListener('click', () => {
    const visible = campo.type === 'text';
    campo.type = visible ? 'password' : 'text';
    boton.textContent = visible ? '👁️' : '👁️⃠';
  });
}

export function activarRegistro(form, DOM) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!passwordsCoinciden(DOM.password.value, DOM.passwordConfirm.value)) {
      alert('Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.');
      return;
    }
    mostrarExito('Registro exitoso.'); 
  });
}