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
git clone https://github.com/YOUR_USERNAME/blog-api.git
cd blog-api

# Install dependencies
npm install

# Create a .env file from .env.example
cp .env.example .env

# Build the project
npm run build

# Run the dev server
npm run dev
```
# API Documentation
Swagger UI available at:

```bash
GET http://localhost:5000/docs
```

# Author
Yaya Soumah — [LinkedIn](https://www.linkedin.com) | Backend Developer 