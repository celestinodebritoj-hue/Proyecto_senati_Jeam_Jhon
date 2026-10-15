// Lupa: muestra u oculta el buscador
$("btnLupa").addEventListener("click", () => {
  $("buscador").classList.toggle("oculto");
  $("buscador").focus();
});

// Cada letra escrita vuelve a filtrar la tabla
$("buscador").addEventListener("input", dibujarTabla);

function dibujarTabla() {
  const filtro = $("buscador").value.toLowerCase();
  const filas = leerRegistros().filter(r => r.nombre.toLowerCase().includes(filtro));
  const cuerpo = $("cuerpoTabla");
  cuerpo.innerHTML = "";

  // Si no hay datos, muestra un aviso en vez de una tabla vacía
  if (!filas.length) {
    cuerpo.innerHTML = '<tr><td colspan="3" class="vacio">Sin registros</td></tr>';
    return;
  }

  filas.forEach(r => {
    const tr = document.createElement("tr");
    // textContent (no innerHTML) para que un nombre raro no inserte código en la página
    [r.nombre, r.entrada, r.salida || "—"].forEach(valor => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });
    cuerpo.appendChild(tr);
  });
}

// Dibuja la tabla al abrir la página
dibujarTabla();