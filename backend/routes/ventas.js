const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const mongoose = require('mongoose');
const verificarToken = require("../auth")

router.get('/', async (req, res) => {
  const ventas = await Venta.find();
  res.json(ventas);
});

router.get('/usuario/:id', async (req, res) => {
  try {
    const idUsuario = new mongoose.Types.ObjectId(req.params.id);
    const ventas = await Venta.find({ id_usuario: idUsuario })
      .populate('productos.id');
    res.json(ventas);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID de usuario inválido' });
  }
});

router.post('/', verificarToken, async (req, res) => {
  try {
    const { id_usuario, fecha, direccion, productos: items } = req.body;
    const usuarioExiste = await Usuario.findById(id_usuario);
    if (!usuarioExiste) return res.status(400).json({ mensaje: 'Usuario no válido' });
    let total = 0;
    const productosValidados = await Promise.all(
      items.map(async (item) => {
        const producto = await Producto.findById(item.id);
        if (!producto) throw new Error('Producto no válido');
        total += item.precio_unitario * item.cantidad;
        return {
          id: producto._id,
          cantidad: item.cantidad,
          precio_unitario: item.precio_unitario,
        };
      })
    );
    const nuevaVenta = new Venta({
      id_usuario,
      fecha,
      direccion,
      productos: productosValidados,
      total,
    });
    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const ventaActualizada = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ventaActualizada) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json(ventaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido o error de actualización' });
  }
});

module.exports = router;