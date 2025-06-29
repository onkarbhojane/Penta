# 📊 Financial Analytics Dashboard

An end-to-end full-stack financial analytics dashboard that enables authenticated users to visualize, search, filter, and export transaction data. Built with **React (TypeScript)**, **Node.js**, **MongoDB**, and JWT-based authentication.

---

## 🔗 Live Demo / Figma Design

> 💡 Add link here when available:
> **Figma Design:** [Click here](#)

---

## 🧩 Tech Stack

### 🚀 Frontend

- **React.js (TypeScript)**
- **Material UI** or **Chakra UI**
- **Chart.js / Recharts**
- **Axios**, **React Router DOM**

### 🔧 Backend

- **Node.js with TypeScript**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **CSV Generation (e.g., `fast-csv` / `csv-writer`)**

---

## 📁 Project Structure

### Frontend: `frontend/`

```
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
├── package.json
└── README.md
```

### Backend: `backend/`

```
backend/
├── src/
│   ├── controllers/           # Controller logic (auth, transactions)
│   ├── models/                # MongoDB schema models
│   ├── routes/                # Express route handlers
│   ├── services/              # Business logic and mailing
│   ├── utils/                 # OTP & helpers
│   ├── middlewares/           # Auth middleware
│   ├── config/                # DB connection config
│   └── server.js              # App entry point
├── .env
├── package.json
└── README.md
```

---

## ✅ Features

### 🧑‍💼 Authentication

- Secure **JWT-based login**
- Protected routes and APIs
- Role-based access (optional)

### 📊 Financial Dashboard

- **Revenue vs Expenses** visualizations
- **Category-wise breakdown**
- **Summary metrics**
- Paginated **Transaction table**

### 🔍 Advanced Filters & Search

- Filter by **Date, Category, Amount, Status, User**
- Column-based **Sorting**
- Real-time **Search**

### 📤 CSV Export

- User-selectable columns for export
- Auto-download CSV via browser

---

## ⚙️ Setup Instructions

### 🖥️ Prerequisites

- Node.js `>= 18.x`
- MongoDB instance
- Yarn or npm

---

## 🚀 Frontend Setup

```bash
cd frontend
npm install    # or yarn
```

### ✏️ Create `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 🔧 Run Dev Server

```bash
npm run dev    # or yarn dev
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install    # or yarn
```

### ✏️ Create `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/finance
JWT_SECRET=your_jwt_secret
```

### ▶️ Run Dev Server

```bash
npm run dev    # using nodemon
```

---

## 📡 API Endpoints

### 🔐 Auth APIs

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| POST   | `/api/auth/login`   | User login       |
| GET    | `/api/auth/profile` | Get user profile |

### 💸 Transaction APIs

| Method | Endpoint                     | Description                   |
| ------ | ---------------------------- | ----------------------------- |
| GET    | `/api/transactions`        | Get transactions with filters |
| GET    | `/api/transactions/export` | Export CSV with column config |

> All routes are protected using JWT token header:
> `Authorization: Bearer <token>`

---

## 📁 Sample Data Format

```json
{
  "id": "txn123",
  "date": "2024-06-01T00:00:00Z",
  "amount": 1500,
  "category": "Expense",
  "status": "Paid",
  "user": "User_004",
  "type": "Expense"
}
```

---

## 🧪 Testing

### Frontend

```bash
npm run test
```

### Backend

```bash
nodemon src/server.js
```

---

## 📦 CSV Export Example

| Date       | Amount | Category | Status | User     |
| ---------- | ------ | -------- | ------ | -------- |
| 2024-06-01 | 1500   | Expense  | Paid   | User_004 |

> Uses configurable column selection and generates a downloadable `.csv` file.

---

## 📌 TODO / Improvements

- [ ] Google OAuth
- [ ] Date-range filters
- [ ] Advanced analytics (monthly/quarterly)

---

## 📄 License

MIT
