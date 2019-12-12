const express = require('express');
const router = express.Router();

const examenes = require('../models/examen.model');
const validations = require('../utils/validations');

/* All exameness */
router.get('/', async (req, res) => {
    await examenes.getExamenes()
        .then(exameness => res.json(exameness))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* A examenes by id */
router.get('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id

    await examenes.getExamen(id)
        .then(examenes => res.json(examenes))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new examenes */
router.post('/', async (req, res) => {
    await examenes.insertExamen(req.body)
        .then(examenes => res.status(201).json({
            message: `Examen #${examenes.id} ha sido creado`,
            content: examenes
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a examenes */
router.put('/:id', validations.validateInt, validations.validateFieldsMateria, async (req, res) => {
    const id = req.params.id

    await examenes.updateExamen(id, req.body)
        .then(examenes => res.json({
            message: `Examen #${id} ha sido actualizado`,
            content: examenes
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

/* Delete a examenes */
router.delete('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id
    await examenes.deleteExamen(id)
        .then(examenes => res.json({
            message: `Examen #${id} ha sido borrado`,
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