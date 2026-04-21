import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate, requireRole } from '../middleware/auth.js';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = Router();

const idParam = param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer');

const productBody = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('categoryId').isInt({ min: 1 }).withMessage('categoryId must be a positive integer'),
];

router.post('/', authenticate, requireRole('admin'), productBody, createProduct);
router.get('/', getProducts);
router.get('/:id', idParam, getProduct);
router.put('/:id', authenticate, requireRole('admin'), [idParam, ...productBody], updateProduct);
router.delete('/:id', authenticate, requireRole('admin'), idParam, deleteProduct);

export default router;