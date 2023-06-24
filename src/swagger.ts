import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'food-order-app',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [
        {
          url: 'http://localhost:4000', // Development server URL
        },
        {
          url: 'https://food-app-backend-vevc.onrender.com', // Production server URL
        },
      ],
  },
  apis: ['**/*.ts'], // Set the path to your API files
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);


