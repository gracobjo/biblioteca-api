const express = require('express');
const router = express.Router();

// Middleware de validación
const validate = require('../middleware/validate');

// Esquemas de validación
const { createUser, updateUser } = require('../schemas/user.schema');

// Controlador
const userController = require('../controllers/user.controller');

// Rutas con validación
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

// Validación para crear usuario
router.post('/users', validate(createUser), userController.createUser);

// Validación para actualizar usuario
router.put('/users/:id', validate(updateUser), userController.updateUser);

// Eliminar usuario (sin validación adicional)
router.delete('/users/:id', userController.deleteUser);

module.exports = router;