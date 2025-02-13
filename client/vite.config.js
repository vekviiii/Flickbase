import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // proxying /api requests
        target: "https://flickbase-mu.vercel.app",
        changeOrigin: true,
        secure: true,
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['react-moment'])]
    }
  },
  build: {
    sourcemap: true, // Enable source maps for production builds
  },
});
