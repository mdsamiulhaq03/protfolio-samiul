import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "#src/components": resolve(root, "components"),
      "#src/constants": resolve(root, "constants"),
      "#src/store": resolve(root, "store"),
      "#src/hos": resolve(root, "hos"),
      "#src/windows": resolve(root, "windows"),
    },
  },
});
