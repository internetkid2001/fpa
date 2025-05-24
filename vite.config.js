import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcssVite from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcssVite(),
  ],
  server: {
    port: 3000,
    host: true, // This will expose it to the network
  },
})