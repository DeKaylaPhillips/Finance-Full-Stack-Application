import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/static/",
  build: {
    outDir: "../backend/static",
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  plugins: [react()],
});
