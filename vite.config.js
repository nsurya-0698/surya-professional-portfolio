import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup';

// https://vite.dev/config/
export default defineConfig({
  base: '/surya-professional-portfolio/',
  plugins: [react(), svgr()],
})
