import react from '@vitejs/plugin-react-swc';
import dns from 'dns';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  test: {
    exclude: [...configDefaults.exclude, '**/e2e/**'],
  },
});
