import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Serve root-level images/ and videos/ without duplicating to public/
  publicDir: '.',
  build: {
    rollupOptions: {
      input: 'index-react.html',
    },
    // Don't copy entire root to dist — Vercel serves static assets from repo root
    copyPublicDir: false,
  },
})
