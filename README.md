# 🚀 BlogSphere - Full Stack Blog Application

BlogSphere is a full-stack blogging platform built with **Next.js, React, Node.js, Express, and MongoDB**.

Users can register, login, create blogs, view blog details, update and delete blogs through a modern and responsive interface.

Developed during my Full Stack Development Internship at **Codomax Digital Solutions**.

## ✨ Features

- User Registration & Login
- Create Blogs
- View All Blogs
- View Individual Blog Details
- Update Blogs
- Delete Blogs
- Search Blogs
- Category Filtering
- Dashboard with Blog Statistics
- MongoDB Database Integration
- REST API Backend
- Responsive UI

## 🛠️ Tech Stack

### Frontend

- Next.js
- React.js
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools

- Git & GitHub
- VS Code
- Postman

## 🔗 CRUD API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/blogs` | Create Blog |
| GET | `/api/blogs` | Get All Blogs |
| GET | `/api/blogs/:id` | Get Single Blog |
| PUT | `/api/blogs/:id` | Update Blog |
| DELETE | `/api/blogs/:id` | Delete Blog |

## 📂 Project Structure

```text
BlogSphere
│
├── src
│   ├── app
│   └── components
│
├── blogsphere-backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
│
├── package.json
└── README.md
