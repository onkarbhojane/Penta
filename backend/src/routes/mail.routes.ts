import express from "express";
import { sendTestEmail } from "../controllers/mailController";

const router = express.Router();

router.get("/test", sendTestEmail);

export default router;
