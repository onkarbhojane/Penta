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
- **CSV & Excel Export**

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
└── package.json
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
└── package.json
```

---

## ✅ Features

### 🧑‍💼 Authentication

- Secure **JWT-based login**
- Protected routes and APIs

### 📊 Financial Dashboard

- **Revenue vs Expenses** visualizations
- **Category-wise breakdown**
- **Summary metrics**
- Paginated **Transaction table**

### 🔍 Advanced Filters & Search

- Filter by **Date, Category, Amount, Status, User**
- Column-based **Sorting**
- Real-time **Search**

### 📤 Data Export

- **CSV Export** with user-selectable columns
- **Excel Export** with formatted reports
- **Financial Report Export** with comprehensive analytics
- Auto-download via browser

### 📈 Analytics & Reporting

- **Transaction Status** overview (Paid/Pending)
- **Category-wise Status** breakdown
- Real-time dashboard metrics

---

## ⚙️ Setup Instructions

### 🖥️ Prerequisites

- Node.js `>= 18.x`
- MongoDB instance
- npm

---

## 📥 Clone Repository

```bash
git clone https://github.com/onkarbhojane/Penta
cd Penta
```

## 🚀 Frontend Setup

```bash
cd frontend
npm install
```

### 🔧 Run Dev Server

```bash
npm run dev 
```

The frontend will be available at `http://localhost:5173`

---

## 🔧 Backend Setup

```bash
cd backend
npm install 
```

### ✏️ Create `.env` File

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/<your_database_name>
JWT_SECRET=<your_jwt_secret>
EMAIL_USER="<your_email@example.com>"
EMAIL_PASS="<your_email_app_password>"
```

### ▶️ Run Dev Server

```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

---

## 📡 API Endpoints

### 🔐 Authentication APIs

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| POST   | `/api/auth/login`     | User login       |
| GET    | `/api/auth/profile`   | Get user profile |

### 💸 Transaction APIs

| Method | Endpoint                                    | Description                        |
| ------ | ------------------------------------------- | ---------------------------------- |
| GET    | `/api/transactions`                        | Get transactions with filters      |
| GET    | `/api/transactions/export`                 | Export CSV with column config      |
| GET    | `/api/transactions/export/excel`           | Export Excel formatted report      |
| GET    | `/api/transactions/export-financial-report`| Export comprehensive financial report |

### 📊 Analytics APIs

| Method | Endpoint                           | Description                          |
| ------ | ---------------------------------- | ------------------------------------ |
| GET    | `/api/transactions/status`         | Get transaction status overview      |
| GET    | `/api/transactions/status-category`| Get category-wise status breakdown   |

---

## 🔒 Authentication

All transaction and analytics routes are protected using JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Example Authentication Flow

1. **Login Request:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "onkarbhojane2002@gmail.com",
  "password": "Onkar0101"
}
```

2. **Use Token in Subsequent Requests:**
```bash
GET /api/transactions/status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 API Response Examples

### Transaction Status Response
```json
{
  "message": "Status fetched",
  "data": {
    "paid": 186,
    "pending": 114
  }
}
```

### Transaction Data Format
```json
{
  "id": "txn123",
  "date": "2024-06-01T00:00:00Z",
  "amount": 1500,
  "category": "Expense",
  "status": "Paid",
  "user_id": "User_004",
  "type": "Expense"
}
```

---

## 📦 Export Features

### CSV Export
- Configurable column selection
- Filtered data export
- Auto-download functionality

### Excel Export
- Formatted spreadsheet with styling
- Multiple sheets for different data views
- Professional report layout

### Financial Report
- Comprehensive analytics summary
- Category-wise breakdowns
- Status distributions
- Date-range specific reports

### Export Example Table

| Date       | Amount | Category | Status  | User     |
| ---------- | ------ | -------- | ------- | -------- |
| 2024-06-01 | 1500   | Expense  | Paid    | User_004 |
| 2024-06-02 | 2000   | Revenue  | Pending | User_003 |

---

## 🔧 Development

### Environment Setup

1. **Start Backend Server**
```bash
cd backend
npm run dev
```

2. **Start Frontend Server**
```bash
cd frontend
npm run dev
```
---

## 🔍 Testing

### API Testing with Postman

Example requests are provided in the documentation. Use the following collection structure:

1. **Authentication**
   - Login and get JWT token
   
2. **Transactions**
   - Get filtered transactions
   - Export data in various formats
   
3. **Analytics**
   - Get status overview
   - Get category breakdowns

---

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify database permissions

2. **JWT Token Errors**
   - Ensure token is properly formatted
   - Check token expiration
   - Verify JWT secret matches

3. **Export Not Working**
   - Check file permissions
   - Verify export endpoint authentication
   - Ensure proper headers are set

---

## 📌 Future Enhancements

- [ ] **Advanced Date Filters**
  - Custom date range picker
  - Preset date ranges (Last 30 days, This month, etc.)

- [ ] **Enhanced Analytics**
  - Monthly/Quarterly trend analysis
  - Predictive analytics
  - Advanced charting options

- [ ] **Real-time Features**
  - Live transaction updates
  - WebSocket integration
  - Real-time notifications

- [ ] **Additional Export Formats**
  - PDF reports
  - PowerPoint presentations
  - Google Sheets integration

- [ ] **User Management**
  - Multi-user support
  - Role-based permissions
  - User activity logs

- [ ] **Performance Optimizations**
  - Data pagination improvements
  - Caching strategies
  - Database indexing

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For support and questions:
- Email: onkar.bhojane22@gmail.com
- GitHub Issues: [Create an issue](https://github.com/onkarbhojane/Penta/issues)

---

## 🎉 Acknowledgments

- Built with React and Node.js
- Material UI for component styling
- Chart.js for data visualization
- MongoDB for data storage
- JWT for secure authentication

---

**Happy Coding! 🚀**
