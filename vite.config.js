import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {}, // empty env object to avoid runtime crash
  },
  plugins: [react(),tailwindcss()],
})
