import { defineConfig, splitVendorChunkPlugin } from 'vite';

// vite plugins
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), splitVendorChunkPlugin()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
});
