import * as reviewRepository from '../repositories/reviewRepository.js';
import * as productRepository from '../repositories/productRepository.js';

export async function createReview(userId, { productId, rating, comment }) {
  try {
    const product = await productRepository.findProductById(productId);
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }
    const existing = await reviewRepository.findReviewByUserAndProduct(userId, productId);
    if (existing) {
      const err = new Error('You have already reviewed this product');
      err.status = 409;
      throw err;
    }
    return await reviewRepository.createReview({ userId, productId, rating, comment });
  } catch (err) {
    throw err;
  }
}

export async function getReviews(productId) {
  try {
    return await reviewRepository.findAllReviews(productId);
  } catch (err) {
    throw err;
  }
}

export async function getReview(id) {
  try {
    const review = await reviewRepository.findReviewById(id);
    if (!review) {
      const err = new Error('Review not found');
      err.status = 404;
      throw err;
    }
    return review;
  } catch (err) {
    throw err;
  }
}

export async function updateReview(id, userId, { rating, comment }) {
  try {
    const review = await reviewRepository.findReviewById(id);
    if (!review) {
      const err = new Error('Review not found');
      err.status = 404;
      throw err;
    }
    if (review.userId !== userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
    return await reviewRepository.updateReview(id, { rating, comment });
  } catch (err) {
    throw err;
  }
}

export async function deleteReview(id, user) {
  try {
    const review = await reviewRepository.findReviewById(id);
    if (!review) {
      const err = new Error('Review not found');
      err.status = 404;
      throw err;
    }
    if (user.role !== 'admin' && review.userId !== user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
    return await reviewRepository.deleteReview(id);
  } catch (err) {
    throw err;
  }
}