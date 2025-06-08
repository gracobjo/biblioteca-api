const db = require('../db/db');

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
 *           example: 1
 *         title:
 *           type: string
 *           example: "Cien años de soledad"
 *         author:
 *           type: string
 *           example: "Gabriel García Márquez"
 *         genre:
 *           type: string
 *           example: "Realismo mágico"
 *         published_year:
 *           type: integer
 *           example: 1967
 *         isbn:
 *           type: string
 *           example: "9780307474728"
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
exports.getAllBooks = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener libros:', err.message);
    res.status(500).json({ error: 'Error al obtener libros' });
  }
};

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Libro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libro no encontrado
 */
exports.getBookById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener libro:', err.message);
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             title: "Cien años de soledad"
 *             author: "Gabriel García Márquez"
 *             genre: "Realismo mágico"
 *             published_year: 1967
 *             isbn: "9780307474728"
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Campos requeridos faltantes
 */
exports.createBook = async (req, res) => {
  const { title, author, genre, published_year, isbn } = req.body;
  if (!title || !author || !isbn) {
    return res.status(400).json({ message: 'Campos requeridos faltantes' });
  }

  try {
    const result = await db.query(
      'INSERT INTO books (title, author, genre, published_year, isbn) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, author, genre, published_year, isbn]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear libro:', err.message);
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Actualizar un libro existente
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del libro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             title: "El amor en los tiempos del cólera"
 *             author: "Gabriel García Márquez"
 *             genre: "Romance"
 *             published_year: 1985
 *             isbn: "9780307389732"
 *     responses:
 *       200:
 *         description: Libro actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Campos requeridos faltantes
 *       404:
 *         description: Libro no encontrado
 */
exports.updateBook = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, genre, published_year, isbn } = req.body;

  if (!title || !author || !isbn) {
    return res.status(400).json({ message: 'Campos requeridos faltantes' });
  }

  try {
    const result = await db.query(
      'UPDATE books SET title = $1, author = $2, genre = $3, published_year = $4, isbn = $5 WHERE id = $6 RETURNING *',
      [title, author, genre, published_year, isbn, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar libro:', err.message);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Eliminar un libro por ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del libro
 *     responses:
 *       204:
 *         description: Libro eliminado correctamente (sin contenido)
 *       404:
 *         description: Libro no encontrado
 */
exports.deleteBook = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error al eliminar libro:', err.message);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};
