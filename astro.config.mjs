import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://sergiovillena.dev', // Actualiza con tu dominio real
  integrations: [react()],
});
