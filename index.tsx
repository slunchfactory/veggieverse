import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/** 브라우저 자동 스크롤 복원이 긴 페이지에서 오동작할 때 대비 (새로고침 후 맨 아래로 튐 등) */
if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);