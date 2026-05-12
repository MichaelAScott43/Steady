# STEADY — Human Stability Operating System

Phase 1 MVP foundation with a mobile-first Expo app and production-minded Node/Express backend.

## Architecture
- `apps/mobile`: React Native + Expo + TypeScript app with tab navigation (Home, Transactions, Insights, Stability, Profile).
- `backend`: Express + TypeScript API, MongoDB models, JWT auth, Plaid/OpenAI service layers.
- `shared`: shared types/constants.
- `docs`: setup and deployment docs.

## Run locally
See `docs/STEADY_MVP_SETUP.md`.

## Folder tree
```text
apps/mobile
backend/src/{config,controllers,routes,services,middleware,models,utils,auth}
shared/{types,constants}
docs
```
