const express = require('express');
const router = express.Router();
let productos = require('../data/productos.json');

router.get('/', (req, res) => {
  const { categoria } = req.query;

  if (categoria) {
    const filtrados = productos.filter(
      p => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
    return res.json(filtrados);
  }

  res.json(productos);
});

router.get('/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(producto);
});

router.post('/', (req, res) => {
  const nuevo = { id: productos.length + 1, ...req.body };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

router.post('/disponibles', (req, res) => {
  const disponibles = productos.filter(p => p.disponible === true);
  res.json(disponibles);
});

router.put('/:id', (req, res) => {
  const index = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  productos[index] = { ...productos[index], ...req.body };
  res.json(productos[index]);
});

module.exports = router;