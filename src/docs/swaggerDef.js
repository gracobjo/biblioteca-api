/**
 * @swagger
 * 
 * tags:
 *   - name: Usuarios
 *     description: Endpoints de usuarios
 *   - name: Libros
 *     description: Endpoints de libros
 *   - name: Préstamos
 *     description: Endpoints de préstamos
 *
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
 *           example: 1
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           format: email
 *           example: "juan@example.com"

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

 *     Loan:
 *       type: object
 *       required:
 *         - user_id
 *         - book_id
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         user_id:
 *           type: integer
 *           example: 1
 *         book_id:
 *           type: integer
 *           example: 101
 *         loan_date:
 *           type: string
 *           format: date
 *           example: "2025-06-01"
 *         return_date:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: "2025-06-07"
 *         returned:
 *           type: boolean
 *           example: false
 */
