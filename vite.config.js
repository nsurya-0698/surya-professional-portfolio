import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const cloudflareWebAnalytics = {
  name: 'cloudflare-web-analytics',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler: () => [
      {
        tag: 'script',
        attrs: {
          type: 'module',
          src: 'https://static.cloudflareinsights.com/beacon.min.js',
          'data-cf-beacon': JSON.stringify({ token: 'dde8fd546b724e12b1f3ce6e9b640360' }),
        },
        injectTo: 'body',
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  base: '/surya-professional-portfolio/',
  plugins: [react(), cloudflareWebAnalytics],
});
