import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'heater'
const pagesApiPrefix = `/${repoName}/nhl-api`

const nhlApiProxy = {
  target: 'https://api-web.nhle.com',
  changeOrigin: true,
  rewrite: (path) => path.replace(/^\/nhl-api/, ''),
}

const pagesNhlApiProxy = {
  target: 'https://api-web.nhle.com',
  changeOrigin: true,
  rewrite: (path) => path.replace(new RegExp(`^/${repoName}/nhl-api`), ''),
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // to avoid CORS errors
    proxy: {
      '/nhl-api': nhlApiProxy,
      [pagesApiPrefix]: pagesNhlApiProxy,
    },
  },
  preview: {
    proxy: {
      '/nhl-api': nhlApiProxy,
      [pagesApiPrefix]: pagesNhlApiProxy,
    },
  },
})
