import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

async function email(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.NODEMAILER_AUTH_PASS,
        user: process.env.NODEMAILER_AUTH_USER,
      },
      connectionTimeout: 60 * 30,
      greetingTimeout: 60 * 30,
      host: "smtp.mail.yahoo.co.jp",
      port: 465,
      secure: true,
      socketTimeout: 60 * 30,
    });
    await transporter.sendMail({
      from: process.env.NODEMAILER_AUTH_USER,
      html: "<b>Hello world?</b>",
      subject: "Hello ✔",
      text: "Hello world?",
      to: process.env.NODEMAILER_AUTH_USER,
    });

    res.status(200).json({ result: "ok" });
  } catch {
    res.status(500).json({ result: "ng" });
  }
}

export default email;
