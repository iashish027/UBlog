// mailer.js
import nodemailer from "nodemailer";
import {env} from "../../config/index.js"

// 1. Configure the transporter once
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE === "true",
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

// 3. Export a helper function
export async function sendMail({ to, subject, text }) {
  if (!to || !text) {
    throw new Error("Missing required fields: to + (text or html)");
  }
  const info = await transporter.sendMail({
    from: `"My App" <${env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
  return info; // messageId, accepted, rejected, etc.
}
