const express = require('express');
const router = express.Router();

// Import routes
const materias = require('./materias.routes');
const usuarios = require('./usuarios.routes');
const incripciones = require('./incripciones.routes');

// Use routes
router.use('/api/v1/materias', materias);
router.use('/api/v1/usuarios', usuarios);
router.use('/api/v1/incripciones', incripciones);

// Alive
router.get('/', async (req, res) => {
    res.json({ status: 200, message: 'Api Work' })
});

module.exports = router