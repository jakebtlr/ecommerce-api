import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';

const router = Router();

const idParam = param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer');

router.post(
  '/',
  authenticate,
  [
    body('productId').isInt({ min: 1 }).withMessage('productId must be a positive integer'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').notEmpty().withMessage('Comment is required'),
  ],
  createReview
);

router.get(
  '/',
  [
    query('productId')
      .optional()
      .isInt({ min: 1 })
      .withMessage('productId must be a positive integer'),
  ],
  getReviews
);

router.get('/:id', idParam, getReview);

router.put(
  '/:id',
  authenticate,
  [
    idParam,
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('comment').optional().notEmpty().withMessage('Comment cannot be empty'),
  ],
  updateReview
);

router.delete('/:id', authenticate, idParam, deleteReview);

export default router;