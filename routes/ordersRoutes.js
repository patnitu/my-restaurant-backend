import express from 'express';
import * as ordersController from '../controllers/ordersController.js';

const router = express.Router();

// ✅ Specific first
router.get('/status/pending', ordersController.getPendingOrders);
router.get('/status/completed', ordersController.getCompletedOrders);

// ✅ Generic after
router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

export default router;
