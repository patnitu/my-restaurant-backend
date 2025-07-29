// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ordersRoutes from './routes/ordersRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/orders', ordersRoutes);

app.use('/api/webhook', webhookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
