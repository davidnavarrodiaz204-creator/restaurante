const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true
  },

  total: {
    type: Number,
    required: true
  },

  metodoPago: {
    type: String,
    enum: ['EFECTIVO', 'TARJETA', 'YAPE', 'PLIN'],
    required: true
  },

  fecha: {
    type: Date,
    default: Date.now
  },

  estado: {
    type: String,
    enum: ['PAGADO', 'ANULADO'],
    default: 'PAGADO'
  }
});

module.exports = mongoose.model('Venta', VentaSchema);
