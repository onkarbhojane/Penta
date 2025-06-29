📊 Financial Analytics Dashboard
An end-to-end full-stack financial analytics dashboard that enables authenticated users to visualize, search, filter, and export transaction data. Built with React (TypeScript), Node.js, MongoDB, and JWT-based authentication.

🧩 Tech Stack
🚀 Frontend
React.js (TypeScript)

Material UI

Chart.js

Axios, React Router DOM

🔧 Backend
Node.js with TypeScript

Express.js

MongoDB + Mongoose

JWT Authentication

CSV & Excel Generation

📁 Project Structure
Frontend: frontend/
bash
Copy
Edit
frontend/
├── public/
├── src/
│   ├── assets/                 # Images, icons
│   ├── components/             # Reusable UI components
│   │   └── dashboard/          # Dashboard specific components
│   ├── pages/
│   │   ├── Auth/               # Login/Signup pages
│   │   └── Dashboard/          # Main dashboard UI
│   ├── routes/                 # Routing definitions
│   ├── services/               # API and CSV export services
│   ├── types/                  # TypeScript types/interfaces
│   ├── utils/                  # Formatting & validation utils
│   ├── App.tsx
│   └── index.tsx
├── .env
└── package.json
Backend: backend/
bash
Copy
Edit
backend/
├── src/
│   ├── controllers/            # Controller logic (auth, transactions)
│   ├── models/                 # MongoDB schema models
│   ├── routes/                 # Express route handlers
│   ├── services/               # Business logic
│   ├── utils/                  # Helper functions
│   ├── middlewares/           # Auth middleware
│   ├── config/                 # DB connection config
│   └── server.ts              # App entry point
├── .env
└── package.json
✅ Features
🧑‍💼 Authentication
Secure JWT login

Role-based protected routes

📊 Dashboard Analytics
Revenue vs Expense charts

Category-wise breakdown

Summary cards (balance, total revenue, total expense)

Transaction table with pagination

🔍 Filters & Search
Filter by Date, Category, Amount, Status, User

Column sorting

Global search

📤 Export Options
Export CSV with selected columns

Export Financial Report in Excel format

⚙️ Setup Instructions
🖥️ Prerequisites
Node.js >=18.x

MongoDB

npm

🚀 Setup
bash
Copy
Edit
git clone https://github.com/onkarbhojane/Penta
Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Backend
bash
Copy
Edit
cd backend
npm install
Create .env in backend/:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=pqrs
EMAIL_USER="onkar.bhojane22@gmail.com"
EMAIL_PASS="elvt vask mdlq clng"
Then run the backend:

bash
Copy
Edit
npm run dev
📡 API Endpoints
🔐 Auth
Method	Endpoint	Description
POST	/api/auth/login	Login user
GET	/api/auth/profile	Get profile info

💸 Transaction APIs
Method	Endpoint	Description
GET	/api/transactions	Get transactions with filters
GET	/api/transactions/export	Export filtered transactions CSV
GET	/api/transactions/export-financial-report	Download Excel Financial Report

🛡️ All routes require the JWT token:

makefile
Copy
Edit
Authorization: Bearer <your_token_here>
🧾 Export Financial Report API
Method: GET

URL: http://localhost:5000/api/transactions/export-financial-report

Headers:

Authorization: Bearer <JWT token>

Response: Excel file (.xlsx)

Example:
vbnet
Copy
Edit
GET /api/transactions/export-financial-report HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
📦 Sample Transaction Format
json
Copy
Edit
{
  "id": "txn123",
  "date": "2024-06-01T00:00:00Z",
  "amount": 1500,
  "category": "Expense",
  "status": "Paid",
  "user_id": "User_004",
  "type": "Expense"
}
📤 CSV / Excel Export Examples
Date	Amount	Category	Status	User
2024-06-01	1500	Expense	Paid	User_004

CSV: Via /api/transactions/export

Excel: Via /api/transactions/export-financial-report

🛠 TODO / Improvements
 Date-range filter

 Grouped financial summary charts (monthly/quarterly)

 Role-based access for admins vs analysts

 Audit trail for downloads

Let me know if you want this saved as a downloadable README.md or deployed version link added.








You said:
give complete in one file


ChatGPT said:
Here’s the complete updated README.md in a single file format, including the newly added API for exporting the financial report:

markdown
Copy
Edit
# 📊 Financial Analytics Dashboard

An end-to-end full-stack financial analytics dashboard that enables authenticated users to visualize, search, filter, and export transaction data. Built with **React (TypeScript)**, **Node.js**, **MongoDB**, and JWT-based authentication.

---

## 🧩 Tech Stack

### 🚀 Frontend

- **React.js (TypeScript)**
- **Material UI**
- **Chart.js**
- **Axios**, **React Router DOM**

### 🔧 Backend

- **Node.js with TypeScript**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **CSV Generation**

---

## 📁 Project Structure

### Frontend: `frontend/`

frontend/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ └── dashboard/
│ ├── pages/
│ │ ├── Auth/
│ │ └── Dashboard/
│ ├── routes/
│ ├── services/
│ ├── types/
│ ├── utils/
│ ├── App.tsx
│ └── index.tsx
├── .env
└── package.json

shell
Copy
Edit

### Backend: `backend/`

backend/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── middlewares/
│ ├── config/
│ └── server.js
├── .env
└── package.json

yaml
Copy
Edit

---

## ✅ Features

### 🧑‍💼 Authentication

- Secure **JWT-based login**
- Protected routes and APIs

### 📊 Financial Dashboard

- Revenue vs Expenses visualizations
- Category-wise breakdown
- Summary metrics
- Paginated Transaction table

### 🔍 Advanced Filters & Search

- Filter by Date, Category, Amount, Status, User
- Column-based Sorting
- Real-time Search

### 📤 CSV Export

- Configurable columns
- One-click download from browser

---

## ⚙️ Setup Instructions

### 🖥️ Prerequisites

- Node.js `>= 18.x`
- MongoDB instance
- npm

### 🔽 Clone the Repository

```bash
git clone https://github.com/onkarbhojane/Penta
🚀 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
🔧 Backend Setup
bash
Copy
Edit
cd backend
npm install
✏️ Create .env
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=pqrs
EMAIL_USER="onkar.bhojane22@gmail.com"
EMAIL_PASS="elvt vask mdlq clng"
▶️ Run Dev Server
bash
Copy
Edit
npm run dev
📡 API Endpoints
🔐 Auth APIs
Method	Endpoint	Description
POST	/api/auth/login	User login
GET	/api/auth/profile	Get user profile

💸 Transaction APIs
Method	Endpoint	Description
GET	/api/transactions	Get transactions with filters
GET	/api/transactions/export	Export selected columns as CSV
GET	/api/transactions/export-financial-report	Export full financial report as Excel

All transaction endpoints require JWT token in header:
Authorization: Bearer <token>

📁 Sample Data Format
json
Copy
Edit
{
  "id": "txn123",
  "date": "2024-06-01T00:00:00Z",
  "amount": 1500,
  "category": "Expense",
  "status": "Paid",
  "user_id": "User_004",
  "type": "Expense"
}
📦 CSV/Excel Export Example
Date	Amount	Category	Status	User
2024-06-01	1500	Expense	Paid	User_004

Uses GET /api/transactions/export-financial-report

Automatically generates .xlsx file

JWT must be passed in Authorization header

Example Request:

bash
Copy
Edit
GET http://localhost:5000/api/transactions/export-financial-report
Authorization: Bearer <your_token_here>
📌 TODO / Improvements
 Add date-range filters to dashboard

 Advanced analytics by month/quarter/year

 Add role-based access (admin, analyst, user)

vbnet
Copy
Edit

Let me know if you'd like this exported as a downloadable `README.md` file.
