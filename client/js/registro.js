import { activarMostrarPassword, activarRegistro } from './events.js';

const DOM = {
    form: document.getElementById('registerForm'),
    name: document.getElementById('name'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    passwordConfirm: document.getElementById('password-confirm'),
    registerBtn: document.getElementById('registerBtn'),
    togglePassword: document.getElementById('togglePassword'),
    togglePasswordConfirm: document.getElementById('togglePasswordConfirm')
};

activarMostrarPassword(DOM.togglePassword, DOM.password);
activarMostrarPassword(DOM.togglePasswordConfirm, DOM.passwordConfirm);
activarRegistro(DOM.form, DOM);


