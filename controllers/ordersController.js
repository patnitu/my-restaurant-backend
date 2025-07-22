// controllers/ordersController.js
import * as ordersDAO from '../models/ordersDAO.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await ordersDAO.getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching orders');
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await ordersDAO.getOrderById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching order');
  }
};

export const createOrder = async (req, res) => {
  try {
    const newOrder = await ordersDAO.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updated = await ordersDAO.updateOrder(req.params.id, req.body);
    if (!updated) return res.status(404).send('Order not found');
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating order');
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await ordersDAO.deleteOrder(req.params.id);
    if (!deleted) return res.status(404).send('Order not found');
    res.json({ message: 'Order deleted', deleted });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting order');
  }
};

export const getPendingOrders = async (req, res) => {
  try {
    const pending = await ordersDAO.getOrdersByStatus('pending');
    res.json(pending);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching pending orders');
  }
};

export const getCompletedOrders = async (req, res) => {
  try {
    const completed = await ordersDAO.getOrdersByStatus('completed');
    res.json(completed);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching completed orders');
  }
};

export const markOrderCompleted = async (req, res) => {
  try {
    const result = await ordersDAO.updateOrderStatus(req.params.id, 'completed');
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error marking order completed');
  }
};




