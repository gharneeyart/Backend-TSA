import express from 'express';
import { createCategory, deleteCategory, getAllCategory, getCategoryBySlug, getOneCategory, updateCategory } from '../controllers/category.js';
import { isAdmin, isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create',isLoggedIn, isAdmin, createCategory)
router.get('/categories', getAllCategory)
router.get('/category/:categoryId', getOneCategory)
router.get('/slug/:slug', getCategoryBySlug)
router.put('/update/:categoryId', isLoggedIn, isAdmin, updateCategory)
router.delete('/:categoryId', deleteCategory)

export default router;