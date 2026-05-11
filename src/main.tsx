import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { App } from './App';
import './styles/global.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for offline PWA support
if ('serviceWorker' in navigator) {
  registerSW({ immediate: true });
}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Missing #root element');

createRoot(rootEl).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);
