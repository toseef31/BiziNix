import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true, // Source map generation must be turned on
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [
    vue(),
    vueJsx(), 
    sentryVitePlugin({
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: "bizinix",
    project: "fe-vue",
  }),],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
  