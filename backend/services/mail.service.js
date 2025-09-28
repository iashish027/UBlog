import { sendMail } from "../nodeMailer/mailer.js";

export const sendVerificationMail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const info = await sendMail({
    to: email,
    subject: "Ublog account verification",
    text: `Please verify your account by clicking the following link: ${verificationUrl}`,
  });

  if (!info.accepted) {
    throw new Error("Unable to send verification email");
  }

  return info;
};
