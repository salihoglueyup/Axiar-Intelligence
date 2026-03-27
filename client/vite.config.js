import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Hot reload için eklenecekler
    // @vitejs/plugin-react-refresh
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          vendor: ['react', 'react-dom'],
          
          // Split major components
          ui: [
            './src/components/ui/Button.jsx',
            './src/components/ui/Card.jsx',
            './src/components/ui/Input.jsx',
            './src/components/ui/EnhancedLoader.jsx',
            './src/components/ui/GlobalErrorBoundary.jsx',
          ],
          
          // Split pages
          pages: [
            './src/pages/Home.jsx',
            './src/pages/Analytics.jsx',
            './src/pages/Enterprise.jsx',
            './src/pages/AI.jsx',
            './src/pages/Global.jsx',
            './src/pages/NotFound.jsx',
          ],
          
          // Split landing components
          landing: [
            './src/components/landing/Hero.jsx',
            './src/components/landing/ContactSection.jsx',
            './src/components/landing/EcosystemGrid.jsx',
            './src/components/landing/Showcase.jsx',
            './src/components/landing/TechMarquee.jsx',
            './src/components/landing/Manifesto.jsx',
            './src/components/landing/ParticleCanvas.jsx',
          ],
        },
      },
    },
    optimizeDeps: {
      // Optimize bundle size
      include: ['react', 'react-dom'],
    },
  },
  server: {
    port: 5173,
    hmr: {
      overlay: true,
      port: 5174
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
