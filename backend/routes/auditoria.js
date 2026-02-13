const express = require('express');
const router = express.Router();
const Auditoria = require('../models/Auditoria');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get(
  '/',
  auth,
  role('ADMIN'),
  async (req, res) => {
    const logs = await Auditoria.find()
      .populate('usuario', 'nombre email')
      .sort({ fecha: -1 });

    res.json(logs);
  }
);

module.exports = router;
