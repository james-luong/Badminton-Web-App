import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
      proxy: {
        // Forward every /api/* request to the PHP backend during `npm run dev`.
        // Without this, fetch('/api/products/list.php') hits the Vite SPA server
        // (port 5173) and gets HTML back instead of JSON, causing all API calls
        // to silently fail.
        '/api': {
          target: 'http://localhost:5173',
          changeOrigin: true,
          // No rewrite needed — the PHP server also expects the /api/ prefix.
        },
      },
    }
})
