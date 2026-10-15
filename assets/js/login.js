// Usuarios permitidos (para la demo). Clave = correo.
const USUARIOS = {
    "jhonatan@gmail.com": { clave: "1234", nombre: "Jhonatan Edimar Celestino De Brito" }
};

// Si ya hay sesión abierta, salta directo al escáner
if (sessionStorage.getItem("usuario")) {
    location.href = "escaner-Cel.html";
}

document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault(); // evita que la página se recargue
    
    const correoInput = document.getElementById("correo").value.trim().toLowerCase();
    const claveInput = document.getElementById("clave").value;
    
    const usuario = USUARIOS[correoInput];

    if (usuario && usuario.clave === claveInput) {
        sessionStorage.setItem("usuario", usuario.nombre); // recuerda la sesión mientras la pestaña esté abierta
        location.href = "escaner-Cel.html";
    } else {
        document.getElementById("errorLogin").textContent = "Correo o contraseña incorrectos.";
    }
});