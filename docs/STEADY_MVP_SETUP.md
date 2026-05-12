# STEADY Phase 1 MVP Setup

## Local run
1. Backend: `cd backend && npm install && npm run dev`
2. Mobile: `cd apps/mobile && npm install && npm run start`
3. Seed: `cd backend && npm run seed`

## MongoDB Atlas
- Create cluster and database user.
- Add IP allowlist entry.
- Paste connection string into `backend/.env` as `MONGODB_URI`.

## Plaid
- Create Plaid app.
- Set `PLAID_CLIENT_ID`, `PLAID_SECRET`, and `PLAID_ENV=sandbox` in `backend/.env`.

## OpenAI
- Create API key and set `OPENAI_API_KEY` in `backend/.env`.

## Render deployment
- Create Web Service from repo root.
- Build command: `cd backend && npm install && npm run build`.
- Start command: `cd backend && npm run start`.
- Set all env vars from `.env.example`.

## Phase 2 placeholders
Future modules are scaffold-only: wellness, job finder, resume builder, lending marketplace.
