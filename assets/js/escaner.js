let escaner = null;      // instancia de la cámara
let ultimoCodigo = "";   // evita registrar el mismo QR muchas veces seguidas

// Muestra el nombre del usuario que inició sesión
$("nombreUsuario").textContent = sessionStorage.getItem("usuario");

// Enciende la cámara trasera y llama a registrar() cada vez que lee un QR
async function encenderCamara() {
  escaner = new Html5Qrcode("lector");
  try {
    await escaner.start(
      { facingMode: "environment" },   // cámara trasera
      { fps: 10, qrbox: 220 },         // 10 lecturas por segundo, recuadro de 220px
      registrar
    );
  } catch (err) {
    mostrarMensaje("No se pudo abrir la cámara. Usa el registro manual.", true);
  }
}

// Recibe el texto del QR (el nombre del colaborador) y marca entrada o salida
function registrar(texto) {
  const nombre = texto.trim();
  if (!nombre || nombre === ultimoCodigo) return;      // ignora vacíos y lecturas repetidas
  ultimoCodigo = nombre;
  setTimeout(() => (ultimoCodigo = ""), 4000);         // permite volver a leerlo tras 4 seg

  const lista = leerRegistros();
  // Busca si el colaborador ya entró hoy y aún no tiene salida
  const abierto = lista.find(r => r.nombre === nombre && r.fecha === hoy() && !r.salida);

  if (abierto) {
    abierto.salida = horaActual();                     // segundo escaneo = salida
    mostrarMensaje(`Salida registrada: ${nombre}`);
  } else {
    lista.push({ nombre, fecha: hoy(), entrada: horaActual(), salida: "" }); // primer escaneo = entrada
    mostrarMensaje(`Entrada registrada: ${nombre}`);
  }
  guardarRegistros(lista);
}

// Plan B: usa la misma función que el escáner
$("btnManual").addEventListener("click", () => {
  registrar($("manual").value);
  $("manual").value = "";
});

// Mensaje de confirmación (verde) o error (rojo)
function mostrarMensaje(texto, esError = false) {
  $("mensaje").textContent = texto;
  $("mensaje").style.color = esError ? "#ffb4b4" : "#b8ffcf";
}

// Arranca la cámara al abrir la página
encenderCamara();