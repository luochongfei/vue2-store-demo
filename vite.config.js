import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@comBase': fileURLToPath(new URL('./src/components/base', import.meta.url)),
      '@comBusi': fileURLToPath(new URL('./src/components/business', import.meta.url)),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.vevor.com/',
        changeOrigin: true,
      }
    }
  }
})
