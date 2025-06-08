const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger.js');

require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Documentación Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');
const loanRoutes = require('./routes/loan.routes');

app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', loanRoutes);
module.exports = app;