import { Request, Response } from "express";
import { sendMail } from "../services/mailService";

export const sendTestEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const info = await sendMail("onkarbhojane2002@gmail.com", "Test", "From backend");
    if (!info) throw new Error("sendMail failed");

    res.status(200).send(`Email sent! ID: ${info.messageId}`);
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).send("Failed to send email.");
  }
};
