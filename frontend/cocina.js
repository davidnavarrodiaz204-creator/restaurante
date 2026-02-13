const contenedor = document.getElementById('pedidos');

function cargarPedidos() {
  fetch('http://localhost:3000/api/pedidos')
    .then(res => res.json())
    .then(pedidos => {
      contenedor.innerHTML = '';

      pedidos.forEach(pedido => {
        if (pedido.estado === 'pagado') return;

        const div = document.createElement('div');
        div.classList.add('pedido', pedido.estado);

        div.innerHTML = `
          <h3>Mesa ${pedido.mesa}</h3>
          <ul>
            ${pedido.productos.map(p =>
              `<li>${p.producto.nombre} x ${p.cantidad}</li>`
            ).join('')}
          </ul>
          <strong>Total: S/ ${pedido.total}</strong><br>
          <em>Estado: ${pedido.estado}</em><br>
          ${botonEstado(pedido)}
        `;

        contenedor.appendChild(div);
      });
    });
}

function botonEstado(pedido) {
  if (pedido.estado === 'pendiente')
    return `<button onclick="cambiarEstado('${pedido._id}', 'preparando')">Preparar</button>`;

  if (pedido.estado === 'preparando')
    return `<button onclick="cambiarEstado('${pedido._id}', 'listo')">Listo</button>`;

  return '';
}

function cambiarEstado(id, estado) {
  fetch(`http://localhost:3000/api/pedidos/${id}/estado`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado })
  }).then(() => cargarPedidos());
}

cargarPedidos();
setInterval(cargarPedidos, 5000);
