const jwt = require('jsonwebtoken');

const verificarToken = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ msg: 'Sin token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;

      if (roles.length && !roles.includes(decoded.rol)) {
        return res.status(403).json({ msg: 'Sin permisos' });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token inválido' });
    }
  };
};

module.exports = verificarToken;
