import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

async function email(
  {
    body: {
      budget,
      client,
      content,
      date,
      email,
      homepage,
      media,
      name,
      others,
      release,
    },
  }: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
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
    const html = [
      {
        key: "お名前",
        value: name,
      },
      {
        key: "Email",
        value: email,
      },
      {
        key: "貴社のホームページ",
        value: homepage,
      },
      {
        key: "大本のクライアント社名",
        value: client,
      },
      {
        key: "報酬の予算について",
        value: budget,
      },
      {
        key: "作業内容について",
        value: content,
      },
      {
        key: "実績公開について",
        value: release,
      },
      {
        key: "リリース媒体",
        value: media,
      },
      {
        key: "希望納期",
        value: date,
      },
      {
        key: "その他、案件内容について",
        value: `<br />${(others as string).replace(/\r?\n/g, "<br />")}`,
      },
    ]
      .map(({ key, value }) => `${key}：${value}`)
      .join("<br />");

    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(success);
      });
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          html,
          from: process.env.NODEMAILER_AUTH_USER,
          replyTo: email,
          subject: `【1stKontact】${name}さんからメッセージです`,
          to: process.env.NODEMAILER_AUTH_USER,
        },
        (err, info) => {
          if (err) {
            reject(err);

            return;
          }

          resolve(info);
        }
      );
    });

    res.status(200).json({ result: "ok" });
  } catch {
    res.status(500).json({ result: "ng" });
  }
}

export default email;
