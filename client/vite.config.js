import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: true,   // allow all replit hosts
    host: true,           // allow external access
    port: 3000
  },

  preview: {
    allowedHosts: true,
    host: true,
    port: 3000
  }
});
