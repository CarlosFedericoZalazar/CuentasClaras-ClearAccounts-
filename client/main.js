import { loginUser } from "./js/api.js";
import { validationFormatPass } from "./js/validaciones.js"

const DOM = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    btnIngresar: document.getElementById("ingresarBtn"),
    form: document.getElementById("form-login"),
    boton: document.getElementById("ingresarBtn")
}


DOM.form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const resultado = validationFormatPass(DOM.password.value);

    loginUser(DOM.email.value, DOM.password.value);

    console.log("Resultado:", resultado);
});



