import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/monolit/portal/', // Adjust this if your assets are served from a different path
  plugins: [preact()],
  build: {
    outDir: './monolit/portal', // Custom output directory
    rollupOptions: {
      output: {
        format: 'es', // Use ES modules
      },
    },
  },
});