/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    target: "es2020",
    minify: "esbuild",
    lib: {
      entry: "src/index.ts",
      name: "react-top-bottom-scroll",
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        compact: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  esbuild: {
    legalComments: "none",
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      include: ["src"],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
