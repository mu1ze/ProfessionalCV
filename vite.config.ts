import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'jay-yeast-qualify-agreement.trycloudflare.com',
      '.trycloudflare.com'
    ]
  }
})
