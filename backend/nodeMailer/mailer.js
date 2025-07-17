// mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 1. Configure the transporter once
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 3. Export a helper function
export async function sendMail({ to, subject, text }) {
  if (!to || !text) {
    console.log(to);
    throw new Error("Missing required fields: to + (text or html)");
  }
  const info = await transporter.sendMail({
    from: `"My App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
  return info; // messageId, accepted, rejected, etc.
}
