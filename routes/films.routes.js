const express = require('express');
const router = express.Router();

const film = require('../models/film.model');
const validations = require('../utils/validations');

/* All films */
router.get('/', async (req, res) => {
    await film.getFilms()
        .then(films => res.json(films))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* A film by id */
router.get('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id

    await film.getFilm(id)
        .then(film => res.json(film))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new film */
router.post('/', validations.validateFieldsFilm, async (req, res) => {
    await film.insertFilm(req.body)
        .then(film => res.status(201).json({
            message: `La pelicula #${film.id} ha sido creado`,
            content: film
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a film */
router.put('/:id', validations.validateInt, validations.validateFieldsFilm, async (req, res) => {
    const id = req.params.id

    await film.updateFilm(id, req.body)
        .then(film => res.json({
            message: `La pelicula #${id} ha sido actualizado`,
            content: film
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

/* Delete a film */
router.delete('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id
    await film.deleteFilm(id)
        .then(film => res.json({
            message: `La pelicula #${id} ha sido borrado`,
            status: 200
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

module.exports = router