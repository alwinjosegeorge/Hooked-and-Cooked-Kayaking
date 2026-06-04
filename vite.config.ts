import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Prevent @tailwindcss/vite from triggering an infinite restart loop
      // by excluding the config file itself from being watched
      ignored: ['**/vite.config.*'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Let Vite/Rollup code-split node_modules naturally to avoid bundling heavy libs into the main chunk
      }
    }
  }
})
