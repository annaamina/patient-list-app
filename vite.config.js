import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any fetch starting with /api will be proxied to the target server
      '/api': {
        target: 'https://demo.lupinary.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})