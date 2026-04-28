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

## Resources

- [Unofficial NHL API Reference](https://github.com/Zmalski/NHL-API-Reference)

## Highlights

Each team displays three player category highlights:

- **Most Impactful** — top players by points-per-game (weighted with plus-minus factored, relative to games played).
- **Most Reliable** — players with the most average ice time this season (avg time on ice per game multiplied by the number of games played).
- **Snipers** — highest shooting percentage among players with 20+ points and 20+ games played in current season.

## How it works

The NHL API blocks direct browser requests with CORS, so the app uses a proxy.

- In local development, requests go to `/nhl-api/...` and Vite proxies them to `https://api-web.nhle.com`.
- In production, requests go to `/api/...` and Vercel routes them to `api/[...slug].js`, which forwards the request to `https://api-web.nhle.com`.

`vercel.json` keeps this simple by routing `/api/*` to the serverless function and everything else to the app.
