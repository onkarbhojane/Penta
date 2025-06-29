import express from "express";
import { sendTestEmail } from "../controllers/mailController.js";

const router = express.Router();

router.get("/test", sendTestEmail); // test via GET or change to POST

export default router;
