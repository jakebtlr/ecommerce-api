import { validationResult } from 'express-validator';
import * as reviewService from '../services/reviewService.js';

export async function createReview(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const review = await reviewService.createReview(req.user.id, req.body);
    res.status(201).json(review);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    next(err);
  }
}

export async function getReviews(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const productId = req.query.productId ? Number(req.query.productId) : undefined;
    const reviews = await reviewService.getReviews(productId);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}

export async function getReview(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const review = await reviewService.getReview(Number(req.params.id));
    res.json(review);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    next(err);
  }
}

export async function updateReview(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const review = await reviewService.updateReview(
      Number(req.params.id),
      req.user.id,
      req.body
    );
    res.json(review);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    next(err);
  }
}

export async function deleteReview(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const review = await reviewService.deleteReview(Number(req.params.id), req.user);
    res.json(review);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    next(err);
  }
}