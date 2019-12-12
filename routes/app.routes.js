const express = require('express');
const router = express.Router();

// Import routes
const materias = require('./materias.routes');
const usuarios = require('./usuarios.routes');
const inscripciones = require('./inscripciones.routes');
const examenes = require('./examenes.routes');

// Use routes
router.use('/api/v1/materias', materias);
router.use('/api/v1/usuarios', usuarios);
router.use('/api/v1/inscripciones', inscripciones);
router.use('/api/v1/examenes', examenes);

// Alive
router.get('/', async (req, res) => {
    res.json({ status: 200, message: 'Api Work' })
});

module.exports = router