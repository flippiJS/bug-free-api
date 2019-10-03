const express = require('express');
const router = express.Router();

// Import routes
const books = require('./books.routes');

// Use routes
router.use('/api/v1/books', books);

// Alive
router.get('/', async (req, res) => {
    res.json({ status: 200, message: 'Api Work' })
});

module.exports = router