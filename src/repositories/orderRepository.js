import prisma from '../lib/prisma.js';

const orderInclude = {
  items: {
    select: { productId: true, quantity: true, unitPrice: true },
  },
};

export async function createOrder({ userId, total, items }) {
  try {
    return await prisma.order.create({
      data: {
        userId,
        total,
        items: { create: items },
      },
      include: orderInclude,
    });
  } catch (err) {
    throw err;
  }
}

export async function findAllOrders() {
  try {
    return await prisma.order.findMany({
      select: { id: true, userId: true, status: true, total: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    throw err;
  }
}

export async function findOrdersByUser(userId) {
  try {
    return await prisma.order.findMany({
      where: { userId },
      select: { id: true, userId: true, status: true, total: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    throw err;
  }
}

export async function findOrderById(id) {
  try {
    return await prisma.order.findUnique({
      where: { id },
      include: orderInclude,
    });
  } catch (err) {
    throw err;
  }
}

export async function updateOrderStatus(id, status) {
  try {
    return await prisma.order.update({
      where: { id },
      data: { status },
      select: { id: true, userId: true, status: true, total: true },
    });
  } catch (err) {
    throw err;
  }
}

export async function deleteOrder(id) {
  try {
    await prisma.orderItem.deleteMany({ where: { orderId: id } });
    return await prisma.order.delete({
      where: { id },
      select: { id: true, userId: true, status: true, total: true },
    });
  } catch (err) {
    throw err;
  }
}