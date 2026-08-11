# 🚀 BlogSphere – Full Stack Blog Application

BlogSphere is a modern full-stack blogging platform where users can register, securely log in, create blogs, manage their own posts, and explore published content.

The application was developed as part of my **Full Stack Development Internship at Codomax Digital Solutions**.

## 🌐 Project

**BlogSphere – Full Stack Blog Platform**

### ✨ Features

* 🔐 User Registration & Login
* 🔑 JWT Authentication
* 🛡️ Protected Dashboard
* 👤 User Profile
* ✍️ Create Blog Posts
* 📝 Edit Blog Posts
* 🗑️ Delete Blog Posts
* 📚 View Published Blogs
* 👤 View Only Your Own Blogs
* 📌 Draft & Published Blog Status
* 🔎 Blog Details Page
* 📊 Dashboard Statistics
* 📱 Responsive UI
* 🗄️ MongoDB Database
* 🔒 Password Hashing with bcrypt
* 🚪 Secure Logout

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* REST API
* JWT
* bcryptjs

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* VS Code
* Postman

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
```

## 🔐 Authentication

BlogSphere uses **JWT-based authentication**.

When a user logs in:

1. Credentials are sent to the backend.
2. The backend verifies the user.
3. A JWT token is generated.
4. The token is stored on the frontend.
5. Protected requests send the token using:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

The backend middleware verifies the token before allowing access to protected routes.

## 📝 Blog Management

Authenticated users can:

* Create blogs
* Save blogs as drafts
* Publish blogs
* Edit their own blogs
* Delete their own blogs
* View their personal dashboard

Users cannot edit or delete blogs belonging to another user.

## 📊 Dashboard

The dashboard provides a personalized view for the logged-in user.

It displays:

* Total Blogs
* Published Blogs
* Draft Blogs
* Recent Blogs
* User Profile
* Blog Actions

Only blogs belonging to the currently authenticated user are displayed in the dashboard.

## 🔗 API Routes

### Authentication

| Method | Endpoint             | Access |
| ------ | -------------------- | ------ |
| POST   | `/api/auth/register` | Public |
| POST   | `/api/auth/login`    | Public |

### Blogs

| Method | Endpoint         | Access    |
| ------ | ---------------- | --------- |
| GET    | `/api/blogs`     | Public    |
| GET    | `/api/blogs/:id` | Public    |
| GET    | `/api/blogs/my`  | Protected |
| POST   | `/api/blogs`     | Protected |
| PUT    | `/api/blogs/:id` | Protected |
| DELETE | `/api/blogs/:id` | Protected |

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/durezainab21/BlogSphere.git
```

### 2. Open the Project

```bash
cd BlogSphere
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Install Backend Dependencies

```bash
cd blogsphere-backend
npm install
```

### 5. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Create the frontend environment file if required:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> Never upload `.env` files or secret keys to GitHub.

## ▶️ Run the Application

### Start Backend

From the backend directory:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### Start Frontend

From the project root:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

## 🧪 Testing

The following functionality has been tested:

* ✅ User Registration
* ✅ User Login
* ✅ JWT Authentication
* ✅ Protected Dashboard
* ✅ Create Blog
* ✅ View Blog
* ✅ Edit Blog
* ✅ Delete Blog
* ✅ Draft Blogs
* ✅ Published Blogs
* ✅ User-specific Blogs
* ✅ Logout
* ✅ Responsive UI

## 🎨 UI

BlogSphere uses a clean and modern design with a warm cream and maroon color palette.

The interface is designed to be:

* Clean
* Responsive
* User-friendly
* Mobile-friendly
* Easy to navigate

## 🔒 Security

BlogSphere includes several security practices:

* JWT authentication
* Password hashing using bcryptjs
* Protected backend routes
* User ownership verification
* Environment variables for secrets
* Input validation
* MongoDB ObjectId validation

## 🚀 Deployment

The application is prepared for deployment using platforms such as:

* Vercel – Frontend
* Render – Backend
* MongoDB Atlas – Database

### Production Environment

Before deployment, update the frontend API URL from:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

to your deployed backend URL.

Also configure the production MongoDB connection string and JWT secret on the backend hosting platform.

## 📸 Screenshots

Add screenshots of your application here:

```text
Home Page
Dashboard
Login
Register
Create Blog
Blog Details
Edit Blog
```

Example:

```markdown
![BlogSphere Home](./screenshots/home.png)
```

## 🎓 Internship Project

This project was developed during my **Full Stack Development Internship at Codomax Digital Solutions**.

The project helped me gain practical experience in:

* Frontend Development
* Backend Development
* REST APIs
* MongoDB
* Authentication
* JWT
* CRUD Operations
* Git & GitHub
* Deployment

## 👩‍💻 Developer

**Dur e Zainab**

BS Computer Science Student

GitHub:
https://github.com/durezainab21

## 📌 Repository

GitHub Repository:

https://github.com/durezainab21/BlogSphere

## 📄 License

This project is created for educational and internship purposes.
