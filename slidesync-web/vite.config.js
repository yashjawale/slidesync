import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "SlideSync Mobile",
        short_name: "SlideSync",
        shortcuts: [
          {
            name: "Scan QR Code",
            short_name: "Scan",
            description: "Scan QR Code from SlideSync Desktop",
            url: "/scan",
          },
          {
            name: "Enter Code Manually",
            short_name: "Enter Code",
            description: "Enter SlideSync Desktop code manually",
            url: "/codeentry",
          },
        ],
        icons: [
          // {
          //   src: "/icons/manifest-icon-512.maskable.png",
          //   sizes: "512x512",
          //   type: "image/png",
          //   purpose: "any maskable",
          // },
          {
            src: "icons/slidesync.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable any",
          },
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
