// Crear unos cuantos libros bajo el comando de consola npm run seeds para tener un estado inicial en la base de datos.
const mongoose = require('mongoose');
const Book = require('../models/Book.model');
const booksJSON = require('../data/books.json');

// Me conecto a la base de datos
require('../config/db.config');

// Lanzamos las tareas una vez se haya realizado la conexión
mongoose.connection.once('open', () => {
  // Limpiamos base de datos

  mongoose.connection.dropCollection('books')
    .then(() => {
      console.log('Database cleared');
      
      // Lanzar la petición a mongo de crear los libros a partir del JSON
      return Book.create(booksJSON)
    })
    .then(newBooks => {
      newBooks.forEach((book) => {
        console.log(`${book.title} has been created`);
      });

      console.log(`${newBooks.length} books have been created`);
    })
    .catch(err => console.error(err))
    .finally(() => {
      mongoose.connection.close()
        .then(() => console.log('Connection closed'))
        .catch(err => console.log('Error disconnectiong:', err))
        .finally(() => process.exit(0))
    })
})