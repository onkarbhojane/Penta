import { Request, Response } from "express";
import { sendMail } from "../services/mailService";

export const sendTestEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const info = await sendMail("onkarbhojane2002@gmail.com", "Test", "From backend");
    if (!info) throw new Error("sendMail failed");

    return res.status(200).send(`Email sent! ID: ${info.messageId}`);
  } catch (error) {
    console.error("Mail error:", error);
    return res.status(500).send("Failed to send email.");
  }
};
