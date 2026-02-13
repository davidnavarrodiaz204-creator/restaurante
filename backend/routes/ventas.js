const express = require('express');
const router = express.Router();

const Venta = require('../models/Venta');
const Pedido = require('../models/Pedido');


// REGISTRAR UNA VENTA
router.post('/', async (req, res) => {
  try {
    const { pedidoId, metodoPago } = req.body;

    // 1. Buscar pedido
    const pedido = await Pedido.findById(pedidoId);

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    // 2. Crear venta
    const venta = new Venta({
      pedido: pedido._id,
      total: pedido.total,
      metodoPago
    });

    await venta.save();

    res.json({
      mensaje: 'Venta registrada correctamente',
      venta
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar la venta' });
  }
});

// 🔹 REPORTE (VA PRIMERO)
router.get('/reporte', async (req, res) => {
  try {
    const { desde, hasta } = req.query;

    if (!desde || !hasta) {
      return res.status(400).json({ mensaje: 'Debe enviar desde y hasta' });
    }

    const fechaDesde = new Date(desde);
    fechaDesde.setHours(0, 0, 0, 0);

    const fechaHasta = new Date(hasta);
    fechaHasta.setHours(23, 59, 59, 999);

    const ventas = await Venta.find({
      fecha: { $gte: fechaDesde, $lte: fechaHasta },
      estado: 'PAGADO'
    });

    let total = 0;
    ventas.forEach(v => total += v.total);

    res.json({
      cantidadVentas: ventas.length,
      total,
      ventas
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error en reporte' });
  }
});


// 🔹 HISTORIAL (VA DESPUÉS)
router.get('/', async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('pedido')
      .sort({ fecha: -1 });

    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas' });
  }
});




module.exports = router;
