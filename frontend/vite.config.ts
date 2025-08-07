import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    host: "0.0.0.0", // Esto hace que Vite escuche en todas las interfaces de red
    port: 4200,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
