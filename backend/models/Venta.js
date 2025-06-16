const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  fecha: String,
  direccion: String,
  total: Number,
  productos: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
      cantidad: Number,
      precio_unitario: Number,
    },
  ],
});

module.exports = mongoose.model('Venta', ventaSchema);