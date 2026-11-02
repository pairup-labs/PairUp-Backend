# Phase 1 Research: Vercel Deployment & Backend Resilience Analysis

## Build Log Examination

The user provided the following Vercel deployment log:
```
04:23:07.420 Running build in Washington, D.C., USA (East) – iad1
04:23:07.420 Build machine configuration: 2 cores, 8 GB
04:23:07.458 Cloning github.com/pairup-labs/PairUp-Backend (Branch: main, Commit: 4582f30)
04:23:07.459 Skipping build cache, deployment was triggered without cache.
04:23:07.859 Cloning completed: 401.000ms
04:23:08.303 Running "vercel build"
04:23:08.311 Vercel CLI 65.4.0
04:23:08.959 Installing dependencies...
04:23:09.674 npm warn Unknown env config "cache-dir"...
04:23:10.843 npm warn deprecated rimraf@3.0.2...
04:23:10.971 npm warn deprecated q@1.5.1...
04:23:11.065 npm warn deprecated npmlog@5.0.1...
04:23:11.156 npm warn deprecated inflight@1.0.6...
04:23:11.209 npm warn deprecated glob@7.2.3...
04:23:11.251 npm warn deprecated multer@1.4.5-lts.2...
04:23:11.422 npm warn deprecated gauge@3.0.2...
04:23:11.493 npm warn deprecated are-we-there-yet@2.0.0...
04:23:12.412 added 312 packages in 3s
04:23:12.413 npm warn install-scripts 1 package has install scripts not yet covered by allowScripts:
04:23:12.414 npm warn install-scripts   bcrypt@5.1.1 (install: node-pre-gyp install --fallback-to-build)
04:23:16.529 Build Completed in /vercel/output [8s]
04:23:16.579 Deploying outputs...
04:23:21.719 Deployment completed
04:23:23.964 Created build cache: 2s
04:23:23.964 Uploading build cache [10.30 MB]
04:23:24.120 Build cache uploaded: 156.000ms
```

### Key Findings & Root Causes

1. **Deployment Success vs Runtime 404:**
   - Vercel reported "Build Completed in /vercel/output [8s]" and "Deployment completed".
   - However, without an `api/` directory (or explicit `vercel.json` routing), Vercel treated the project as static files. No Serverless Function was compiled or routed.
   - Any HTTP request to the deployed Vercel domain will return a `404 NOT_FOUND` error because Express's `app.listen()` in `src/index.js` is never invoked in Vercel's serverless architecture.

2. **Branch Drift (`main` vs `dev`):**
   - Vercel cloned `Branch: main, Commit: 4582f30`.
   - The user has newer commits (`f3560a6` and `15aa8b0`) on branch `dev` containing dependency upgrades, trip routes, review controller updates, and error handling improvements.
   - For Vercel to run the latest backend code, `dev` needs to be merged into `main` (or Vercel's production branch set to `dev`).

3. **`bcrypt@5.1.1` & `allowScripts` Warning:**
   - Vercel flagged: `npm warn install-scripts bcrypt@5.1.1 (install: node-pre-gyp install --fallback-to-build)`.
   - Native modules like `bcrypt` compiled via `node-pre-gyp` can lead to architecture mismatch or cold start execution failure in Lambda runtimes.
   - `bcryptjs` is pure JavaScript, Blowfish-compatible with existing password hashes, and avoids all node-gyp build requirements.

4. **MongoDB Connection String & Database Name Collision:**
   - In `src/db/index.js`:
     ```javascript
     const connectionInstance = await mongoose.connect(`${process.env.URI}/${DB_NAME}`);
     ```
   - When `process.env.URI` is a MongoDB Atlas connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`), appending `/${DB_NAME}` places the DB name at the end of query parameters (`Cluster0/pairup`), causing Mongoose to fall back to the default `test` database instead of `pairup`.
   - **Fix:** Connect via `mongoose.connect(process.env.URI, { dbName: DB_NAME })`.

5. **Serverless Connection Pooling:**
   - Express on Vercel runs within ephemeral Lambda containers. Calling `connectDB()` naively on every request risks creating new MongoDB connections on warm requests, quickly exhausting Atlas connection limits.
   - **Fix:** Check `mongoose.connection.readyState >= 1` and reuse the cached connection.

6. **Crash on Missing Environment Variables:**
   - In `src/config/passport-setup.js`, `new GoogleStrategy({ clientID: process.env.GOOGLE_CLIENT_ID, ... })` threw a fatal `TypeError: OAuth2Strategy requires a clientID option` whenever `GOOGLE_CLIENT_ID` was not set, crashing the process upon module import before any handler could run.
   - **Fix:** Conditionally initialize Google OAuth only when credentials exist, and load `dotenv/config` at the application entry point.

7. **CORS Headers for Vercel Frontends:**
   - Frontend is hosted on Vercel (`https://pairup-gold.vercel.app`, `*.vercel.app`).
   - CORS must dynamically permit these origins, support credentials, and handle OPTIONS preflight cleanly.

