import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      '/api': {  // use /api without quotes
        target: process.env.URL_CLIENT,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  optimizeDeps:{
    esbuildOptions:{
      plugins:[esbuildCommonjs(['react-moment'])]
    }
  }
})
