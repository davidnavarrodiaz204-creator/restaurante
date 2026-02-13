const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');

// Crear pedido
router.post('/', async (req, res) => {
  try {
    const { mesa, productos } = req.body;

    let total = 0;

    for (let item of productos) {
      const prod = await Producto.findById(item.producto);
      if (!prod) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      total += prod.precio * item.cantidad;
    }

    const pedido = new Pedido({
      mesa,
      productos,
      total
    });

    await pedido.save();
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener pedidos
router.get('/', async (req, res) => {
  const pedidos = await Pedido.find()
    .populate('productos.producto');
  res.json(pedidos);
});

// Cambiar estado
router.put('/:id/estado', async (req, res) => {
  const { estado } = req.body;
  const pedido = await Pedido.findByIdAndUpdate(
    req.params.id,
    { estado },
    { new: true }
  );
  res.json(pedido);
});

module.exports = router;
