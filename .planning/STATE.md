# Project State: PairUp Backend

## Active Milestone: M1 — Production Deployment & Reliability
## Active Phase: Phase 1 — Vercel Serverless Deployment & Backend Resilience

### Status Summary
- **Current Branch:** `main`
- **Issue Investigated:** `500 FUNCTION_INVOCATION_FAILED` on `GET /` (`https://pair-up-backend.vercel.app/`).
- **Root Cause:**
  Vercel's Node.js Zero-Config discovery scans files matching `src/app.{js,ts...}` and compiles them as serverless functions. When Vercel loaded `/var/task/src/app.js`, it expected a default export (`export default app`). Because `src/app.js` only exported a named export (`export { app }`), `mod.default` evaluated to `undefined`, causing the Vercel Node runtime to throw:
  `Invalid export found in module "/var/task/src/app.js". The default export must be a function or server.`
- **Resolution:**
  1. Added `export default app` to `src/app.js` (retaining `export { app }` for named import compatibility).
  2. Added DB connection middleware to `src/app.js` to guarantee MongoDB Atlas connectivity even when `src/app.js` is invoked directly by Vercel Zero Config.
  3. Updated `api/index.js` to import `app` as default.

### Progress
- [x] Initialized GSD planning directory (`.planning/`).
- [x] Implement Vercel serverless configuration (`api/index.js`, `vercel.json`).
- [x] Patch MongoDB connection logic in `src/db/index.js`.
- [x] Safeguard Passport OAuth in `src/config/passport-setup.js`.
- [x] Fix all ESLint errors (`npm run lint` passes with 0 warnings/errors).
- [x] Resolve `Invalid export found in module "/var/task/src/app.js"` error.
- [x] Verify local simulation of `src/app.js` and `api/index.js` handlers.
