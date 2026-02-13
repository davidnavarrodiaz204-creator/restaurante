fetch('http://localhost:3000/api/ventas')
  .then(res => res.json())
  .then(ventas => {
    const tabla = document.getElementById('tablaVentas');

    ventas.forEach(v => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${new Date(v.fecha).toLocaleString()}</td>
        <td>S/ ${v.total}</td>
        <td>${v.metodoPago}</td>
      `;
      tabla.appendChild(tr);
    });
  });
