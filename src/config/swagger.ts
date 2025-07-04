import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API for a blog application',
    },
    servers: [
      {
        url: 'http://localhost:8080/api-docs',
        description: 'Development server',
      },
      {
        url: 'https://your-api.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['../routes/*.ts'],
}
export const swaggerDocs = swaggerJsdoc(swaggerOptions)
