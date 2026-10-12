export function mostrarError(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: { background: "#e74c3c" }
  }).showToast();
}

export function mostrarExito(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: { background: "#2ecc71" }
  }).showToast();
}