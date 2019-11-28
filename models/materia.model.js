const filename = './db/materias.json';
const utils = require('../utils/utils.js');
let materias = require('../db/materias.json');
const incripcion = require('../models/inscripcion.model');

function getMaterias() {
    return new Promise((resolve, reject) => {
        if (materias.length === 0) {
            reject({
                message: 'No hay materias disponibles',
                status: 202
            })
        }

        resolve(materias)
    })
}

function getMateriasDisponibles(id) {
    return new Promise((resolve, reject) => {
        let materiasDispo = materias.slice();
        if (materias.length === 0) {
            reject({
                message: 'No hay materias disponibles',
                status: 202
            })
        }
        incripcion.getInscripciones()
            .then(incripcions => {
                const list = incripcions.filter((i) => i.usuario.id == id);
                materiasDispo = materiasDispo.filter((m, index) => {
                    list.map((l) => {
                        if (l.materia == m.id) materiasDispo.splice(index, 1);
                    });
                });
            })

        resolve(materiasDispo)
    })
}

function getMateria(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(materias, id)
            .then(Materia => resolve(Materia))
            .catch(err => reject(err))
    })
}

function insertMateria(newMateria) {
    return new Promise((resolve, reject) => {
        const id = { id: utils.getNewId(materias) }
        const date = {
            fechaAlta: utils.newDate(),
            fechaActualizacion: utils.newDate()
        }
        newMateria = { ...id, ...date, ...newMateria }
        materias.push(newMateria)
        utils.writeJSONFile(filename, materias)
        resolve(newMateria)
    })
}

function updateMateria(id, newMateria) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(materias, id)
            .then(Materia => {
                const index = materias.findIndex(p => p.id == Materia.id)
                id = { id: Materia.id }
                const date = {
                    fechaAlta: Materia.createdAt,
                    fechaActualizacion: utils.newDate()
                }
                materias[index] = { ...id, ...date, ...newMateria }
                utils.writeJSONFile(filename, materias)
                resolve(materias[index])
            })
            .catch(err => reject(err))
    })
}

function deleteMateria(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(materias, id)
            .then(() => {
                materias = materias.filter(p => p.id != id)
                utils.writeJSONFile(filename, materias)
                resolve()
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertMateria,
    getMaterias,
    getMateria,
    updateMateria,
    deleteMateria,
    getMateriasDisponibles
}