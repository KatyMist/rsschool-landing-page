import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Замени '/' на '/rsschool-landing-page/', если деплоишь на GitHub Pages
  // как username.github.io/rsschool-landing-page
  base: './',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catalog: resolve(__dirname, 'catalog.html'),
      },
    },
  },
});
