const filename = './db/inscripciones.json';
const utils = require('../utils/utils.js');
let inscripciones = require('../db/inscripciones.json');

function getInscripciones() {
    return new Promise((resolve, reject) => {
        if (inscripciones.length === 0) {
            reject({
                message: 'No hay incripciones disponibles',
                status: 202
            })
        }

        resolve(inscripciones)
    })
}

function getInscripcion(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(inscripciones, id)
            .then(In => resolve(In))
            .catch(err => reject(err))
    })
}

function insertInscripcion(newIn) {
    return new Promise((resolve, reject) => {
        const id = { id: utils.getNewId(inscripciones) }
        const date = {
            fechaAlta: utils.newDate(),
            fechaActualizacion: utils.newDate()
        }
        newIn = { ...id, ...date, ...newIn }
        inscripciones.push(newIn)
        utils.writeJSONFile(filename, inscripciones)
        resolve(newIn)
    })
}

function updateInscripcion(id, newIn) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(inscripciones, id)
            .then(In => {
                const index = inscripciones.findIndex(p => p.id == In.id)
                id = { id: In.id }
                const date = {
                    fechaAlta: In.createdAt,
                    fechaActualizacion: utils.newDate()
                }
                inscripciones[index] = { ...id, ...date, ...newIn }
                utils.writeJSONFile(filename, inscripciones)
                resolve(inscripciones[index])
            })
            .catch(err => reject(err))
    })
}

function deleteInscripcion(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(inscripciones, id)
            .then(() => {
                inscripciones = inscripciones.filter(p => p.id != id)
                utils.writeJSONFile(filename, inscripciones)
                resolve()
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertInscripcion,
    getInscripciones,
    getInscripcion,
    updateInscripcion,
    deleteInscripcion
}