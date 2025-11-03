import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    allowedHosts: [
      'lana-noncognizable-frustratedly.ngrok-free.dev'
    ],
    hmr: {
      clientPort: 443
    }
  }
})