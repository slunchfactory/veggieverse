import path from 'path';
import { stat, readFile } from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BASE = '/veggieverse/';

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
      server: {
        port: 3000,
    host: 'localhost',
      },
  publicDir: 'public',
      plugins: [react(), publicUnderBasePlugin()],
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
