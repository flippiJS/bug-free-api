const express = require('express');
const router = express.Router();

const usuario = require('../models/usuario.model');
const validations = require('../utils/validations');

/* All usuarios */
router.get('/', async (req, res) => {
    await usuario.getUsuarios()
        .then(usuarios => res.json(usuarios))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* A usuario by id */
router.get('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id

    await usuario.getUsuario(id)
        .then(usuario => res.json(usuario))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new usuario */
router.post('/', validations.validateFieldsUsuario, async (req, res) => {
    await usuario.insertUsuario(req.body)
        .then(usuario => res.status(201).json({
            message: `Usuario #${usuario.id} ha sido creado`,
            content: usuario,
            status: 200
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a usuario */
router.put('/:id', validations.validateInt, validations.validateFieldsUsuario, async (req, res) => {
    const id = req.params.id

    await usuario.updateUsuario(id, req.body)
        .then(usuario => res.json({
            message: `Usuario #${id} ha sido actualizado`,
            content: usuario
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

/* Delete a usuario */
router.delete('/:id', validations.validateInt, async (req, res) => {
    const id = req.params.id
    await usuario.deleteUsuario(id)
        .then(usuario => res.json({
            message: `Usuario #${id} ha sido borrado`,
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