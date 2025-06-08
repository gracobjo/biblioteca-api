const express = require('express');
const router = express.Router();

// Middleware de validación
const validate = require('../middleware/validate');
const { createBook, updateBook } = require('../schemas/book.schema');

// Controlador de libros
const bookController = require('../controllers/book.controller');

// Rutas con validación
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);

// Validación para crear libro
router.post('/books', validate(createBook), bookController.createBook);

// Validación para actualizar libro
router.put('/books/:id', validate(updateBook), bookController.updateBook);

router.delete('/books/:id', bookController.deleteBook);

module.exports = router;