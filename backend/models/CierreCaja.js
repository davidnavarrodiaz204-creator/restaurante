const mongoose = require('mongoose');

const CierreCajaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now
  },

  totalGeneral: {
    type: Number,
    required: true
  },

  efectivo: {
    type: Number,
    default: 0
  },

  tarjeta: {
    type: Number,
    default: 0
  },

  yape: {
    type: Number,
    default: 0
  },

  plin: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('CierreCaja', CierreCajaSchema);
