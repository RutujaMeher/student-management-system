# 📚 Student Management System (Full Stack)

A modern full-stack Student Management System built using **React (Vite), Node.js, Express, and PostgreSQL**.  
It provides a clean UI to manage students and their subject-wise marks with full CRUD functionality.

---

## 🚀 Features

- ➕ Add new students
- 📋 View all students
- 👤 View individual student details
- 📊 Add subject-wise marks
- 📈 Auto-calculated average marks
- ✏️ Edit student details
- ❌ Delete student
- 🎨 Premium dark UI dashboard

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Custom CSS (Premium UI)

### Backend
- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

---

## 📁 Project Structure

Student_Management_System/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── db.js
│ ├── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api.js
│ │ ├── App.jsx



---

# ⚙️ Setup Instructions

---

## 📦 Prerequisites

Make sure you have installed:

- Node.js (v16+)
- PostgreSQL
- Git

---

# 🟢 Backend Setup

## 1️⃣ Go to backend folder

```bash
cd backend

## 2️⃣ Install dependencies

```bash
npm install
npm install express pg cors dotenv

## 3️⃣ Create .env file

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/student_db

Replace:
- username → PostgreSQL username
- password → PostgreSQL password
- student_db → database name

## 4️⃣ Create Database
Open PostgreSQL and run:

```SQL
CREATE DATABASE student_db;

Then connect to it and create tables:
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE marks (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  subject VARCHAR(100) NOT NULL,
  marks INT NOT NULL
);

## 5️⃣ Start Backend

```bash
node server.js

Backend runs on:
http://localhost:5000

# 🎨 Frontend Setup

## 1️⃣ Go to frontend folder

```bash
cd frontend

## 2️⃣ Install dependencies

```bash
npm install
npm install axios react-router-dom

## 3️⃣ Configure API

Create src/api.js:

```JavaScript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/students"
});

export default API;

## 4️⃣ Start Frontend

```bash
npm run dev

Frontend runs on:
http://localhost:5173

# 🔗 API Endpoints

## 👨‍🎓 Student APIs

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/students     | Get all students  |
| GET    | /api/students/:id | Get student by ID |
| POST   | /api/students     | Add student       |
| PUT    | /api/students/:id | Update student    |
| DELETE | /api/students/:id | Delete student    |

## 📊 Marks APIs

| Method | Endpoint                | Description |
| ------ | ----------------------- | ----------- |
| POST   | /api/students/:id/marks | Add marks   |

# 🎯 Project Flow

- Add Student → stored in PostgreSQL
- View Students → fetched from backend
- Add Marks → linked with student ID
- View Student → shows marks + average score

# 🎨 UI Highlights

- Dark modern dashboard
- Gradient buttons
- Responsive design
- Animated loading states
- Clean table UI

# 🐞 Common Issues

## ❌ Student not adding

- Check backend is running
- Check API URL in frontend

## ❌ Marks not showing

- Ensure correct JOIN query in backend

## ❌ Delete not working
- Verify API route and frontend call

# 🚀 Future Improvements

- JWT Authentication
- Student ranking system
- Search & filter
- Export marks to PDF
- Pagination

## 👨‍💻 Author

👤 **Rushikesh Parmeshwar Wakode**
- Full Stack Developer (React + Node + PostgreSQL)

* Github: [@rushiwakode](https://github.com/rushiwakode)
* LinkedIn: [@rushikesh-wakode](https://linkedin.com/in/rushikesh-wakode)

