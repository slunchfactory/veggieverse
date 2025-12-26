import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';

// GitHub Pages SPA 라우팅을 위한 플러그인
const copy404Plugin = () => {
  return {
    name: 'copy-404',
    writeBundle() {
      // 빌드 후 index.html을 404.html로 복사
      copyFileSync(
        path.resolve(__dirname, 'dist/index.html'),
        path.resolve(__dirname, 'dist/404.html')
      );
    }
  };
};

export default defineConfig({
  base: '/veggieverse/',
  server: {
    port: 3000,
    host: 'localhost',
  },
  publicDir: 'public',
  plugins: [
    react(),
    copy404Plugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
