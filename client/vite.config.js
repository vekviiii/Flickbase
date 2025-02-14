import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://flickbase-mu.vercel.app",
        changeOrigin: true,
        secure: true,
      }
    }
  },
  build: {
    sourcemap: true,
  },
});