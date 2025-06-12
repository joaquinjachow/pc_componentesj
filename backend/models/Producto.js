const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  desc: String,
  categoria: String,
  precio: Number,
  disponible: Boolean,
  imagen: String,
});

module.exports = mongoose.model('Producto', productoSchema);