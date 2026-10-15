/* Código compartido por todas las páginas */

// Atajo para no repetir document.getElementById
const $ = (id) => document.getElementById(id);

// Clave bajo la que se guardan los registros en el navegador
const LLAVE_REGISTROS = "asistencia";

// Lee los registros guardados (si no hay, devuelve lista vacía)
function leerRegistros() {
  return JSON.parse(localStorage.getItem(LLAVE_REGISTROS) || "[]");
}

// Guarda la lista completa de registros
function guardarRegistros(lista) {
  localStorage.setItem(LLAVE_REGISTROS, JSON.stringify(lista));
}

// Hora actual en formato 08:35
function horaActual() {
  return new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
}

// Fecha de hoy, para distinguir asistencias de distintos días
function hoy() {
  return new Date().toLocaleDateString("es-PE");
}

// Protección: si la página es privada y no hay sesión, vuelve al login
if (document.body.dataset.protegida === "si" && !sessionStorage.getItem("usuario")) {
  location.href = "index.html";
}

// Botón ☰: abre y cierra el menú (solo existe en escaner y asistencia)
document.querySelectorAll(".btnMenu").forEach(b =>
  b.addEventListener("click", () => $("menu").classList.toggle("oculto"))
);

// Cerrar sesión: borra la sesión y vuelve al login
if ($("btnSalir")) {
  $("btnSalir").addEventListener("click", () => {
    sessionStorage.removeItem("usuario");
    location.href = "index.html";
  });
}