// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Also the base @astrojs/sitemap uses for every <loc>.
  site: 'https://faithlawncarellc.com',

  // Canonical URLs carry NO trailing slash. Cloudflare Pages serves
  // `<route>/index.html` for an extensionless path without redirecting, so the
  // no-slash form is a 200 — and this makes @astrojs/sitemap emit no-slash
  // <loc>s that match the <link rel="canonical"> on every page. A sitemap that
  // disagrees with the canonical tag is how pages end up "Redirect error" and
  // unindexed in Search Console.
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [alpinejs(), sitemap()],
});
