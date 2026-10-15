// Usuarios permitidos (para la demo). Clave = correo.
const USUARIOS = {
  "jhonatan@gmail.com": { clave: "1234", nombre: "Jhonatan Edimar Celestino De Brito" }
};

// Si ya hay sesión abierta, salta directo al escáner
if (sessionStorage.getItem("usuario")) location.href = "escaner.html";

$("formLogin").addEventListener("submit", (e) => {
  e.preventDefault();                                  // evita que la página se recargue
  const usuario = USUARIOS[$("correo").value.trim().toLowerCase()];

  if (usuario && usuario.clave === $("clave").value) {
    sessionStorage.setItem("usuario", usuario.nombre); // recuerda la sesión mientras la pestaña esté abierta
    location.href = "escaner.html";
  } else {
    $("errorLogin").textContent = "Correo o contraseña incorrectos.";
  }
});