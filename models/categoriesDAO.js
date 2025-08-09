// models/categoriesDAO.js
import pool from '../db.js';

// Get all categories
export const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories ORDER BY id ASC');
  return result.rows;
};

// Get category by ID
export const getCategoryById = async (id) => {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0];
};

// Create category
export const createCategory = async ({ title, icon, event }) => {
  const result = await pool.query(
    `INSERT INTO categories (title, icon, event)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, icon, event]
  );
  return result.rows[0];
};

// Update category
export const updateCategory = async (id, { title, icon, event }) => {
  const result = await pool.query(
    `UPDATE categories
     SET title = $1,
         icon = $2,
         event = $3
     WHERE id = $4
     RETURNING *`,
    [title, icon, event, id]
  );
  return result.rows[0];
};

// Delete category
export const deleteCategory = async (id) => {
  const result = await pool.query(
    'DELETE FROM categories WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
export const getCategoriesWithItems = async () => {
  const result = await pool.query(`
    SELECT 
      c.id AS category_id,
      c.title AS category_title,
      c.icon,
      c.event,
      i.id AS item_id,
      i.title AS item_title,
      i.price,
      i.description,
      i.img_url
    FROM categories c
    LEFT JOIN items i ON c.id = i.category_id
    ORDER BY c.id ASC, i.id ASC
  `);

  // Restructure to desired nested format
  const categoriesMap = {};
  result.rows.forEach(row => {
    if (!categoriesMap[row.category_id]) {
      categoriesMap[row.category_id] = {
        id: row.category_id,
        title: row.category_title,
        icon: row.icon,
        event: row.event,
        items: []
      };
    }
    if (row.item_id) {
      categoriesMap[row.category_id].items.push({
        id: row.item_id,
        title: row.item_title,
        price: row.price,
        desc: row.description,
        img: row.img_url
      });
    }
  });

  return Object.values(categoriesMap);
};
