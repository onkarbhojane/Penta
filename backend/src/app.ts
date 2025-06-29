import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import mailRoutes from "./routes/mail.routes";
import transactionRoutes from "./routes/transaction.routes";
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://penta-wine.vercel.app", 
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/mail", mailRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/transactions", transactionRoutes);

export default app;
