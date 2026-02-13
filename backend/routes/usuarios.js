const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/auth');

const router = express.Router();

// Crear usuario (admin)
router.post('/', verificarToken(['admin']), async (req, res) => {
  const { nombre, usuario, password, rol } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const nuevo = new Usuario({
    nombre,
    usuario,
    password: hash,
    rol
  });

  await nuevo.save();
  res.json(nuevo);
});

// Listar usuarios
router.get('/', verificarToken(['admin']), async (req, res) => {
  const usuarios = await Usuario.find().select('-password');
  res.json(usuarios);
});

module.exports = router;
