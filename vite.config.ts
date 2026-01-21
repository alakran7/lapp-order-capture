
import { defineConfig } from 'vite';

export default defineConfig({
  // This ensures paths like /assets/ work on GitHub Pages subfolders
  base: './', 
  build: {
    outDir: 'dist',
    target: 'esnext'
  },
  server: {
    port: 3000
  }
});
