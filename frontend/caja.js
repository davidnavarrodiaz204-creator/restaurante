function cerrarCaja() {
  fetch('http://localhost:3000/api/caja/cerrar', {
    method: 'POST'
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('resultado').textContent =
        JSON.stringify(data, null, 2);
    });
}
