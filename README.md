# Alliance Groups – Compliance Shield

Marketing microsite for Alliance Groups' Compliance Shield platform. The site is built as a lightweight Node.js application that serves pre-built static assets describing the Compliance Shield product offering, features, and value proposition.

## Getting started

```bash
npm install
npm start
```

- The server listens on `http://localhost:3000` by default.
- Static assets live in `public/` and are served with sensible security headers via Helmet.

## Development notes

- The project is intentionally build-free. Static assets can be edited directly in `public/`.
- `npm run build` is a placeholder for CI/CD systems that expect a build step.
- Styles are authored in `public/styles.css`; interactive behaviour is implemented in `public/scripts.js`.

## Deployment

The included GitHub Actions workflow (`.github/workflows/azure-webapps-node.yml`) packages the application and deploys it to an Azure Web App once repository secrets are configured.
