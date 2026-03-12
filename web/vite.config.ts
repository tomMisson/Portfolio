/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { generateSeoFiles } from './vite-plugins/generate-seo-files';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    generateSeoFiles(),
    analog({
      ssr: false,
      static: true,
      prerender: {
        routes: ['/'],
      },
    }),
    tailwindcss(),
  ],
}));
