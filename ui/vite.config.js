import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Explicitly set the port
    proxy: {
      '/api': {
        target: 'https://school-backend-umg3.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove '/api' prefix if not needed in backend
      },
    },
  },
  build: {
    outDir: 'dist', // Output directory for the built files
  },
});
