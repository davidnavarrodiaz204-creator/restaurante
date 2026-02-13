function generarReporte() {
  const desde = document.getElementById('desde').value;
  const hasta = document.getElementById('hasta').value;

  fetch(`http://localhost:3000/api/ventas/reporte?desde=${desde}&hasta=${hasta}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('reporte').textContent =
        JSON.stringify(data, null, 2);
    });
}
