import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.css', '.scss']
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        utils: path.resolve(__dirname, 'src/utils.ts'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        },
        assetFileNames: 'assets/[name].[hash][extname]'
      },
    },
  },
  optimizeDeps: {
    include: ['@/lib/utils/index.ts']
  }
});
