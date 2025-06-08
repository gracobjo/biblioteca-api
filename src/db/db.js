const { Pool } = require('pg');

// Usamos variables de entorno definidas en .env
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'biblioteca',
  password: process.env.DB_PASSWORD || 'tucontraseña',
  port: process.env.DB_PORT || 5432,
});

// Test de conexión (opcional)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
  } else {
    console.log('Conectado a PostgreSQL -', res.rows[0].now);
  }
});

// Función reutilizable para hacer consultas
const query = (text, params) => pool.query(text, params);

module.exports = {
  query
};