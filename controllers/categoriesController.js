// controllers/categoriesController.js
import * as categoriesDAO from '../models/categoriesDAO.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesDAO.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching categories');
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await categoriesDAO.getCategoryById(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching category');
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = await categoriesDAO.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating category');
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updated = await categoriesDAO.updateCategory(req.params.id, req.body);
    if (!updated) return res.status(404).send('Category not found');
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating category');
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await categoriesDAO.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).send('Category not found');
    res.json({ message: 'Category deleted', deleted });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting category');
  }
};
export const getCategoriesWithItems = async (req, res) => {
  try {
    const data = await categoriesDAO.getCategoriesWithItems();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching categories with items');
  }
};

