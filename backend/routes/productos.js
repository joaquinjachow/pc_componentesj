const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

router.get('/', async (req, res) => {
  const { categoria } = req.query;
  const query = categoria ? { categoria: new RegExp(`^${categoria}$`, 'i') } : {};
  const productos = await Producto.find(query);
  res.json(productos);
});

router.get('/:id', async (req, res) => {
  const producto = await Producto.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(producto);
});

router.post('/', async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
});

router.post('/disponibles', async (req, res) => {
  const disponibles = Producto.filter(p => p.disponible === true);
  res.json(disponibles);
});

router.put('/:id', async  (req, res) => {
  const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(actualizado);
});

module.exports = router;