const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use(express.json());

const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');
const ventasRoutes = require('./routes/ventas');

app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/ventas', ventasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});