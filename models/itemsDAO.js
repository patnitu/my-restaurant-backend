// models/itemsDAO.js
import pool from '../db.js';

// Get all items
export const getAllItems = async () => {
  const result = await pool.query('SELECT * FROM items ORDER BY id ASC');
  return result.rows;
};

// Get items by category
export const getItemsByCategory = async (categoryId) => {
  const result = await pool.query(
    'SELECT * FROM items WHERE category_id = $1 ORDER BY id ASC',
    [categoryId]
  );
  return result.rows;
};

// Get item by ID
export const getItemById = async (id) => {
  const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0];
};

// Create item
export const createItem = async ({ category_id, title, price, description, img_url }) => {
  const result = await pool.query(
    `INSERT INTO items (category_id, title, price, description, img_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [category_id, title, price, description, img_url]
  );
  return result.rows[0];
};

// Update item
export const updateItem = async (id, { category_id, title, price, description, img_url }) => {
  const result = await pool.query(
    `UPDATE items
     SET category_id = $1,
         title = $2,
         price = $3,
         description = $4,
         img_url = $5
     WHERE id = $6
     RETURNING *`,
    [category_id, title, price, description, img_url, id]
  );
  return result.rows[0];
};

// Delete item
export const deleteItem = async (id) => {
  const result = await pool.query(
    'DELETE FROM items WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
