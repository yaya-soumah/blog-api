# Blog API

A fully-featured RESTful Blog API built with **Node.js**, **TypeScript**, **Express**, **Sequelize**, and **PostgreSQL** — includes user authentication, posts, comments, likes, role-based access control, background notifications, and Swagger API docs.

## Features

- User Registration, Login (JWT-based)
- Role-based Access Control (user/admin)
- CRUD operations for Posts and Comments
- Like system for posts and comments
- Soft delete support
- Background processing using BullMQ & Redis
- Email notifications on like events
- Validation using Zod
- Swagger API Docs (`/docs`)
- Clean architecture (controllers, services, repositories)
- Type-safe with TypeScript

---

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Sequelize ORM
- PostgreSQL (production) / SQLite (test)
- Redis + BullMQ (background jobs)
- JWT + bcrypt
- Swagger (OpenAPI docs)
- Zod (validation)
- Nodemailer (email support)

---

## Installation

```bash
git clone https://github.com/yaya-soumah/blog-api.git
cd blog-api

# Install dependencies
npm install

# Create a .env file from .env.example
Example .env
```bash
NODE_ENV=development
PORT=8080
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog_api
DB_USER=username
DB_PASS=db-password
TEST_DB_STORAGE=:memory:
ACCESS_TOKEN_SECRET=your-secret-code
REFRESH_TOKEN_SECRET="your-refresh-secret-code"
ACCESS_TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_IN=7d
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

# Build the project
npm run build

# Run the dev server
npm run dev
```

# API Documentation
Swagger UI available at:

```bash
GET http://localhost:8080/docs
```

# Author
Yaya Soumah — [LinkedIn](www.linkedin.com/in/yaya-soumah-11b75b1b9) | Backend Developer 