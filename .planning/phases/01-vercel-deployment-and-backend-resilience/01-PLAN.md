# Phase 1 Plan: Vercel Serverless Deployment & Backend Resilience

## Objective
Convert PairUp-Backend into a production-ready, serverless-compatible Express API on Vercel while preserving 100% backward compatibility for local development (`npm run dev`). Fix connection pooling, environment loading, CORS, and all linting errors.

---

## Tasks

### Task 1: Create Vercel Serverless Entrypoint & Rewrite Configuration
- **Files:** `api/index.js`, `vercel.json`
- **Actions:**
  1. Create `api/index.js` exporting an `async function handler(req, res)` that awaits `connectDB()` before delegating to `app(req, res)`.
  2. Create root `vercel.json` with version 2 rewrites mapping all incoming routes `/(.*)` to `/api/index.js`.
- **Verification:** Import `api/index.js` via Node to ensure clean initialization.

### Task 2: Serverless Connection Pooling & Database Routing in `src/db/index.js`
- **File:** `src/db/index.js`
- **Actions:**
  1. Add connection caching (`cachedConnection` and `mongoose.connection.readyState >= 1` check).
  2. Use `{ dbName: DB_NAME }` option in `mongoose.connect(process.env.URI, { dbName: DB_NAME })` instead of appending string paths to `process.env.URI`.
  3. Avoid `process.exit(1)` in production; throw error for caller handling.
- **Verification:** Unit test URI parsing and connection state check.

### Task 3: Fortify Environment Loading & Passport Strategy
- **Files:** `src/app.js`, `src/config/passport-setup.js`
- **Actions:**
  1. Ensure `import "dotenv/config";` is imported at the very top of `src/app.js`.
  2. Wrap Google OAuth strategy registration with validation for `process.env.GOOGLE_CLIENT_ID` and `process.env.GOOGLE_CLIENT_SECRET`.
  3. Configure dynamic CORS middleware in `src/app.js` supporting `localhost`, `pairup-gold.vercel.app`, `pairup.online`, and `*.vercel.app` preview URLs.
- **Verification:** Verify `src/app.js` loads without throwing `OAuth2Strategy requires a clientID option` even when Google env vars are unset.

### Task 4: Fix All ESLint Errors
- **Files:** `src/controllers/event.controller.js`, `src/utils/ApiError.js`, `src/utils/cloudinary.js`, `src/routes/user.routes.js`
- **Actions:**
  1. `src/controllers/event.controller.js`: Clean unused imports, implement proper response in `createEvent`.
  2. `src/utils/ApiError.js`: Fix unused `next` parameter, fix `statusCode` mutation logic in `errorMiddleware`.
  3. `src/utils/cloudinary.js`: Rename unused error catch variables to `_error`.
  4. `src/routes/user.routes.js`: Remove unused imported controller functions (`getUserChannelProfile`, `updateUserCoverImage`).
- **Verification:** Run `npm run lint` and verify 0 errors and 0 warnings.

### Task 5: End-to-End Verification & Verification Script
- **Actions:**
  1. Test `api/index.js` with simulated mock request (`GET /`).
  2. Verify routes (`/`, `/api/v1/users`, `/api/v1/trips`, etc.).
  3. Run `npm run lint`.
- **Verification:** Automated verification script exits with code 0.

### Task 6: Deployment & Branch Synchronization Documentation
- **Actions:**
  1. Document exact Git commands to merge or push `dev` to `main`.
  2. Document required Vercel Environment Variables.

