const filename = './db/actors.json';
const utils = require('../utils/utils.js');
let actors = require('../db/actors.json');

function getActors() {
    return new Promise((resolve, reject) => {
        if (actors.length === 0) {
            reject({
                message: 'No hay actores disponibles',
                status: 202
            })
        }

        resolve(actors)
    })
}

function getActor(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(actors, id)
            .then(actor => resolve(actor))
            .catch(err => reject(err))
    })
}

function insertActor(newactor) {
    return new Promise((resolve, reject) => {
        const id = { id: utils.getNewId(actors) }
        const date = {
            fechaAlta: utils.newDate(),
            fechaActualizacion: utils.newDate()
        }
        newactor = { ...id, ...date, ...newactor }
        actors.push(newactor)
        utils.writeJSONFile(filename, actors)
        resolve(newactor)
    })
}

function updateActor(id, newactor) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(actors, id)
            .then(actor => {
                const index = actors.findIndex(p => p.id == actor.id)
                id = { id: actor.id }
                const date = {
                    fechaAlta: actor.createdAt,
                    fechaActualizacion: utils.newDate()
                }
                actors[index] = { ...id, ...date, ...newactor }
                utils.writeJSONFile(filename, actors)
                resolve(actors[index])
            })
            .catch(err => reject(err))
    })
}

function deleteActor(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(actors, id)
            .then(() => {
                actors = actors.filter(p => p.id != id)
                utils.writeJSONFile(filename, actors)
                resolve()
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertActor,
    getActors,
    getActor,
    updateActor,
    deleteActor
}