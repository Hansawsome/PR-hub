import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site is served from /PR-hub/
  base: '/PR-hub/',
  plugins: [react()],
  server: { host: "0.0.0.0", port: 5179, strictPort: true },
  preview: { host: "0.0.0.0", port: 5179, strictPort: true },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
