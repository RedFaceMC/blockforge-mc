# BlockForge — Vercel-ready

This package is a standalone BlockForge frontend plus a Vercel serverless catalog endpoint.

## What is automatic?
- `/api/catalog` pulls public Modrinth project metadata and artwork for mods, plugins, resource packs, modpacks, datapacks and shaders.
- Responses are cached for roughly 24 hours.
- `vercel.json` adds a daily Vercel Cron request to warm the catalog.
- The frontend can also refresh the catalog with the **Refresh now** button.
- Maps remain a separate section because they are not part of the Modrinth catalog flow; add your own maps or link to external map sources.

## Deploy to Vercel
1. Put these files in a GitHub repository.
2. Open Vercel and import the repository.
3. Framework preset: **Other** (or let Vercel detect it).
4. Build command: leave empty.
5. Output directory: `.`.
6. Deploy.

The site will be available at a Vercel `*.vercel.app` URL. You can later connect a custom domain.

## Important production upgrades
The sign-in, creator upload, payments and creator balances in this build are UI/demo flows. For a real marketplace, connect:
- Authentication: Supabase Auth, Clerk, Auth.js, etc.
- Database: Supabase/Postgres/Neon/etc.
- File storage: object storage with signed uploads.
- Payments: a payment provider that supports your country and marketplace/payout model.
- Moderation and malware scanning for uploaded `.jar`/`.zip` files.

Never put private API keys or payment secrets in `index.html`.


## Free edition

This edition is configured as a completely free BlockForge marketplace:
- No paid/premium listings
- No checkout or purchase flow
- No creator payout UI
- All catalog entries are marked Free
- Modrinth catalog discovery remains available
