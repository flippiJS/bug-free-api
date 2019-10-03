const filename = './db/books.json';
const utils = require('../utils/utils.js');
let books = require('../db/books.json');

function getBooks() {
    return new Promise((resolve, reject) => {
        if (books.length === 0) {
            reject({
                message: 'no books available',
                status: 202
            })
        }

        resolve(books)
    })
}

function getBook(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(books, id)
            .then(Book => resolve(Book))
            .catch(err => reject(err))
    })
}

function insertBook(newBook) {
    return new Promise((resolve, reject) => {
        const id = { id: utils.getNewId(books) }
        const date = {
            createdAt: utils.newDate(),
            updatedAt: utils.newDate()
        }
        newBook = { ...id, ...date, ...newBook }
        books.push(newBook)
        utils.writeJSONFile(filename, books)
        resolve(newBook)
    })
}

function updateBook(id, newBook) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(books, id)
            .then(Book => {
                const index = books.findIndex(p => p.id == Book.id)
                id = { id: Book.id }
                const date = {
                    createdAt: Book.createdAt,
                    updatedAt: utils.newDate()
                }
                books[index] = { ...id, ...date, ...newBook }
                utils.writeJSONFile(filename, books)
                resolve(books[index])
            })
            .catch(err => reject(err))
    })
}

function deleteBook(id) {
    return new Promise((resolve, reject) => {
        utils.mustBeInArray(books, id)
            .then(() => {
                books = books.filter(p => p.id !== id)
                utils.writeJSONFile(filename, books)
                resolve()
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}