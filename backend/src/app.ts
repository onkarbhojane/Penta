import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import mailRoutes from "./routes/mail.routes";
import transactionRoutes from "./routes/transaction.routes";
const app = express();

app.use(cors({
  origin: "https://penta-wine.vercel.app",
  credentials: true,                        
}));

app.use(express.json());

app.use('/api/mail', mailRoutes);
app.use("/api/auth", userRoutes);
app.use('/api/transactions', transactionRoutes);

export default app;
