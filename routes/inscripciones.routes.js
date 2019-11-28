const express = require('express');
const router = express.Router();

const incripcion = require('../models/inscripcion.model');
const validations = require('../utils/validations');

/* All incripcions */
router.get('/', async (req, res) => {
    await incripcion.getIncripcions()
        .then(incripcions => res.json(incripcions))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* A incripcion by id */
router.get('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id

    await incripcion.getIncripcion(id)
        .then(incripcion => res.json(incripcion))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new incripcion */
router.post('/', validations.validateFields, async (req, res) => {
    await incripcion.insertIncripcion(req.body)
        .then(incripcion => res.status(201).json({
            message: `El libro #${incripcion.id} ha sido creado`,
            content: incripcion
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a incripcion */
router.put('/:id', validations.validateInt, validations.validateFields, async (req, res) => {
    const id = req.params.id

    await incripcion.updateIncripcion(id, req.body)
        .then(incripcion => res.json({
            message: `El libro #${id} ha sido actualizado`,
            content: incripcion
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

/* Delete a incripcion */
router.delete('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id
    await incripcion.deleteIncripcion(id)
        .then(incripcion => res.json({
            message: `El libro #${id} ha sido borrado`,
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