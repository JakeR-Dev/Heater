# Heater

Heater displays the most impactful players on each NHL team — a quick-glance look at who's driving results across the league.

## Tech Stack

- **React** — UI
- **Vite** — build tooling and dev server
- **Tailwind CSS v4** — styling

## Commands

```bash
# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## GitHub Pages Deployment Note

The NHL API endpoint does not send CORS headers for browser calls from `https://<user>.github.io`, so direct production fetches will fail on GitHub Pages.

To deploy this app on Pages, set a production proxy URL:

1. Create a proxy endpoint (for example, a Cloudflare Worker) that forwards requests to `https://api-web.nhle.com` and adds `Access-Control-Allow-Origin`.
2. In GitHub, go to **Settings -> Secrets and variables -> Actions -> Variables**.
3. Add a repository variable named `VITE_API_BASE_URL` with your proxy base URL (example: `https://nhl-proxy.your-subdomain.workers.dev`).
4. Re-run the Pages workflow.

The deploy workflow passes `VITE_API_BASE_URL` into the Vite build, and the app uses that base URL for production API calls.
