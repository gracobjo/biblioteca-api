// swagger.js

const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Biblioteca API REST",
      version: "1.0.0",
      description: "API REST del sistema de biblioteca"
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local"
      }
    ]
    // ✅ Eliminamos components.schemas.User porque ahora están en swaggerDef.js
  },
  apis: [
    "./src/controllers/*.controller.js", // tus controladores
    "./src/docs/swaggerDef.js"           // 👈 importante: incluir este
  ]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
