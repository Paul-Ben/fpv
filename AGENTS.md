# AGENTS.md

FoodPalace: React 19 + Vite 6 + TypeScript SPA (Supabase backend, TailwindCSS 4, Vercel). No backend server in this repo.

## Commands (all in package.json)

- `npm run dev` — dev server on **port 3000** (not Vite's default 5173)
- `npm run lint` and `npm run type-check` are **both** `tsc --noEmit` — there is no ESLint and **no test suite** in this repo. Verify work with `npm run build`.

## Architecture

- **No router.** View switching is state-based: `currentView` in `src/App.tsx` (see `AppView` union in `src/types.ts`). Add a screen by extending `AppView` + a conditional render in `App.tsx`; do not introduce react-router.
- Views live in `src/components/views/*.tsx`. `src/views/` contains only `AuthPage.tsx`. Shared state (cart, vendors, menu items, order) is lifted into `App.tsx` and passed via props.
- All Supabase access goes through `src/services/api.ts` (which maps DB rows → frontend types from `src/types.ts`). `src/data/mockData.ts` is dead code — not imported anywhere.
- `express`, `ws`, `@google/genai`, `dotenv` were unused dependencies and have been removed (along with the dead `server.js` reference in the `clean` script). There is no Node server in this repo.
- `@supabase/supabase-js` lives in `dependencies` (it's imported by runtime code in `src/lib/supabase.ts`), not `devDependencies` — don't move it back.
- `@/` import alias resolves to the **repo root** (see `vite.config.ts` + `tsconfig.json`) — e.g. `@/src/lib/supabase`.

## Database & types

- Canonical schema: `database/migrations/003_complete_clean_schema.sql`. **`database/seed*.sql` target an older, incompatible schema** (`is_available`, `slug`, `commission_rate`, `password_hash`, `preparation_time`, `price_modifier`) — do not run them against the migration schema.
- RLS is enabled on all tables. `vendors`, `menu_items`, `menu_categories` are only readable **when the vendor's `status = 'approved'`** — queries returning empty/denied rows are usually an RLS/vendor-status issue, not a code bug.
- `src/lib/database.types.ts` is **hand-written, not `supabase gen types` output**, and already drifts from the schema (e.g. `CityZone = 'Makurki'` — missing `d`; `Enums: {}`). Update it manually when schema changes. There are two distinct type sets: `database.types.ts` (DB rows, 8 roles) vs `src/types.ts` (frontend, 4 roles).

## Known issue: menu_items 400 Bad Request

`fetchMenuItems` in `src/services/api.ts:98` queries `menu_items` filtered on `available=eq.true`. Against the deployed project this returns **400**, which means the deployed `menu_items` table does not match migration 003 for the `available` column (or the table predates it).

- Commit `5eef35a` "fixed" this by changing `.eq('available', true)` → `.eq('available', 'true')`. That was a **no-op**: both serialize to the identical URL `available=eq.true`. Do not repeat that.
- The client is fine; the fix belongs in Supabase (apply `003_complete_clean_schema.sql` or add the `available BOOLEAN` column). A `400` from PostgREST is a schema/column mismatch, not a bad value.

## Env / deploy

- Required vars (`.env.example`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_PAYSTACK_PUBLIC_KEY`, `VITE_APP_URL`. Config via `supabase.ts` guards missing creds with a console.warn and empty strings.
- Vercel config in `vercel.json` (build `npm run build`, output `dist/`); `main` auto-deploys. `.github/workflows/ci.yml` runs `npm audit`, type-check, and build on push/PR to `main`.
- Auth: Supabase Auth via `src/context/AuthContext.tsx` and `src/views/AuthPage.tsx`; details in `AUTH_IMPLEMENTATION.md`.
- Error monitoring: Sentry is wired in (`src/lib/sentry.ts`, initialized in `src/main.tsx`) but stays inactive until `VITE_SENTRY_DSN` is set — see `DEPLOYMENT.md`.
- `.env` and `node_modules/` were previously committed to git despite being gitignored (added before the ignore rules existed); both have since been untracked with `git rm --cached`. Never re-add either with `git add -f`.

## Config warning

- `vite.config.ts` gates HMR/file-watching on `DISABLE_HMR`. The file carries an explicit "do not modify" comment (AI Studio agent-editing env) — leave it alone.