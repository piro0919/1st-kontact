"use server";
import nodemailer from "nodemailer";
import env from "@/env";
import { type SendEmailResult, sendEmailSchema } from "./schema";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail(data: unknown): Promise<SendEmailResult> {
  const parsed = sendEmailSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false };
  }

  // 隠し欄が埋まっていればボットとみなす。送れたふりをして、メールは出さない
  if (parsed.data.extraNote !== "") {
    return { success: true };
  }

  try {
    await transporter.sendMail({
      from: env.GMAIL_USER,
      to: env.GMAIL_USER,
      replyTo: parsed.data.email,
      subject: `お問い合わせ: ${parsed.data.name}様`,
      text: `
名前: ${parsed.data.name}
メールアドレス: ${parsed.data.email}
貴社ホームページURL: ${parsed.data.homepage}
最終クライアント名: ${parsed.data.client}
ご予算の目安: ${parsed.data.budget}
ご依頼内容: ${parsed.data.content}
実績としての掲載可否: ${parsed.data.release}
掲載予定の媒体: ${parsed.data.media}
希望納期: ${parsed.data.date}
その他のご相談内容: ${parsed.data.others}
    `,
    });
  } catch (error) {
    console.error("お問い合わせメールの送信に失敗しました", error);

    return { success: false };
  }

  return { success: true };
}
