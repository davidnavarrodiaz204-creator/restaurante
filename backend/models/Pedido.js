const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  mesa: {
    type: Number,
    required: true
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    default: 0
  },
  estado: {
    type: String,
    enum: ['pendiente', 'proceso', 'listo', 'entregado'],
    default: 'pendiente'
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
