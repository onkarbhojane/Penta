import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import mailRoutes from "./routes/mail.routes";
import transactionRoutes from "./routes/transaction.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mail", mailRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/transactions", transactionRoutes);

export default app;
