function validateInt(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'El ID debe ser entero' })
    } else {
        next()
    }
}

function validateFieldsMateria(req, res, next) {
    const { nombre, cuatrimestre, cupos, profesor } = req.body
    if (nombre && cuatrimestre && cupos && profesor) {
        next()
    } else {
        res.status(400).json({ message: 'Faltan campos' })
    }
}

function validateFieldsFilm(req, res, next) {
    const { nombre, tipo, fechaEstreno, cantidadPublico, foto } = req.body
    if (nombre && tipo && fechaEstreno && cantidadPublico && foto) {
        next()
    } else {
        res.status(400).json({ message: 'Faltan campos' })
    }
}

function validateFieldsUsuario(req, res, next) {
    const { nombre, clave, mail, foto, tipo } = req.body
    if (nombre && clave && mail && foto && tipo) {
        next()
    } else {
        res.status(400).json({ message: 'Faltan campos' })
    }
}

module.exports = {
    validateInt,
    validateFieldsMateria,
    validateFieldsFilm,
    validateFieldsUsuario

}