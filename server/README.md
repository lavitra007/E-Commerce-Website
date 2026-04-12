# Farout Luxuries - Backend API

The Node.js and Express.js REST API providing secure user authentication, MongoDB integration, and robust JWT token management for the Farout Luxuries React frontend.

## ✨ Features
- **Secure Authentication**: End-to-end password encryption engineered using `bcryptjs`.
- **JWT Middleware**: Custom Route Protection mapping authentication state seamlessly with React using `jsonwebtoken`.
- **Database Architecture**: Resilient configurations tied directly exclusively to **MongoDB Atlas**.
- **Dynamic Sync Endpoint**: Protected `/api/auth/me` endpoint to synchronize the frontend if documents are hard-deleted.

## 🚀 Tech Stack
- Environment: **Node.js**
- Framework: **Express.js**
- Database: **MongoDB + Mongoose** 

## 🛠 Setup Instructions
1. Establish a `.env` file mapping `PORT` and a functioning `MONGO_URI`.
2. Install standard backend dependencies: `npm install`
3. Launch development mode: `npm run dev` (powered by *nodemon*)
