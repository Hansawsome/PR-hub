import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
// Vercel (or local dev): served from "/". GitHub Pages project site: served from "/PR-hub/".
// `import.meta.env.BASE_URL` in the app reflects this automatically.
const base = process.env.GITHUB_ACTIONS ? '/PR-hub/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: { host: "0.0.0.0", port: 5179, strictPort: true },
  preview: { host: "0.0.0.0", port: 5179, strictPort: true },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
