import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/monolit/portal/', // Ajuste o caminho base conforme necessário
  plugins: [preact()],
  build: {
    outDir: 'monolit/portal', // Diretório de saída para o build
  },
});