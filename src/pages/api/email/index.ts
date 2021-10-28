import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

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

    await sgMail.send({
      html,
      from: email,
      subject: `【1stKontact】${name}さんからメッセージです`,
      to: process.env.MAIL_ADDRESS,
    });

    res.status(200).json({ result: "ok" });
  } catch {
    res.status(500).json({ result: "ng" });
  }
}

export default email;
