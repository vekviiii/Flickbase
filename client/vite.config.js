import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

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
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  optimizeDeps: {
    include: ['moment', 'moment-duration-format'],
    exclude: ['lodash'],
    esbuildOptions: {
      plugins: [esbuildCommonjs(['moment', 'moment-duration-format'])]
    }
  },
  build: {
    sourcemap: true,
  },
});