import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const swaggerDefinition = {
  openapi: "3.0.1",
  info: {
    title: "API Coder Backend",
    version: "1.0.0",
    description: "Documentación de la API de Coder Backend",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: "Development Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, "../routes/*.ts"),
    path.join(__dirname, "../docs/users.yaml"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
