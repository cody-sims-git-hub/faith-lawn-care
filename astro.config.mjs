// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Also the base @astrojs/sitemap uses for every <loc>.
  site: 'https://faithlawncarellc.com',

  // Canonical URLs carry NO trailing slash, and the sitemap and <link
  // rel="canonical"> both emit that form.
  trailingSlash: 'never',

  // `format: 'file'` is what actually makes the no-slash form work on
  // Cloudflare Pages, and it is not optional here.
  //
  // With the default 'directory' format Astro writes dist/services/index.html,
  // and Pages answers a request for /services with a 308 to /services/. That
  // means every URL in our own sitemap redirects — which is precisely how pages
  // land in Search Console as "Page with redirect" and never get indexed. This
  // was verified against the live deploy, not assumed: /services returned
  // 308 -> /services/ while the sitemap advertised /services.
  //
  // 'file' writes dist/services.html instead, which Pages serves directly at
  // /services with a 200.
  build: {
    format: 'file',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [alpinejs(), sitemap()],
});
