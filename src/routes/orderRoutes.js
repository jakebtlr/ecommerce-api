import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate, requireRole } from '../middleware/auth.js';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';

const router = Router();

const idParam = param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer');

router.post(
  '/',
  authenticate,
  [
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.productId')
      .isInt({ min: 1 })
      .withMessage('Each item must have a valid productId'),
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Each item must have a quantity of at least 1'),
  ],
  createOrder
);

router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, idParam, getOrder);
router.put(
  '/:id',
  authenticate,
  requireRole('admin'),
  [
    idParam,
    body('status')
      .isIn(['pending', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid status value'),
  ],
  updateOrder
);
router.delete('/:id', authenticate, idParam, deleteOrder);

export default router;