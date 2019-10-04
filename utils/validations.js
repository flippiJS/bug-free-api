function validateInt(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'El ID debe ser entero' })
    } else {
        next()
    }
}

function validateFields(req, res, next) {
    const { marca, precio, foto } = req.body
    if (marca && precio && foto) {
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

function validateFieldsActor(req, res, next) {
    const { nombre, apellido, nacionalidad, fechaNacimiento } = req.body
    if (nombre && apellido && nacionalidad && fechaNacimiento) {
        next()
    } else {
        res.status(400).json({ message: 'Faltan campos' })
    }
}

module.exports = {
    validateInt,
    validateFields,
    validateFieldsFilm,
    validateFieldsActor
}