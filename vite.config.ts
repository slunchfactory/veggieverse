import path from 'path';
import { stat, readFile } from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BASE = '/veggieverse/';
const BASE_NO_SLASH = '/veggieverse';

/** 로컬 dev 고정 포트: http://localhost:3003/veggieverse/ (점유 시 터미널 에러 → 해당 포트 프로세스 종료) */
const DEV_PORT = 3003;

/** `/veggieverse` → `/veggieverse/` (Vite는 trailing slash 없으면 404 → SPA·에셋 로드 실패 방지) */
const basePathRedirectPlugin = () => ({
  name: 'base-path-redirect',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: () => void) => {
      const raw = req.url || '';
      const pathOnly = raw.split('?')[0];
      if (pathOnly !== BASE_NO_SLASH) return next();
      const q = raw.includes('?') ? raw.slice(raw.indexOf('?')) : '';
      res.writeHead(302, { Location: `${BASE}${q}` });
      res.end();
    });
  },
});

// dev: public 폴더를 base 경로(/veggieverse/images/...)로 서빙
const publicUnderBasePlugin = () => ({
  name: 'public-under-base',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: () => void) => {
      const url = req.url?.split('?')[0] || '';
      if (!url.startsWith(BASE) || url === BASE || url === `${BASE}index.html`) return next();
      const relative = url.slice(BASE.length).replace(/^\//, '');
      if (relative.includes('..')) return next();
      const publicDir = path.resolve(__dirname, 'public');
      const filePath = path.resolve(publicDir, relative);
      if (!filePath.startsWith(publicDir)) return next();
      stat(filePath, (err, st) => {
        if (err || !st?.isFile()) return next();
        readFile(filePath, (readErr, data) => {
          if (readErr) return next();
          const ext = path.extname(filePath);
          const types: Record<string, string> = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon' };
          res.statusCode = 200;
          res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
          res.end(data);
        });
      });
    });
  },
});

export default defineConfig({
  base: BASE,
  clearScreen: false,
  server: {
    port: DEV_PORT,
    strictPort: true,
    host: 'localhost',
    open: `${BASE}subscribe`,
    headers: {
      'Cache-Control': 'no-store',
    },
    // 소스 저장 시 브라우저 즉시 반영 (React Fast Refresh). 터미널 재시작 불필요 — vite.config 수정 시만 dev 재실행
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    },
    hmr: {
      host: 'localhost',
      port: DEV_PORT,
      clientPort: DEV_PORT,
    },
  },
  publicDir: 'public',
      plugins: [react(), basePathRedirectPlugin(), publicUnderBasePlugin()],
  envPrefix: ['VITE_', 'GEMINI_'],
      define: {
    'process.env.API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
});
