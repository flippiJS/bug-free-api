const express = require('express');
const router = express.Router();

const actor = require('../models/actor.model');
const validations = require('../utils/validations');

/* All actors */
router.get('/', async (req, res) => {
    await actor.getActors()
        .then(actors => res.json(actors))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* A actor by id */
router.get('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id

    await actor.getActor(id)
        .then(actor => res.json(actor))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new actor */
router.post('/', validations.validateFieldsActor, async (req, res) => {
    await actor.insertActor(req.body)
        .then(actor => res.status(201).json({
            message: `Actor #${actor.id} ha sido creado`,
            content: actor,
            status: 200
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a actor */
router.put('/:id', validations.validateInt, validations.validateFieldsActor, async (req, res) => {
    const id = req.params.id

    await actor.updateActor(id, req.body)
        .then(actor => res.json({
            message: `Actor #${id} ha sido actualizado`,
            content: actor
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

/* Delete a actor */
router.delete('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id
    await actor.deleteActor(id)
        .then(actor => res.json({
            message: `Actor #${id} ha sido borrado`,
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