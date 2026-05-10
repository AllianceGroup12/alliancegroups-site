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

- The main application route is implemented in `/pages/index.js`.
- Static assets still belong in `/public`.
- `next.config.js` keeps the default Next.js runtime so local `npm start` and Vercel deployments use the same serving model.

## Deployment

The GitHub Actions workflow at `/home/runner/work/alliancegroups-site/alliancegroups-site/.github/workflows/deploy.yml` verifies the build on every push to `main`, creates preview deployments for pull requests from this repository, and deploys production builds to Vercel from `main`.

### Required GitHub secrets

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### One-time setup

1. Create a Vercel project for the repository.
2. Link the local checkout with `npx vercel link` or import the repo with the Vercel GitHub integration.
3. Add the required Vercel secrets to the GitHub repository settings.
4. Add any custom domain in the Vercel dashboard and update DNS to point at Vercel.

### Security headers

`/home/runner/work/alliancegroups-site/alliancegroups-site/vercel.json` defines the production response headers, including the content security policy, clickjacking protection, content-type sniffing protection, and cache control for static assets.
