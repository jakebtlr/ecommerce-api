import * as productRepository from '../repositories/productRepository.js';

export async function createProduct({ name, description, price, stock, categoryId }) {
  try {
    const category = await productRepository.findCategoryById(categoryId);
    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      throw err;
    }
    return await productRepository.createProduct({ name, description, price, stock, categoryId });
  } catch (err) {
    throw err;
  }
}

export async function getProducts() {
  try {
    return await productRepository.findAllProducts();
  } catch (err) {
    throw err;
  }
}

export async function getProduct(id) {
  try {
    const product = await productRepository.findProductById(id);
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }
    return product;
  } catch (err) {
    throw err;
  }
}

export async function updateProduct(id, { name, description, price, stock, categoryId }) {
  try {
    const product = await productRepository.findProductById(id);
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }
    if (categoryId) {
      const category = await productRepository.findCategoryById(categoryId);
      if (!category) {
        const err = new Error('Category not found');
        err.status = 404;
        throw err;
      }
    }
    return await productRepository.updateProduct(id, { name, description, price, stock, categoryId });
  } catch (err) {
    throw err;
  }
}

export async function deleteProduct(id) {
  try {
    const product = await productRepository.findProductById(id);
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }
    return await productRepository.deleteProduct(id);
  } catch (err) {
    throw err;
  }
}