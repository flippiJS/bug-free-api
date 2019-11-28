const filename = './db/usuarios.json';
const utils = require('../utils/utils.js');
let usuarios = require('../db/usuarios.json');

/*
  public id: number;
  public email: string;
  public clave: string;
  public rol: number;
  public foto: string;
*/

function getUsuarios() {
    return new Promise((resolve, reject) => {
        if (usuarios.length === 0) {
            reject({
                message: 'No hay usuarios disponibles',
                status: 202
            })
        }

        resolve(usuarios)
    })
}

function getUsuario(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(usuarios, id)
            .then(actor => resolve(actor))
            .catch(err => reject(err))
    })
}

function insertUsuario(newactor) {
    return new Promise((resolve, reject) => {
        const id = { id: utils.getNewId(usuarios) }
        const date = {
            fechaAlta: utils.newDate(),
            fechaActualizacion: utils.newDate()
        }
        newactor = { ...id, ...date, ...newactor }
        usuarios.push(newactor)
        utils.writeJSONFile(filename, usuarios)
        resolve(newactor)
    })
}

function updateUsuario(id, newactor) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(usuarios, id)
            .then(actor => {
                const index = usuarios.findIndex(p => p.id == actor.id)
                id = { id: actor.id }
                const date = {
                    fechaAlta: actor.createdAt,
                    fechaActualizacion: utils.newDate()
                }
                usuarios[index] = { ...id, ...date, ...newactor }
                utils.writeJSONFile(filename, usuarios)
                resolve(usuarios[index])
            })
            .catch(err => reject(err))
    })
}

function deleteUsuario(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(usuarios, id)
            .then(() => {
                usuarios = usuarios.filter(p => p.id != id)
                utils.writeJSONFile(filename, usuarios)
                resolve()
            })
            .catch(err => reject(err))
    })
}

function loginUsuario(form) {
    return new Promise((resolve, reject) => {
        const index = usuarios.findIndex(p => p.mail == form.mail && p.clave == form.clave);
        if(index > -1) resolve(usuarios[index]);
        else reject(false);    
    })
}

module.exports = {
    insertUsuario,
    getUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario
}