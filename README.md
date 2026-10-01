# 1stKontact

> Official website for illustrator Kontakun.

[🔗 Live Site](https://konta-niki.com/)

## ✨ Features

- 🖼 Gallery with illustration showcase
- 🎨 Works portfolio
- 📇 Profile & contact pages

## 🛠 Tech Stack

- Next.js (App Router) + React + TypeScript
- CSS Modules
- microCMS (content)

## 🚀 Development

```bash
npm install
npm run dev
```

The lockfile is `package-lock.json`, so use npm.

### Environment variables

Put these in `.env.local`. They are checked by `src/env.ts`, so `npm run build` fails without them.

| Name | Used for |
| --- | --- |
| `MICRO_CMS_SERVICE_DOMAIN` | microCMS service to read from |
| `MICRO_CMS_API_KEY` | microCMS API key |
| `GMAIL_USER` | Address the contact form sends from and to |
| `GMAIL_APP_PASSWORD` | Gmail app password for that address |

## 📄 License

MIT