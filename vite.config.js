// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/react_github_deploy/', // <- important!
  plugins: [react()],
})
