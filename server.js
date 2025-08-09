// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ordersRoutes from './routes/ordersRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import itemsRoutes from './routes/itemsRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/orders', ordersRoutes);

app.use('/api/webhook', webhookRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/items', itemsRoutes);

const PORT = process.env.PORT || 3000;
// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.0',
      description: 'API Documentation for Categories, Items, and Webhooks'
    },
    servers: [
      { url: 'http://localhost:5000/api', description: 'Local dev server' }
    ]
  },
  apis: ['./routes/*.js'], // ✅ Reads Swagger comments from all routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/webhooks', webhookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

