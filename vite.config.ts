import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    strictPort: true,
    port: 8080,
  },
  plugins: [react()],
});
