const filename = './db/examenes.json';
const utils = require('../utils/utils.js');
let examenes = require('../db/examenes.json');

function getExamenes() {
    return new Promise((resolve, reject) => {
        if (examenes.length === 0) {
            reject({
                message: 'No hay examenes disponibles',
                status: 202
            })
        }

        resolve(examenes)
    })
}

function getExamen(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(examenes, id)
            .then(In => resolve(In))
            .catch(err => reject(err))
    })
}

function insertExamen(newIn) {
    return new Promise((resolve, reject) => {
        const id = { id: utils.getNewId(examenes) }
        const date = {
            fechaAlta: utils.newDate(),
            fechaActualizacion: utils.newDate()
        }
        newIn = { ...id, ...date, ...newIn }
        examenes.push(newIn)
        utils.writeJSONFile(filename, examenes)
        resolve(newIn)
    })
}

function updateExamen(id, newIn) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(examenes, id)
            .then(In => {
                const index = examenes.findIndex(p => p.id == In.id)
                id = { id: In.id }
                const date = {
                    fechaAlta: In.createdAt,
                    fechaActualizacion: utils.newDate()
                }
                examenes[index] = { ...id, ...date, ...newIn }
                utils.writeJSONFile(filename, examenes)
                resolve(examenes[index])
            })
            .catch(err => reject(err))
    })
}

function deleteExamen(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(examenes, id)
            .then(() => {
                examenes = examenes.filter(p => p.id != id)
                utils.writeJSONFile(filename, examenes)
                resolve()
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertExamen,
    getExamenes,
    getExamen,
    updateExamen,
    deleteExamen
}