import * as orderRepository from '../repositories/orderRepository.js';
import * as productRepository from '../repositories/productRepository.js';

export async function createOrder(userId, items) {
  try {
    let total = 0;
    const enrichedItems = [];

    for (const item of items) {
      const product = await productRepository.findProductById(item.productId);
      if (!product) {
        const err = new Error(`Product ${item.productId} not found`);
        err.status = 404;
        throw err;
      }
      if (product.stock < item.quantity) {
        const err = new Error(`Insufficient stock for product ${item.productId}`);
        err.status = 400;
        throw err;
      }
      const unitPrice = Number(product.price);
      total += unitPrice * item.quantity;
      enrichedItems.push({ productId: item.productId, quantity: item.quantity, unitPrice });
    }

    for (const item of enrichedItems) {
      await productRepository.decrementStock(item.productId, item.quantity);
    }

    return await orderRepository.createOrder({ userId, total, items: enrichedItems });
  } catch (err) {
    throw err;
  }
}

export async function getOrders(user) {
  try {
    if (user.role === 'admin') {
      return await orderRepository.findAllOrders();
    }
    return await orderRepository.findOrdersByUser(user.id);
  } catch (err) {
    throw err;
  }
}

export async function getOrder(id, user) {
  try {
    const order = await orderRepository.findOrderById(id);
    if (!order) {
      const err = new Error('Order not found');
      err.status = 404;
      throw err;
    }
    if (user.role !== 'admin' && order.userId !== user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
    return order;
  } catch (err) {
    throw err;
  }
}

export async function updateOrder(id, status) {
  try {
    const order = await orderRepository.findOrderById(id);
    if (!order) {
      const err = new Error('Order not found');
      err.status = 404;
      throw err;
    }
    return await orderRepository.updateOrderStatus(id, status);
  } catch (err) {
    throw err;
  }
}

export async function deleteOrder(id, user) {
  try {
    const order = await orderRepository.findOrderById(id);
    if (!order) {
      const err = new Error('Order not found');
      err.status = 404;
      throw err;
    }
    if (user.role !== 'admin' && order.userId !== user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
    if (order.status !== 'pending') {
      const err = new Error('Only pending orders can be deleted');
      err.status = 400;
      throw err;
    }
    return await orderRepository.deleteOrder(id);
  } catch (err) {
    throw err;
  }
}