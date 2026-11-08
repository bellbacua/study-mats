import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { sqliteApiPlugin } from './server/vite-plugin-sqlite.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sqliteApiPlugin(),
    // Installable app (desktop & Android) that keeps working offline.
    // The /api routes always go to the network so progress lands in SQLite.
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Study Mats',
        short_name: 'Study Mats',
        description: 'Materials engineering from counting upward, with history, animations and practice.',
        theme_color: '#08090b',
        background_color: '#08090b',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          { urlPattern: ({ url }) => url.pathname.startsWith('/api'), handler: 'NetworkOnly' },
          {
            urlPattern: ({ url }) => url.hostname === 'upload.wikimedia.org' || url.pathname.startsWith('/api/rest_v1/page/summary'),
            handler: 'CacheFirst',
            options: { cacheName: 'pictures', expiration: { maxEntries: 600 }, cacheableResponse: { statuses: [0, 200] } },
          },
          {
            urlPattern: ({ url }) => url.origin.includes('fonts.g'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'fonts' },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'katex'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      clientPort: 5173,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
});
