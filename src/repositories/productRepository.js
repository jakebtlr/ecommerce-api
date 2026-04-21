import prisma from '../lib/prisma.js';

export async function findCategoryById(id) {
  try {
    return await prisma.category.findUnique({ where: { id } });
  } catch (err) {
    throw err;
  }
}

export async function createProduct({ name, description, price, stock, categoryId }) {
  try {
    return await prisma.product.create({
      data: { name, description, price, stock, categoryId },
    });
  } catch (err) {
    throw err;
  }
}

export async function findAllProducts() {
  try {
    return await prisma.product.findMany({
      select: { id: true, categoryId: true, name: true, price: true, stock: true },
    });
  } catch (err) {
    throw err;
  }
}

export async function findProductById(id) {
  try {
    return await prisma.product.findUnique({ where: { id } });
  } catch (err) {
    throw err;
  }
}

export async function updateProduct(id, { name, description, price, stock, categoryId }) {
  try {
    return await prisma.product.update({
      where: { id },
      data: { name, description, price, stock, categoryId },
    });
  } catch (err) {
    throw err;
  }
}

export async function deleteProduct(id) {
  try {
    return await prisma.product.delete({ where: { id } });
  } catch (err) {
    if (err.code === 'P2003') {
      const e = new Error('Cannot delete product that is referenced by existing orders');
      e.status = 409;
      throw e;
    }
    throw err;
  }
}

export async function decrementStock(id, quantity) {
  try {
    return await prisma.product.update({
      where: { id },
      data: { stock: { decrement: quantity } },
    });
  } catch (err) {
    throw err;
  }
}