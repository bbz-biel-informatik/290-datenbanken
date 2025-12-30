import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import { globSync } from 'glob';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(
          globSync('slides/*.html').map(file => [
            path.relative(__dirname, file).slice(0, -path.extname(file).length),
            resolve(__dirname, file)
          ])
        )
      }
    }
  }
});
