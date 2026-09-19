# FoodPalace Deployment Guide - Vercel + Supabase

## Overview

This guide covers deploying FoodPalace to Vercel with Supabase as the database backend.

## Architecture

```
┌─────────────────┐
│   Vercel        │
│   Frontend      │
│   (React/Vite)  │
└────────┬────────┘
         │
         │ HTTPS API calls
         │
         ▼
┌─────────────────┐
│   Supabase      │
│   - Auth        │
│   - Database    │
│   - Storage     │
│   - RLS         │
└─────────────────┘
```

## Prerequisites

1. **Supabase Account** - [Create at supabase.com](https://supabase.com)
2. **Vercel Account** - [Create at vercel.com](https://vercel.com)
3. **GitHub Repository** - Push your code to GitHub
4. **Paystack Account** (optional for payments) - [paystack.com](https://paystack.com)

---

## Step 1: Set Up Supabase

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - Name: `foodpalace`
   - Database Password: (save this securely)
   - Region: Choose closest to your users
4. Wait for project creation (~2 minutes)

### 1.2 Run Database Migration
1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy contents from `database/migrations/001_initial_schema.sql`
4. Paste and click **Run**
5. Verify all tables are created in **Table Editor**

### 1.3 Get Credentials
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbG...` (starts with eyJ)

### 1.4 Configure Authentication
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Optionally enable Google/GitHub providers
4. Configure email templates if needed

### 1.5 Set Up Storage (Optional)
For vendor logos and food images:
1. Go to **Storage**
2. Create bucket: `vendor-assets`
3. Set policy to allow public reads
4. Create bucket: `user-avatars`
5. Set policy for authenticated uploads

---

## Step 2: Prepare Local Environment

### 2.1 Create .env File
```bash
cp .env.example .env
```

### 2.2 Fill Environment Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_key
VITE_APP_URL=http://localhost:3000
```

### 2.3 Test Locally
```bash
npm install
npm run dev
```

Verify the app runs without errors at `http://localhost:3000`

---

## Step 3: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial FoodPalace setup"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New...** → **Project**
   - Import your GitHub repository
   - Select the correct repository

3. **Configure Build Settings**
   - Framework Preset: **Vite** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   Click **Environment Variables** and add:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   VITE_PAYSTACK_PUBLIC_KEY = pk_live_your_key
   VITE_APP_URL = https://foodpalace.vercel.app
   ```

5. **Deploy**
   - Click **Deploy**
   - Wait for build (~1-2 minutes)
   - View your live site!

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Step 4: Post-Deployment Configuration

### 4.1 Update Supabase Auth URLs
1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel URL to:
   - Site URL: `https://foodpalace.vercel.app`
   - Redirect URLs: `https://foodpalace.vercel.app/**`

### 4.2 Configure Custom Domain (Optional)
1. In Vercel, go to **Settings** → **Domains**
2. Add your custom domain: `foodpalace.ng`
3. Follow DNS configuration instructions
4. Update `VITE_APP_URL` with custom domain

### 4.3 Test Production Deployment
- ✅ Home page loads
- ✅ Browse vendors works
- ✅ Menu items display correctly
- ✅ Cart functionality works
- ✅ Dark mode toggle works
- ✅ Responsive design on mobile

---

## Staging Environment

Before wiring up real payments, set up a second, fully separate environment so schema changes, payment testing, and RLS policy edits never touch production data or a live Paystack key.

### Why a second Supabase project (not just a second Vercel env)

Vercel's Preview deployments already give you a separate *frontend* build per branch/PR for free (see Step 5 below). But every one of those previews still points at whatever `VITE_SUPABASE_URL` you give it — so without a second Supabase project, "preview" and "production" share the same database and the same live Paystack key. A staging setup needs both halves separated.

### Setup

1. **Create a second Supabase project** (e.g. `foodpalace-staging`) and apply the same migration (`database/migrations/003_complete_clean_schema.sql`) to it.
2. **Use Paystack test keys** (`pk_test_...`) for staging — never the live key.
3. **In Vercel**, add the staging values under the **Preview** environment (Settings → Environment Variables → scope to "Preview"), keeping the production values scoped to "Production":
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` → staging project
   - `VITE_PAYSTACK_PUBLIC_KEY` → `pk_test_...`
   - `VITE_APP_URL` → the preview deployment's own URL pattern
4. **In Supabase → Authentication → URL Configuration** for the staging project, add the Vercel preview URL pattern (`https://foodpalace-git-*.vercel.app/**`) to redirect URLs.
5. Locally, developers keep using their own `.env` (gitignored) pointed at staging or a personal Supabase project — never at production.

This means every PR preview build automatically exercises staging data and test payments, and production stays untouched until a merge to `main`.

---

## Step 5: CI/CD Pipeline Setup

### Automatic Deployments on Push

Vercel automatically deploys when you push to branches:

| Branch | Deployment Type | URL |
|--------|----------------|-----|
| `main` | Production | `https://foodpalace.vercel.app` |
| Other branches | Preview | `https://foodpalace-git-branch.vercel.app` |

### Recommended GitHub Branch Protection

1. Go to GitHub repository **Settings** → **Branches**
2. Add branch protection rule for `main`:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

### Status Checks

Add these to your `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type check
        run: npm run type-check
        
      - name: Lint
        run: npm run lint
        
      - name: Build
        run: npm run build
```

---

## Step 6: Monitoring & Maintenance

### Vercel Analytics
1. Go to **Analytics** in Vercel dashboard
2. Enable for insights on:
   - Page views
   - Performance metrics
   - Core Web Vitals

### Supabase Logs
1. Go to **Logs** in Supabase dashboard
2. Monitor:
   - Database queries
   - Authentication events
   - Function invocations

### Error Tracking
**Sentry** is already integrated (`src/lib/sentry.ts`, wired into `src/main.tsx` via an error boundary) but stays disabled until `VITE_SENTRY_DSN` is set. To enable it:

1. Create a project at [sentry.io](https://sentry.io) and copy its DSN.
2. Add `VITE_SENTRY_DSN` to Vercel's environment variables (scope to Production, and to Preview if using the staging setup above with its own Sentry project).
3. Redeploy — no code changes needed.

Consider also adding **LogRocket** for session replay if you need to see exactly what a user did before an error.

---

## Troubleshooting

### Build Fails
```bash
# Check locally first
npm run build

# Common issues:
# - TypeScript errors: npm run type-check
# - Missing env vars: verify in Vercel settings
# - Dependencies: rm -rf node_modules && npm install
```

### Supabase Connection Errors
- Verify `VITE_SUPABASE_URL` is correct (no trailing slash)
- Verify `VITE_SUPABASE_ANON_KEY` is the anon/public key (not service_role)
- Check RLS policies allow anonymous reads where needed

### RLS Policy Issues
If data isn't loading:
1. Check Supabase logs for permission errors
2. Verify RLS policies in Table Editor
3. Test queries in SQL Editor with `auth.uid()`

### Payment Integration Issues
- Use test keys for development
- Verify webhook endpoints (requires backend/Edge Functions)
- Test with Paystack test cards

---

## Security Best Practices

### Environment Variables
- ✅ Never commit `.env` file
- ✅ Use Vercel's environment variable encryption
- ✅ Rotate keys periodically
- ✅ Use different keys for dev/staging/production

### Supabase Security
- ✅ Enable RLS on all tables
- ✅ Use anon key only (never service_role key in frontend)
- ✅ Implement proper RLS policies
- ✅ Validate data on insert/update

### Vercel Security
- ✅ Enable Vercel Firewall (Pro plan)
- ✅ Use rate limiting for APIs
- ✅ Implement CSP headers if needed
- ✅ Keep dependencies updated

---

## Cost Estimates

### Vercel (Free Tier)
- Unlimited deployments
- 100GB bandwidth/month
- Suitable for MVP

### Supabase (Free Tier)
- 500MB database
- 1GB file storage
- 50,000 monthly active users
- Sufficient for initial launch

### Expected Costs at Scale
- Vercel Pro: $20/month (more bandwidth, analytics)
- Supabase Pro: $25/month (more DB/storage)
- Total: ~$45/month for growing platform

---

## Next Steps

1. ✅ Complete Supabase setup
2. ✅ Deploy to Vercel
3. ✅ Test all user flows
4. ✅ Set up monitoring
5. ✅ Configure custom domain
6. ✅ Implement payment webhooks (Edge Functions)
7. ✅ Add email notifications
8. ✅ Launch! 🚀

---

For support, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [FoodPalace PRD](./docs/development-ready%20PRD-foodpalace.txt)
