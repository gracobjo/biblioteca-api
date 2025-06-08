const db = require('../db/db');

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Crear un nuevo préstamo
 *     tags: [Préstamos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - book_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               book_id:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       201:
 *         description: Préstamo creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error interno del servidor
 */
exports.createLoan = async (req, res) => {
  const { user_id, book_id } = req.body;

  if (!user_id || !book_id) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    const result = await db.query(
      'INSERT INTO loans (user_id, book_id) VALUES ($1, $2) RETURNING *',
      [user_id, book_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear préstamo:', err.message);
    res.status(500).json({ error: 'Error al crear préstamo' });
  }
};

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Obtener todos los préstamos
 *     tags: [Préstamos]
 *     responses:
 *       200:
 *         description: Lista de préstamos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       500:
 *         description: Error interno del servidor
 */
exports.getAllLoans = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM loans');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener préstamos:', err.message);
    res.status(500).json({ error: 'Error al obtener préstamos' });
  }
};

/**
 * @swagger
 * /loans/{id}:
 *   get:
 *     summary: Obtener un préstamo por ID
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del préstamo
 *     responses:
 *       200:
 *         description: Préstamo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       404:
 *         description: Préstamo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
exports.getLoanById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await db.query('SELECT * FROM loans WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener préstamo:', err.message);
    res.status(500).json({ error: 'Error al obtener préstamo' });
  }
};

/**
 * @swagger
 * /loans/{id}/return:
 *   put:
 *     summary: Devolver un libro (marcar préstamo como devuelto)
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del préstamo a devolver
 *     responses:
 *       200:
 *         description: Préstamo actualizado como devuelto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       404:
 *         description: Préstamo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
exports.returnBook = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await db.query(
      'UPDATE loans SET return_date = CURRENT_DATE, returned = TRUE WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al devolver libro:', err.message);
    res.status(500).json({ error: 'Error al devolver libro' });
  }
};

/**
 * @swagger
 * /loans/{id}:
 *   delete:
 *     summary: Eliminar un préstamo por ID
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del préstamo a eliminar
 *     responses:
 *       204:
 *         description: Préstamo eliminado correctamente
 *       404:
 *         description: Préstamo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
exports.deleteLoan = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await db.query('DELETE FROM loans WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error al eliminar préstamo:', err.message);
    res.status(500).json({ error: 'Error al eliminar préstamo' });
  }
};

/**
 * @swagger
 * /users/{userId}/loans/active:
 *   get:
 *     summary: Listar préstamos activos de un usuario
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de préstamos activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       404:
 *         description: No se encontraron préstamos activos
 *       500:
 *         description: Error interno del servidor
 */
exports.getActiveLoansByUser = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const result = await db.query(
      'SELECT * FROM loans WHERE user_id = $1 AND returned = FALSE',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron préstamos activos' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener préstamos activos:', err.message);
    res.status(500).json({ error: 'Error al obtener préstamos activos' });
  }
};

/**
 * @swagger
 * /books/{bookId}/loans/pending:
 *   get:
 *     summary: Listar préstamos pendientes de devolución de un libro
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Lista de préstamos pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       404:
 *         description: No se encontraron préstamos pendientes
 *       500:
 *         description: Error interno del servidor
 */
exports.getPendingLoansByBook = async (req, res) => {
  const bookId = parseInt(req.params.bookId);

  try {
    const result = await db.query(
      'SELECT * FROM loans WHERE book_id = $1 AND returned = FALSE',
      [bookId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron préstamos pendientes' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener préstamos pendientes:', err.message);
    res.status(500).json({ error: 'Error al obtener préstamos pendientes' });
  }
};
