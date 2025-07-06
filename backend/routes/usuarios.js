const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Venta = require('../models/Venta');

router.get('/', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch {
    res.status(400).json({ mensaje: 'ID inválido' });
  }
});

router.post('/', async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  res.status(201).json(nuevoUsuario);
});

router.post('/buscar', async (req, res) => {
  const { nombre, apellido } = req.body;
  const usuarios = await Usuario.find({
    nombre: { $regex: new RegExp(`^${nombre}$`, 'i') },
    apellido: { $regex: new RegExp(`^${apellido}$`, 'i') },
  });
  if (usuarios.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(usuarios);
});

router.put('/:id', async (req, res) => {
  const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(actualizado);
});

router.delete('/:id', async (req, res) => {
  const usuarioId = req.params.id;
  const tieneVentas = await Venta.exists({ id_usuario: usuarioId });
  if (tieneVentas) {
    return res.status(400).json({ mensaje: 'No se puede eliminar el usuario con ventas asociadas' });
  }
  const eliminado = await Usuario.findByIdAndDelete(usuarioId);
  if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json({ mensaje: 'Usuario eliminado correctamente' });
});

module.exports = router;