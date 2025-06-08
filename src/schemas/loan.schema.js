/**
 * @swagger
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       required:
 *         - user_id
 *         - book_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del préstamo
 *         user_id:
 *           type: integer
 *           description: ID del usuario que pidió el préstamo
 *         book_id:
 *           type: integer
 *           description: ID del libro prestado
 *         return_date:
 *           type: string
 *           format: date
 *           description: Fecha de devolución
 *         returned:
 *           type: boolean
 *           description: Estado del préstamo
 *       example:
 *         id: 10
 *         user_id: 1
 *         book_id: 5
 *         return_date: "2025-06-07"
 *         returned: true
 */

const Joi = require('joi');

module.exports = {
  createLoan: Joi.object({
    user_id: Joi.number().integer().required(),
    book_id: Joi.number().integer().required()
  }),

  updateLoan: Joi.object({
    return_date: Joi.date().iso().optional(), // Formato: YYYY-MM-DD
    returned: Joi.boolean().optional()
  }).min(1)
};
