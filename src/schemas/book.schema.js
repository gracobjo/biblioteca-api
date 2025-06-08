/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - isbn
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del libro
 *         title:
 *           type: string
 *           description: Título del libro
 *         author:
 *           type: string
 *           description: Autor del libro
 *         genre:
 *           type: string
 *           description: Género literario
 *         published_year:
 *           type: integer
 *           description: Año de publicación
 *         isbn:
 *           type: string
 *           description: Código ISBN del libro
 *       example:
 *         id: 1
 *         title: Cien años de soledad
 *         author: Gabriel García Márquez
 *         genre: Realismo mágico
 *         published_year: 1967
 *         isbn: "9783161484100"
 */
const Joi = require('joi');

const isbnSchema = Joi.string()
  .pattern(/^(\d{10}|\d{13})$/)
  .message('El ISBN debe tener 10 o 13 dígitos numéricos');

module.exports = {
  createBook: Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    genre: Joi.string().optional(),
    published_year: Joi.number().integer().optional(),
    isbn: isbnSchema.required()
  }),
  updateBook: Joi.object({
    title: Joi.string().min(3),
    author: Joi.string().min(3),
    genre: Joi.string().optional(),
    published_year: Joi.number().integer().optional(),
    isbn: isbnSchema.optional()
  }).min(1)
};
