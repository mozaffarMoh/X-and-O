import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/X-and-O/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png"],
      manifest: {
        name: "X and O game",
        short_name: "XOGAME",
        scope: "/X-and-O/",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1976d2",
        screenshots: [
          {
            src: "screenshot.png",
            type: "image/png",
            sizes: "1920x1080",
            form_factor: "wide", // or "narrow" for mobile
          },
        ],
        icons: [
          {
            src: "image.png",
            sizes: "143x143",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "image.png",
            sizes: "143x143",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
