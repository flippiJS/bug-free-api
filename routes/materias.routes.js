const express = require('express');
const router = express.Router();

const materia = require('../models/materia.model');
const validations = require('../utils/validations');

/* All materias */
router.get('/', async (req, res) => {
    await materia.getMaterias()
        .then(materias => res.json(materias))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* A materia by id */
router.get('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id

    await materia.getMateria(id)
        .then(materia => res.json(materia))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new materia */
router.post('/', validations.validateFieldsMateria, async (req, res) => {
    await materia.insertMateria(req.body)
        .then(materia => res.status(201).json({
            message: `Materia #${materia.id} ha sido creado`,
            content: materia
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a materia */
router.put('/:id', validations.validateInt, validations.validateFieldsMateria, async (req, res) => {
    const id = req.params.id

    await materia.updateMateria(id, req.body)
        .then(materia => res.json({
            message: `Materia #${id} ha sido actualizado`,
            content: materia
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

/* Delete a materia */
router.delete('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id
    await materia.deleteMateria(id)
        .then(materia => res.json({
            message: `Materia #${id} ha sido borrado`,
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