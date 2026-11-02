# Project Roadmap: PairUp Backend

## Milestone 1: Production Deployment & Reliability (Current)

- [ ] **Phase 1: Vercel Serverless Deployment & Backend Resilience**
  - Configure `api/index.js` and `vercel.json` for Vercel Serverless Function execution.
  - Implement Mongoose connection pooling and safe DB name handling for Atlas URIs with query options.
  - Fix Google OAuth initialization to prevent startup crashes when env vars are absent.
  - Normalize dynamic CORS for Vercel preview and production domains.
  - Resolve ESLint errors across controllers, utilities, and routes.
  - Provide branch synchronization guide (`dev` -> `main`) for automated Vercel CI deployments.

- [ ] **Phase 2: Codebase Architecture & Route Consolidation**
  - Resolve redundancy between root controllers (`src/controllers/trip.controller.js`) and modular controllers (`src/trips/controllers/trip.controller.js`).
  - Standardize error responses and DTO validation across all route handlers.
  - Enhance file upload cleanup to prevent temporary file leaks during failed uploads.

- [ ] **Phase 3: Automated Testing & Continuous Integration**
  - Implement Jest/Supertest integration tests for authentication and trip endpoints.
  - Set up GitHub Actions workflow to run linting and tests before merge to `main`.

