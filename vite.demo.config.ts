import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/react-top-bottom-scroll/",
  plugins: [react()],
  build: {
    outDir: "dist-demo",
  },
});
