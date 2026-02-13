const mongoose = require('mongoose');

const auditoriaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  accion: {
    type: String,
    required: true
  },
  modulo: {
    type: String,
    required: true
  },
  detalle: {
    type: String
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String
  }
});

module.exports = mongoose.model('Auditoria', auditoriaSchema);
