import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [solidPlugin(), vanillaExtractPlugin()],
  test: {
    deps: {
      registerNodeLoader: true,
      inline: [/solid-js/],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: [
      "node_modules/@testing-library/jest-dom/extend-expect",
      "./setupVitest.js",
    ],
    transformMode: { web: [/\.[jt]sx?$/] },
  },
  resolve: {
    conditions: ["development", "browser"],
  },
});
