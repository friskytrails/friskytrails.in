import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

  plugins: [
    tailwindcss(),
    react()
  ],

  server: {
    allowedHosts: [
      'localhost',

      // 👇 Allows ngrok public URLs to access Vite dev server
      // REMOVE this line if you stop using ngrok
      '.ngrok-free.dev'
    ],

    // 👇 Proxy configuration for backend running on port 8000
    // This allows frontend to call backend using /api instead of localhost:8000
    // REMOVE this whole proxy block if you deploy frontend & backend separately
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // backend server
        changeOrigin: true
      }
    }
  }
})