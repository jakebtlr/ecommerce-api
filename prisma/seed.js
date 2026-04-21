import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data in dependency order
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const customerPassword = await bcrypt.hash('Customer123!', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: adminPassword,
      role: 'admin',
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      passwordHash: customerPassword,
      role: 'customer',
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      name: 'John Smith',
      email: 'john@example.com',
      passwordHash: customerPassword,
      role: 'customer',
    },
  });

  // Categories
  const electronics = await prisma.category.create({ data: { name: 'Electronics' } });
  const clothing = await prisma.category.create({ data: { name: 'Clothing' } });

  // Products
  const headphones = await prisma.product.create({
    data: {
      categoryId: electronics.id,
      name: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones.',
      price: 89.99,
      stock: 150,
    },
  });

  const keyboard = await prisma.product.create({
    data: {
      categoryId: electronics.id,
      name: 'Mechanical Keyboard',
      description: 'Compact TKL mechanical keyboard with RGB lighting.',
      price: 129.99,
      stock: 75,
    },
  });

  const jacket = await prisma.product.create({
    data: {
      categoryId: clothing.id,
      name: 'Waterproof Jacket',
      description: 'Lightweight waterproof jacket for outdoor use.',
      price: 59.99,
      stock: 200,
    },
  });

  // Orders
  const order1 = await prisma.order.create({
    data: {
      userId: customer1.id,
      status: 'pending',
      total: 179.98,
      items: {
        create: [{ productId: headphones.id, quantity: 2, unitPrice: 89.99 }],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: customer2.id,
      status: 'shipped',
      total: 129.99,
      items: {
        create: [{ productId: keyboard.id, quantity: 1, unitPrice: 129.99 }],
      },
    },
  });

  // Reviews
  await prisma.review.create({
    data: {
      userId: customer1.id,
      productId: headphones.id,
      rating: 5,
      comment: 'Excellent sound quality!',
    },
  });

  await prisma.review.create({
    data: {
      userId: customer2.id,
      productId: keyboard.id,
      rating: 4,
      comment: 'Great keyboard, but the software is lacking.',
    },
  });

  console.log('Seed complete.');
  console.log('Admin:     admin@example.com  / Admin123!');
  console.log('Customer1: jane@example.com   / Customer123!');
  console.log('Customer2: john@example.com   / Customer123!');
  console.log(`Orders: #${order1.id} (jane, pending), #${order2.id} (john, shipped)`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());