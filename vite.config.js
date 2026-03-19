import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.BUILD_TYPE === 'electron'
    ? './'
    : (process.env.BASE_PATH || '/'),
  build: {
    outDir: process.env.BUILD_TYPE === 'electron' ? 'dist' : 'web-build',
    emptyOutDir: true,
  },
  server: {
    headers: {
      'Service-Worker-Allowed': '/',
    },
  },
});
