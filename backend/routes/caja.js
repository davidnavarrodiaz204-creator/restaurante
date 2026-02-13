const express = require('express');
const router = express.Router();

const Venta = require('../models/Venta');
const CierreCaja = require('../models/CierreCaja');

// CERRAR CAJA
router.post('/cerrar', async (req, res) => {
  try {
    // Obtener ventas del día
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);

    const finDia = new Date();
    finDia.setHours(23, 59, 59, 999);

    const ventas = await Venta.find({
      fecha: { $gte: inicioDia, $lte: finDia },
      estado: 'PAGADO'
    });

    let totalGeneral = 0;
    let efectivo = 0;
    let tarjeta = 0;
    let yape = 0;
    let plin = 0;

    ventas.forEach(v => {
      totalGeneral += v.total;

      if (v.metodoPago === 'EFECTIVO') efectivo += v.total;
      if (v.metodoPago === 'TARJETA') tarjeta += v.total;
      if (v.metodoPago === 'YAPE') yape += v.total;
      if (v.metodoPago === 'PLIN') plin += v.total;
    });

    const cierre = new CierreCaja({
      totalGeneral,
      efectivo,
      tarjeta,
      yape,
      plin
    });

    await cierre.save();

    res.json({
      mensaje: 'Caja cerrada correctamente',
      cierre
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al cerrar caja' });
  }
});

module.exports = router;
