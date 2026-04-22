# E-Commerce API

A RESTful API for a simple e-commerce platform built with Node.js, Express, PostgreSQL, and Prisma ORM. Supports product browsing, order management, and customer reviews with JWT-based authentication and role-based access control.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JSON Web Tokens (JWT) + bcrypt
- **Validation:** express-validator
- **Documentation:** Swagger UI (OpenAPI 3.0)

## Resources

| Resource | Description |
|----------|-------------|
| Users | Registration, login, JWT auth |
| Products | Full CRUD, admin-managed |
| Orders | Full CRUD, ownership-scoped |
| Reviews | Full CRUD, ownership-scoped |

## User Roles

| Role | Permissions |
|------|-------------|
| `admin` | Full access — manage products, view all orders |
| `customer` | Browse products, place and manage own orders, write reviews |

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-api.git
cd ecommerce-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/ecommerce_db"
JWT_SECRET="your-secret-key"
NODE_ENV=development
```

### Database Setup

```bash
npx prisma migrate dev --name init
npm run seed
```

### Running Locally

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.
Swagger UI documentation is available at `http://localhost:3000/api/docs`.

## API Documentation

Full interactive documentation is available via Swagger UI at `/api/docs`. All protected endpoints support JWT authentication via the Authorize button.

### Endpoints Overview

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/signup` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |
| GET | `/api/orders` | Authenticated |
| POST | `/api/orders` | Authenticated |
| GET | `/api/orders/:id` | Owner or Admin |
| PUT | `/api/orders/:id` | Admin |
| DELETE | `/api/orders/:id` | Owner or Admin |
| GET | `/api/reviews` | Public |
| GET | `/api/reviews/:id` | Public |
| POST | `/api/reviews` | Authenticated |
| PUT | `/api/reviews/:id` | Owner |
| DELETE | `/api/reviews/:id` | Owner or Admin |

## Seed Credentials

After running `npm run seed`, the following accounts are available for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@example.com` | `Admin123!` |
| Customer | `jane@example.com` | `Customer123!` |
| Customer | `john@example.com` | `Customer123!` |

## Deployment

This API is deployed on Render. The `build` script handles migration and seeding automatically:

```
prisma generate && prisma migrate deploy && node --env-file=.env prisma/seed.js
```

Set `DATABASE_URL` and `JWT_SECRET` as environment variables in your Render service dashboard.
