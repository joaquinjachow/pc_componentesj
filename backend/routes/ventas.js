const express = require('express');
const router = express.Router();
const ventas = require('../data/ventas.json');
const usuarios = require('../data/usuarios.json');
const productos = require('../data/productos.json');

router.get('/', (req, res) => {
  res.json(ventas);
});

router.get('/usuario/:id', (req, res) => {
  const resultado = ventas.filter(v => v.id_usuario === parseInt(req.params.id));
  res.json(resultado);
});

router.post('/', (req, res) => {
  const { id_usuario, fecha, direccion, productos: items } = req.body;

  const user = usuarios.find(u => u.id === id_usuario);
  if (!user) return res.status(400).json({ mensaje: 'Usuario no válido' });

  let total = 0;
  const productosValidos = items.map(item => {
    const prod = productos.find(p => p.id === item.id);
    if (!prod) throw new Error('Producto no válido');
    total += item.precio_unitario * item.cantidad;
    return item;
  });

  const nueva = {
    id: ventas.length + 1,
    id_usuario,
    fecha,
    total,
    direccion,
    productos: productosValidos
  };
  ventas.push(nueva);
  res.status(201).json(nueva);
});

router.put('/:id', (req, res) => {
  const index = ventas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Venta no encontrada' });
  ventas[index] = { ...ventas[index], ...req.body };
  res.json(ventas[index]);
});

module.exports = router;