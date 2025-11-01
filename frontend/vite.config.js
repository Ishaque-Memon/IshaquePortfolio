import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Prevent file lock issues
    watch: {
      usePolling: true,
    },
  },
  // Fix for dependency optimization issues
  optimizeDeps: {
    exclude: [], // Add problematic dependencies here if needed
    force: false, // Set to true to force re-optimization
  },
  build: {
    outDir: 'build',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp', '**/*.mp4', '**/*.mov', '**/*.avi', '**/*.webm']
})
