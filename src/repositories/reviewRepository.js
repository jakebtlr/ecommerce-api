import prisma from '../lib/prisma.js';

export async function findReviewByUserAndProduct(userId, productId) {
  try {
    return await prisma.review.findUnique({
      where: { userId_productId: { userId, productId } },
    });
  } catch (err) {
    throw err;
  }
}

export async function createReview({ userId, productId, rating, comment }) {
  try {
    return await prisma.review.create({
      data: { userId, productId, rating, comment },
    });
  } catch (err) {
    throw err;
  }
}

export async function findAllReviews(productId) {
  try {
    return await prisma.review.findMany({
      where: productId ? { productId } : undefined,
      select: { id: true, userId: true, productId: true, rating: true, comment: true },
    });
  } catch (err) {
    throw err;
  }
}

export async function findReviewById(id) {
  try {
    return await prisma.review.findUnique({ where: { id } });
  } catch (err) {
    throw err;
  }
}

export async function updateReview(id, { rating, comment }) {
  try {
    return await prisma.review.update({
      where: { id },
      data: {
        ...(rating !== undefined && { rating }),
        ...(comment !== undefined && { comment }),
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function deleteReview(id) {
  try {
    return await prisma.review.delete({ where: { id } });
  } catch (err) {
    throw err;
  }
}