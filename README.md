# 🍽️ Restaurant Utilities Backend

![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green)
![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen)
![JWT](https://img.shields.io/badge/Authentication-JWT-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

The **Restaurant Utilities Backend** is a secure and scalable server-side API for managing restaurant registration, authentication, and operations.  
It powers the frontend built with React and provides RESTful endpoints for user management, data handling, and future expansion modules.

---

## ⚙️ Core Features

- 🔐 **Authentication System**
  - Register new restaurants
  - Login with JWT-based session
  - Logout with token invalidation (optional)
  - Password encryption using bcrypt

- 🧾 **Data Management**
  - Store and manage restaurant data (name, email, phone, address)
  - MongoDB schema using Mongoose models

- 🧠 **Middleware & Security**
  - JWT verification middleware for protected routes
  - Input validation and error handling
  - Secure password storage

- 🌐 **API Architecture**
  - RESTful design
  - Modular and scalable folder structure

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for API routing |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT (jsonwebtoken)** | Authentication and authorization |
| **bcryptjs** | Password hashing |
| **dotenv** | Environment variable management |
| **CORS** | Cross-Origin Resource Sharing |

---

## 🗂️ Folder Structure

backend/
├── config/
│ └── db.js # MongoDB connection setup
│
├── controllers/
│ ├── authController.js # Handles login, register, logout
│ └── userController.js # Handles restaurant profile actions
│
├── middlewares/
│ └── authMiddleware.js # JWT verification middleware
│
├── models/
│ └── Restaurant.js # Restaurant schema/model
│
├── routes/
│ └── authRoutes.js # Routes for authentication
│
├── utils/
│ └── generateToken.js # JWT token generation helper
│
├── .env # Environment variables (not committed)
├── server.js # Main server file
├── package.json
└── README.md

yaml




## ⚡ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/restaurant-utilities-backend.git
cd restaurant-utilities-backend
2️⃣ Install Dependencies
bash

npm install
3️⃣ Create .env File
Create a .env file in the root directory and add your configuration:

bash

PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_utilities
JWT_SECRET=your_jwt_secret_key
4️⃣ Start Server
bash

# Development mode (with nodemon)
npm run dev

# Production mode
npm start
