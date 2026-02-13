const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));


const cajaRoutes = require('./backend/routes/caja');
const ventasRoutes = require('./backend/routes/ventas');
const productosRouter = require('./backend/routes/productos');
const pedidosRouter = require('./backend/routes/pedidos');
app.use('/api/auditoria', require('./backend/routes/auditoria'));
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/usuarios', require('./backend/routes/usuarios'));
app.use('/api/caja', cajaRoutes);
app.use('/api/productos', productosRouter);
app.use('/api/pedidos', pedidosRouter);
app.use('/api/ventas', ventasRoutes);


// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.log("❌ Error al conectar MongoDB:", err));
// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
