import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), nodePolyfills()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://pemira.infinityprogress.id', // Proxy target URL
        changeOrigin: true, // Changes the origin of the host header to the target URL
        secure: false, // Use false if the target has a self-signed SSL certificate
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request:', req.url)
          })
        }
      }
    }
  }
})
