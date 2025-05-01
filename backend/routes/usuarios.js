const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usuariosPath = path.join(__dirname, '../data/usuarios.json');
const ventasPath = path.join(__dirname, '../data/ventas.json');

function leerUsuarios() {
  const data = fs.readFileSync(usuariosPath, 'utf8');
  return JSON.parse(data);
}

function escribirUsuarios(data) {
  fs.writeFileSync(usuariosPath, JSON.stringify(data, null, 2));
}

function leerVentas() {
  const data = fs.readFileSync(ventasPath, 'utf8');
  return JSON.parse(data);
}

router.get('/', (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
});

router.get('/:id', (req, res) => {
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(usuario);
});

router.post('/', (req, res) => {
  const usuarios = leerUsuarios();
  const nuevoUsuario = { id: usuarios.length + 1, ...req.body };
  usuarios.push(nuevoUsuario);
  escribirUsuarios(usuarios);
  res.status(201).json(nuevoUsuario);
});

router.post('/buscar', (req, res) => {
  const { nombre, apellido } = req.body;
  const usuarios = leerUsuarios();

  const resultados = usuarios.filter(u =>
    u.nombre.toLowerCase() === nombre.toLowerCase() &&
    u.apellido.toLowerCase() === apellido.toLowerCase()
  );

  if (resultados.length === 0) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  res.json(resultados);
});

router.put('/:id', (req, res) => {
  const usuarios = leerUsuarios();
  const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

  usuarios[index] = { ...usuarios[index], ...req.body };
  escribirUsuarios(usuarios);
  res.json(usuarios[index]);
});

router.delete('/:id', (req, res) => {
  const usuarios = leerUsuarios();
  const ventas = leerVentas();
  const id = parseInt(req.params.id);

  const tieneVentas = ventas.some(v => v.id_usuario === id);
  if (tieneVentas) {
    return res.status(400).json({ mensaje: 'No se puede eliminar el usuario con ventas asociadas' });
  }

  const nuevosUsuarios = usuarios.filter(u => u.id !== id);
  if (nuevosUsuarios.length === usuarios.length) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  escribirUsuarios(nuevosUsuarios);
  res.json({ mensaje: 'Usuario eliminado correctamente' });
});

module.exports = router;