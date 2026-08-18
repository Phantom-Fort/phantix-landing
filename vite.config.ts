import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const UPSTREAM = "https://staging.phantix.site";
const SANDBOX_APPLY = "http://127.0.0.1:8787";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175,
    host: true,
    proxy: {
      "/api": {
        target: UPSTREAM,
        changeOrigin: true,
        secure: true,
        ws: true,
      },
      "/sandbox-apply": {
        target: SANDBOX_APPLY,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/sandbox-apply/, ""),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
