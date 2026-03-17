import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages deployment (project site at username.github.io/a11y-examples/)
  base: process.env.NODE_ENV === 'production' ? '/a11y-examples/' : '/',
});
