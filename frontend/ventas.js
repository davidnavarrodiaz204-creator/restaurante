function cargarVentas() {
  fetch('http://localhost:3000/api/ventas/hoy')
    .then(res => res.json())
    .then(ventas => {
      const lista = document.getElementById('listaVentas');
      const totalSpan = document.getElementById('total');

      lista.innerHTML = '';
      let total = 0;

      ventas.forEach(v => {
        total += v.total;

        const li = document.createElement('li');
        li.textContent = `S/ ${v.total} - ${v.metodoPago}`;
        lista.appendChild(li);
      });

      totalSpan.textContent = total.toFixed(2);
    });
}
