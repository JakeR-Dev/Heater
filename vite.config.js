import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const nhlApiProxy = {
  target: 'https://api-web.nhle.com',
  changeOrigin: true,
  rewrite: (path) => path.replace(/^\/nhl-api/, ''),
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // to avoid CORS errors locally
    proxy: {
      '/nhl-api': nhlApiProxy,
    },
  },
  preview: {
    proxy: {
      '/nhl-api': nhlApiProxy,
    },
  },
})
