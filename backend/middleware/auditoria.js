const Auditoria = require('../models/Auditoria');

const registrarAuditoria = (accion, modulo) => {
  return async (req, res, next) => {
    try {
      await Auditoria.create({
        usuario: req.usuario.id,   // viene del middleware de auth
        accion,
        modulo,
        detalle: JSON.stringify(req.body),
        ip: req.ip
      });
    } catch (error) {
      console.error('Error auditoría:', error.message);
    }
    next();
  };
};

module.exports = registrarAuditoria;
