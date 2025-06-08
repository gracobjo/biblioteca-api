const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan.controller');

// Crear un nuevo préstamo
router.post('/loans', loanController.createLoan);

// Obtener todos los préstamos
router.get('/loans', loanController.getAllLoans);

// Obtener un préstamo por ID
router.get('/loans/:id', loanController.getLoanById);

// Marcar un préstamo como devuelto
router.put('/loans/:id/return', loanController.returnBook);

// Eliminar un préstamo
router.delete('/loans/:id', loanController.deleteLoan);

// Obtener préstamos activos de un usuario
router.get('/users/:userId/loans/active', loanController.getActiveLoansByUser);

// Obtener préstamos pendientes de devolución de un libro
router.get('/books/:bookId/loans/pending', loanController.getPendingLoansByBook);

module.exports = router;
