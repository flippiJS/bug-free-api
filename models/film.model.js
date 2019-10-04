const filename = './db/films.json';
const utils = require('../utils/utils.js');
let films = require('../db/films.json');

function getFilms() {
    return new Promise((resolve, reject) => {
        if (films.length === 0) {
            reject({
                message: 'No hay pelis disponibles',
                status: 202
            })
        }

        resolve(films)
    })
}

function getFilm(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(films, id)
            .then(film => resolve(film))
            .catch(err => reject(err))
    })
}

function insertFilm(newfilm) {
    return new Promise((resolve, reject) => {
        const id = { id: utils.getNewId(films) }
        const date = {
            fechaAlta: utils.newDate(),
            fechaActualizacion: utils.newDate()
        }
        newfilm = { ...id, ...date, ...newfilm }
        films.push(newfilm)
        utils.writeJSONFile(filename, films)
        resolve(newfilm)
    })
}

function updateFilm(id, newfilm) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(films, id)
            .then(film => {
                const index = films.findIndex(p => p.id == film.id)
                id = { id: film.id }
                const date = {
                    fechaAlta: film.createdAt,
                    fechaActualizacion: utils.newDate()
                }
                films[index] = { ...id, ...date, ...newfilm }
                utils.writeJSONFile(filename, films)
                resolve(films[index])
            })
            .catch(err => reject(err))
    })
}

function deleteFilm(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(films, id)
            .then(() => {
                films = films.filter(p => p.id != id)
                utils.writeJSONFile(filename, films)
                resolve()
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertFilm,
    getFilms,
    getFilm,
    updateFilm,
    deleteFilm
}