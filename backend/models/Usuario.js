const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('Usuario', usuarioSchema);