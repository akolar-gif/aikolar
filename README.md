# Thinking, Interrupted — Vercel Build

This project is prepared for Vercel with a Next.js App Router setup and a server-side `/api/think` route.

## What it does

- runs the experimental thinking interface in the browser
- calls `/api/think` on the server
- uses `OPENAI_API_KEY` server-side only
- falls back to deterministic adaptive logic if the API call fails

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Environment variables

Set these locally in `.env.local` and in Vercel Project Settings:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional)

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

For production:

```bash
vercel --prod
```

## Important

- never expose `OPENAI_API_KEY` in client code
- this build already keeps the key on the server in `app/api/think/route.ts`
- if OpenAI is unavailable, the project still works via fallback mode
