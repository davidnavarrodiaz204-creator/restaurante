const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  const user = await Usuario.findOne({ usuario });
  if (!user) return res.status(400).json({ msg: 'Usuario no existe' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: 'Contraseña incorrecta' });

  const token = jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    usuario: {
      nombre: user.nombre,
      rol: user.rol
    }
  });
  
});
router.post('/crear-admin', async (req, res) => {
  const bcrypt = require('bcryptjs');
  const Usuario = require('../models/Usuario');

  const hash = await bcrypt.hash('123456', 10);

  const admin = new Usuario({
    nombre: 'Administrador',
    usuario: 'admin',
    password: hash,
    rol: 'admin',
    activo: true
  });

  await admin.save();
  res.json({ msg: 'Admin creado correctamente' });
});

module.exports = router;


