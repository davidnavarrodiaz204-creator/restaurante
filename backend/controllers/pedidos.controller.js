const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');

// Crear pedido
const crearPedido = async (req, res) => {
  try {
    const { mesa, productos } = req.body;
    let total = 0;

    for (const item of productos) {
      const prod = await Producto.findById(item.producto);

      if (!prod) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      total += prod.precio * item.cantidad;
    }

    const pedido = new Pedido({
      mesa,
      productos,
      total
    });

    await pedido.save();
    res.status(201).json(pedido);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar pedidos
const listarPedidos = async (req, res) => {
  const pedidos = await Pedido.find()
    .populate('productos.producto')
    .sort({ creadoEn: -1 });

  res.json(pedidos);
};

// Cambiar estado
const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const pedido = await Pedido.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json(pedido);

  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
};

module.exports = {
  crearPedido,
  listarPedidos,
  cambiarEstado
};
