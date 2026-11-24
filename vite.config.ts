import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    proxy: {
      "api/cnpj": {
        target: "http://publica.cnpj.ws",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/cnpj/, "cnpj"),
      },
    },
  },
});
