/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario
 *         name:
 *           type: string
 *           description: Nombre completo
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *       example:
 *         id: 1
 *         name: Juan Pérez
 *         email: juan@example.com
 */

const Joi = require('joi');

module.exports = {
  // Validación para creación de usuario
  createUser: Joi.object({
    name: Joi.string().min(3).trim().required(),
    email: Joi.string().email().trim().required()
  }),

  // Validación para actualización (mínimo un campo)
  updateUser: Joi.object({
    name: Joi.string().min(3).trim(),
    email: Joi.string().email().trim()
  }).min(1)
};
