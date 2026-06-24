import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repo at https://fm-web-studio.github.io/Sunika-21st/
// so all asset URLs must be prefixed with the repo name.
export default defineConfig({
  base: '/Sunika-21st/',
  plugins: [react()],
})
