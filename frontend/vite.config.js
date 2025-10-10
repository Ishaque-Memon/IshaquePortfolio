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
  // Change cache directory to temp folder to avoid permission issues
  cacheDir: path.join(process.env.TEMP || process.env.TMPDIR || 'C:\\Temp', '.vite-portfolio'),
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
