module.exports = (rolPermitido) => {
  return (req, res, next) => {

    if (!req.usuario || !req.usuario.rol) {
      return res.status(403).json({ msg: 'Acceso denegado' });
    }

    if (req.usuario.rol !== rolPermitido) {
      return res.status(403).json({
        msg: 'No tienes permisos para esta acción'
      });
    }

    next();
  };
};
