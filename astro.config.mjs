// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://hnbevan.github.io",
  base: "/dog-walking-one-page-design",
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
