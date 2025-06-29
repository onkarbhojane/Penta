import express from 'express';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes.js';
import userAuthRoutes from './routes/userAuthRoutes.js';
import mailRoutes from './routes/mailRoutes.js';
import dotenv from 'dotenv'; 
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/mail', mailRoutes);
app.use('/api/auth', userAuthRoutes);
app.use('/api/transactions', transactionRoutes);

export default app;
