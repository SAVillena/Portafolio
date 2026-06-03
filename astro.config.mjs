import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import vitePluginResizeImages from './vite-plugin-resize-images.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://sergio-villena-portfolio.vercel.app',
  integrations: [react()],
  vite: {
    plugins: [
      // Resize images to optimal dimensions per directory
      vitePluginResizeImages({
        dirConfigs: {
          projects: {
            cardMaxWidth: 1000,
            cardMaxHeight: 700,
            detailMaxWidth: 1600,
            detailMaxHeight: 1000,
          },
          profile: {
            detailMaxWidth: 800,
            detailMaxHeight: 800,
            avatarMaxWidth: 256,
            avatarMaxHeight: 256,
          },
        },
      }),
      // Compress webp images in public/ directory
      ViteImageOptimizer({
        includePublic: true,
        webp: {
          lossless: false,
          quality: 80,
          effort: 6,
        },
      }),
    ],
  },
});
