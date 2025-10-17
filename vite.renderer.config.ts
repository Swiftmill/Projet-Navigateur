import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'app/renderer'),
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/renderer')
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist/renderer'),
    emptyOutDir: true
  },
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true
  }
});
