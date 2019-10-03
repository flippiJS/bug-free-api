const express = require('express');
const router = express.Router();

const book = require('../models/book.model');
const validations = require('../utils/validations');

/* All books */
router.get('/', async (req, res) => {
    await book.getBooks()
        .then(books => res.json(books))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* A book by id */
router.get('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id

    await book.getBook(id)
        .then(book => res.json(book))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new book */
router.post('/', validations.validateFields, async (req, res) => {
    await book.insertBook(req.body)
        .then(book => res.status(201).json({
            message: `El libro #${book.id} ha sido creado`,
            content: book
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a book */
router.put('/:id', validations.validateInt, validations.validateFields, async (req, res) => {
    const id = req.params.id

    await book.updateBook(id, req.body)
        .then(book => res.json({
            message: `El libro #${id} ha sido actualizado`,
            content: book
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

/* Delete a book */
router.delete('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id
    await book.deleteBook(id)
        .then(book => res.json({
            message: `El libro #${id} ha sido borrado`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

module.exports = router