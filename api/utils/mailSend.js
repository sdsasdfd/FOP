import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(to, subject, text, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.GMAIL, // sender address
    to,
    subject,
    text, // plain text body
    html, // html body
  });
}
