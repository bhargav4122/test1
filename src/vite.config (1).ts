import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base public path (change if deploying to subdirectory)
  base: '/',
  
  // Build configuration
  build: {
    outDir: 'dist', // Match Vercel expected output
    emptyOutDir: true, // Clear dist folder before build
    chunkSizeWarningLimit: 1000, // Adjust warning threshold
    rollupOptions: {
      output: {
        // Code splitting optimization
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            return 'vendor';
          }
        },
        // Asset naming
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },

  // Development server
  server: {
    host: '::', // Listen on all addresses
    port: 8080,
    strictPort: true // Fail if port is occupied
  },

  // Plugins
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Bundle analyzer (only in production)
    mode === 'production' && visualizer({
      open: true,
      filename: 'dist/bundle-stats.html',
      gzipSize: true,
      brotliSize: true
    })
  ].filter(Boolean),

  // Module resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add other aliases as needed
    }
  },

  // CSS handling
  css: {
    devSourcemap: true, // Sourcemaps in development
    postcss: {
      plugins: [
        require('autoprefixer') // Add autoprefixer
      ]
    }
  },

  // Environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode)
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      // Add other large dependencies that don't change often
    ],
    exclude: [
      // Exclude dependencies that should be bundled separately
    ]
  }
}));
