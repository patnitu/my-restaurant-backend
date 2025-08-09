// controllers/itemsController.js
import * as itemsDAO from '../models/itemsDAO.js';

export const getAllItems = async (req, res) => {
  try {
    const items = await itemsDAO.getAllItems();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching items');
  }
};

export const getItemsByCategory = async (req, res) => {
  try {
    const items = await itemsDAO.getItemsByCategory(req.params.categoryId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching items by category');
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await itemsDAO.getItemById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching item');
  }
};

export const createItem = async (req, res) => {
  try {
    const newItem = await itemsDAO.createItem(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating item');
  }
};

export const updateItem = async (req, res) => {
  try {
    const updated = await itemsDAO.updateItem(req.params.id, req.body);
    if (!updated) return res.status(404).send('Item not found');
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating item');
  }
};

export const deleteItem = async (req, res) => {
  try {
    const deleted = await itemsDAO.deleteItem(req.params.id);
    if (!deleted) return res.status(404).send('Item not found');
    res.json({ message: 'Item deleted', deleted });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting item');
  }
};
