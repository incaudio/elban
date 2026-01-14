# Cloudflare Pages deployment notes

Prerequisites:

- Create a Cloudflare account and a Pages project.
- Create a scoped API token with Pages permissions and save it as `CF_API_TOKEN` in your repository secrets.
- Save your `CF_ACCOUNT_ID` and `CF_PROJECT_NAME` as repository secrets.

Quick setup:

1. Ensure the site builds locally:

```bash
npm ci
npm run build
```

2. Push to `main`. The GitHub Action in `.github/workflows/cloudflare-pages.yml` will build and publish `./dist/public` to the Pages project using the provided secrets.

Notes:

- If you need server-side APIs, you can migrate those endpoints to Cloudflare Workers (or Pages Functions). The current server is Node/Express and won't run on Pages without adaptation.
- `wrangler.toml` at the repository root contains basic placeholders for `account_id` and `name` — replace them if you plan to manage Workers with Wrangler.
