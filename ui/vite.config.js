import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://school-backend-umg3.onrender.com",  // Target backend server
        changeOrigin: true,  // This is useful if the backend server is on a different origin
      
      },
      
    },
  },
});
