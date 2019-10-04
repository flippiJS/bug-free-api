const express = require('express');
const router = express.Router();

// Import routes
const books = require('./books.routes');
const films = require('./films.routes');
const actors = require('./actors.routes');

// Use routes
router.use('/api/v1/books', books);
router.use('/api/v1/films', films);
router.use('/api/v1/actors', actors);

// Alive
router.get('/', async (req, res) => {
    res.json({ status: 200, message: 'Api Work' })
});

module.exports = router