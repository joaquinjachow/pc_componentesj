const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'admin123';

router.post('/register', async (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }
  try {
    const existente = await Usuario.findOne({ email });
    if (existente) return res.status(400).json({ mensaje: 'El usuario ya existe' });
    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, apellido, email, password: hash });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, usuario: { nombre: usuario.nombre, id: usuario._id } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
});

module.exports = router;