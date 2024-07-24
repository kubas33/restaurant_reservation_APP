import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    sourcemap: true,
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src'),
      '@components': path.resolve(__dirname,'src/components'),
      '@services': path.resolve(__dirname,'src/services'),
      '@views': path.resolve(__dirname,'src/views'),
    },
  }
})
