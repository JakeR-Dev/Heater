# Heater

Heater displays the most impactful players on each NHL team — a quick-glance look at who's driving results across the league.

Live at [nhl-heater.vercel.app](https://nhl-heater.vercel.app)

## Tech Stack

- **React** — UI
- **Vite** — build tooling and dev server
- **Tailwind CSS v4** — styling
- **Vercel** — hosting and API proxy

## Commands

```bash
npm run dev    # start the dev server
npm run build  # build for production
```

## How it works

The NHL API doesn't send CORS headers for browser requests, so all API calls are routed through a Vercel serverless function at `api/[[...slug]].js` which proxies requests to `https://api-web.nhle.com`. In development, Vite's dev server proxy handles this instead.
