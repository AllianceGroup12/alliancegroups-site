# Alliance Groups – Compliance Shield

Marketing microsite for Alliance Groups' Compliance Shield platform. The site is built with Next.js and is deployed to Vercel through GitHub Actions.

## Getting started

```bash
npm install
npm run dev
```

- Development runs at `http://localhost:3000` by default.
- To verify a production build locally, run `npm run build && npm start`.

## Development notes

- The root route is served from `/public/index.html` via the rewrite defined in `next.config.js`.
- Static assets still belong in `/public`.
- `next.config.js` keeps the default Next.js runtime so local `npm start` and Vercel deployments use the same serving model.

## Deployment

The GitHub Actions workflow at `.github/workflows/deploy.yml` verifies the build on every push to `main`, creates preview deployments for pull requests from this repository, and deploys production builds to Vercel from `main`.

### Deploying a Google Studio export

1. Export the production build from Google Studio (HTML/CSS/JS/assets).
2. Replace `/public/index.html` with the exported main HTML file.
3. Copy all exported assets into `/public` (or subfolders under `/public`) and update references in `index.html` to use local paths.
4. Run local verification:
   - `npm ci`
   - `npm run build`
   - optional runtime check: `npm start`
5. Open a pull request to `main` and confirm the `Deploy to Vercel` workflow passes.
6. Ensure these repository values are configured for deployment:
   - `VERCEL_TOKEN` (secret)
   - `VERCEL_ORG_ID` (secret or variable)
   - `VERCEL_PROJECT_ID` (secret or variable)
7. Merge to `main` to trigger production deployment, then validate the production domain and DNS/custom-domain health in Vercel.

### Required GitHub credentials

- `VERCEL_TOKEN` (secret)
- `VERCEL_ORG_ID` (secret or variable)
- `VERCEL_PROJECT_ID` (secret or variable)

### One-time setup

1. Create a Vercel project for the repository.
2. Link the local checkout with `npx vercel link` or import the repo with the Vercel GitHub integration.
3. Add the required Vercel secrets to the GitHub repository settings.
4. Add any custom domain in the Vercel dashboard and update DNS to point at Vercel.

### Security headers

`vercel.json` defines the production response headers, including the content security policy, clickjacking protection, content-type sniffing protection, and cache control for static assets.
