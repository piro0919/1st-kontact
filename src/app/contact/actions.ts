"use server";
import { sendEmailSchema } from "./schema";
import type { z } from "zod";
import nodemailer from "nodemailer";
import env from "@/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail(data: z.infer<typeof sendEmailSchema>) {
  const parsed = sendEmailSchema.parse(data);

  await transporter.sendMail({
    from: env.GMAIL_USER,
    to: env.GMAIL_USER,
    replyTo: parsed.email,
    subject: `お問い合わせ: ${parsed.name}様`,
    text: `
名前: ${parsed.name}
メールアドレス: ${parsed.email}
貴社ホームページURL: ${parsed.homepage}
最終クライアント名: ${parsed.client}
ご予算の目安: ${parsed.budget}
ご依頼内容: ${parsed.content}
実績としての掲載可否: ${parsed.release}
掲載予定の媒体: ${parsed.media}
希望納期: ${parsed.date}
その他のご相談内容: ${parsed.others}
    `,
  });

  return { success: true };
}
