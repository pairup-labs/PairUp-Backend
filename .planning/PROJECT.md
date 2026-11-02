# PairUp Backend

## Overview
PairUp Backend is a RESTful API service built with Node.js, Express, and MongoDB (via Mongoose). It powers the PairUp travel and companion platform, providing authentication (JWT and Google OAuth), trip planning and discovery, event management, and user reviews.

## Architecture & Hosting
- **Runtime:** Node.js (ES Modules)
- **Deployment Platform:** Vercel Serverless Functions
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Storage:** Cloudinary (user avatars, trip covers)
- **Email:** Nodemailer (SMTP / Zoho Mail)
- **Client Application:** React frontend deployed at `https://pairup-gold.vercel.app`

## Key Technical Decisions & Constraints
1. **Serverless Execution on Vercel:**
   - Must use an entrypoint in `api/index.js` routed via `vercel.json`.
   - Cannot rely on a persistent `app.listen()` daemon in production.
   - Database connections must be cached/pooled across serverless invocations (`mongoose.connection.readyState`).
   - Process exits (`process.exit(1)`) must not be triggered inside request paths.
2. **Authentication:**
   - Dual authentication support: Email/password with JWT (Access & Refresh tokens in HTTP-only cookies and Authorization headers) and Google OAuth2 (`passport-google-oauth20`).
   - Password hashing with Blowfish-compatible hashing.
3. **CORS:**
   - Must support dynamic origins: local development (`localhost:5173`, `localhost:3000`), production frontend (`pairup-gold.vercel.app`, `pairup.online`), and dynamic Vercel preview environments (`*.vercel.app`).

