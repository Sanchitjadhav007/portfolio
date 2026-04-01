import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  // Use the repo subpath only for GitHub Pages builds; deploy from root elsewhere.
  base: process.env.GITHUB_ACTIONS ? "/portfolio/" : "/",
  plugins: [react()]
}));
