import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base:process.env.VITE_BASE_PATH || "/e-commerce/tree/main/cotext",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
