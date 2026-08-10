# 🚀 BlogSphere – Full Stack Blog Application

**BlogSphere** is a full-stack blogging platform built with **Next.js, React, Node.js, Express.js, MongoDB, and JWT Authentication**.

Users can register and securely log in, create and manage their own blogs, view blog details, and access a protected dashboard with profile and logout functionality.

Developed during my **Full Stack Development Internship at Codomax Digital Solutions**.

## ✨ Features

* 🔐 User Registration & Login
* 🔑 JWT Authentication
* 🛡️ Protected Dashboard
* 👤 User Profile
* 🚪 Logout Functionality
* ✍️ Create Blogs
* 📖 View All Blogs
* 🔎 View Individual Blog Details
* ✏️ Update Blogs
* 🗑️ Delete Blogs
* 👥 User-Specific Blogs
* 🔍 Search Blogs
* 🏷️ Category Filtering
* 📊 Dashboard Blog Statistics
* 🍃 MongoDB Database Integration
* 🔗 REST API Backend
* 📱 Responsive UI

## 🛠️ Tech Stack

### Frontend

* Next.js
* React.js
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT

### Tools

* Git & GitHub
* VS Code
* Postman
* Vercel

## 🔐 Authentication

BlogSphere uses **JWT-based authentication** to secure user accounts and private dashboard routes.

After login:

* A JWT token is generated.
* Protected routes require authentication.
* Users can access their dashboard.
* Users can view and manage only their own blogs.
* Users can access their profile.
* Users can securely logout.

## 🔗 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Blog CRUD

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| POST   | `/api/blogs`     | Create Blog     |
| GET    | `/api/blogs`     | Get All Blogs   |
| GET    | `/api/blogs/:id` | Get Single Blog |
| PUT    | `/api/blogs/:id` | Update Blog     |
| DELETE | `/api/blogs/:id` | Delete Blog     |

## 📂 Project Structure

```text
BlogSphere
│
├── src
│   ├── app
│   │   ├── login
│   │   ├── register
│   │   ├── dashboard
│   │   ├── profile
│   │   ├── create-blog
│   │   └── ...
│   │
│   └── components
│       ├── Navbar
│       ├── BlogCard
│       ├── FeaturedBlogs
│       ├── Categories
│       └── ...
│
├── blogsphere-backend
│   ├── controllers
│   │   ├── authController.js
│   │   └── blogController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Blog.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── blogRoutes.js
│   │
│   └── server.js
│
├── package.json
└── README.md
```

## 🎨 UI

BlogSphere uses a modern **cream and maroon theme** with a responsive design built using Tailwind CSS.

The application includes:

* Home Page
* Login & Register
* Blog Listing
* Blog Details
* Create Blog
* Dashboard
* Profile
* Responsive Navigation
* Footer

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/durezainab21/BlogSphere.git
cd BlogSphere
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd blogsphere-backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory and add your MongoDB connection string and JWT secret.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. Start Backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 6. Start Frontend

From the main project directory:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

## 📌 Internship Project

This project was developed as part of my **Full Stack Development Internship at Codomax Digital Solutions**.

It helped me gain practical experience in:

* Full Stack Development
* REST API Development
* MongoDB Database Integration
* JWT Authentication
* CRUD Operations
* Protected Routes
* React & Next.js
* Git & GitHub
* API Testing with Postman

## 👩‍💻 Developer

**Dur-e-Zainab**

BS Computer Science Student
Government College Women University, Faisalabad


```
```
