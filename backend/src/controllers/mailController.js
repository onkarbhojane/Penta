import { sendMail } from "../services/mailService.js";

export const sendTestEmail = async (req, res) => {
  try {
    const to = "onkarbhojane2002@gmail.com";
    const subject = "Test Email";
    const text = "This is a test email from the backend!";

    const info = await sendMail(to, subject, text);
    console.log("Email sent:", info.response);

    res.status(200).send(`Email sent! ID: ${info.messageId}`);
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).send("Failed to send email.");
  }
};