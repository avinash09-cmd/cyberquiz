import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'cyberquiz' with your actual GitHub repository name
const repoName = 'cyberquiz'

export default defineConfig({
  plugins: [react()],
  // Base URL for GitHub Pages: https://<username>.github.io/<repo>/
  base: `/${repoName}/`,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        }
      }
    }
  }
})
