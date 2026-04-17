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

## GitHub Pages Deployment

The NHL API endpoint does not send CORS headers for browser calls from `https://<user>.github.io`, so direct production fetches will fail on GitHub Pages.

This repo is deployed with a **Vercel serverless API proxy** to handle CORS.

### Setup

1. **Deploy Vercel proxy** (one-time):
   - Import this repo into Vercel: https://vercel.com/import
   - Vercel auto-detects the `api/[...slug].js` function and deploys it
   - Your proxy URL will be: `https://<your-vercel-project>.vercel.app/api`

2. **Set GitHub Actions variable** (one-time):
   - Go to repo Settings → Secrets and variables → Actions → **Variables**
   - Add `VITE_API_BASE_URL` with value: `https://<your-vercel-project>.vercel.app/api`
   - Replace `<your-vercel-project>` with your actual Vercel project name

3. **Redeploy Pages**:
   - Go to repo Actions → **Deploy to GitHub Pages** workflow
   - Click **Run workflow** → **Run workflow**
   - Wait for deployment to complete

The GitHub Pages workflow injects `VITE_API_BASE_URL` into the Vite build, and the app uses that base URL for all NHL API calls in production.
