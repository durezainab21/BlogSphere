# 🚀 BlogSphere – Full Stack Blog Application

BlogSphere is a modern full-stack blogging platform that allows users to register, securely log in, create and manage their own blog posts, save drafts, publish content, and explore published blogs.

The application was developed as part of my **Full Stack Development Internship at Codomax Digital Solutions**.

---

## 🌐 Live Demo

🔗 **Live Application:**  
https://blog-sphere-hbvr.vercel.app/

🔗 **GitHub Repository:**  
https://github.com/durezainab21/BlogSphere

---

## ✨ Features

- 🔐 User Registration & Login
- 🔑 JWT-Based Authentication
- 🛡️ Protected Dashboard
- 👤 Personalized User Profile
- ✍️ Create Blog Posts
- 📝 Edit Blog Posts
- 🗑️ Delete Blog Posts
- 📚 View Published Blogs
- 👤 User-Specific Blog Management
- 📌 Draft & Published Blog Status
- 🔎 Blog Details Page
- 📊 Dashboard Statistics
- 📱 Responsive Design
- 🗄️ MongoDB Database
- 🔒 Password Hashing with bcryptjs
- 🚪 Secure Logout
- 🔐 Protected Blog Operations

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- REST API
- JSON Web Token (JWT)
- bcryptjs

### Database

- MongoDB
- Mongoose

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- Vercel

---

## 📂 Project Structure

```text
BlogSphere/
│
├── blogsphere-backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── blogRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── app/
│   │   ├── blog/
│   │   ├── create-blog/
│   │   ├── dashboard/
│   │   ├── edit-blog/
│   │   ├── login/
│   │   └── register/
│   │
│   └── components/
│
├── public/
├── .gitignore
├── package.json
└── README.md
