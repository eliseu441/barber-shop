import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [preact()],
  build: {
    outDir: './monolit/portal', // Certifique-se de que esse diretório existe e está correto
    rollupOptions: {
      output: {
        format: 'es', // Use ES modules
      },
    },
  },
});