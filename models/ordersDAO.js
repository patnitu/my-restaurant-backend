// models/ordersDAO.js
import pool from '../db.js';

export const getAllOrders = async () => {
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return result.rows;
};

export const getOrderById = async (id) => {
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  return result.rows[0];
};

export const createOrder = async ({ items, total_amount, customer_name, address, status = 'pending' }) => {
  const result = await pool.query(
    `INSERT INTO orders (items, total_amount, customer_name, address, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [JSON.stringify(items), total_amount, customer_name, address, status]
  );
  return result.rows[0];
};
export const getOrdersByStatus = async (status) => {
  const result = await pool.query(
    'SELECT * FROM orders WHERE status = $1 ORDER BY created_at DESC',
    [status]
  );
  return result.rows;
};

export const updateOrderStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};


export const updateOrder = async (id, { items, total_amount, customer_name, address, status }) => {
  const result = await pool.query(
    `UPDATE orders
     SET items = $1,
         total_amount = $2,
         customer_name = $3,
         address = $4,
         status = $5
     WHERE id = $6
     RETURNING *`,
    [JSON.stringify(items), total_amount, customer_name, address, status, id]
  );
  return result.rows[0];
};


export const deleteOrder = async (id) => {
  const result = await pool.query(
    'DELETE FROM orders WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
