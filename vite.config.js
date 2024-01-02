import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: true, // Set to true if your backend is using HTTPS
      },
    },
  },
})
