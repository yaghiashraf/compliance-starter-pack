import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'stripe-vendor': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'zip-vendor': ['jszip'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
