import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';
import { installAnalytics } from './lib/analytics';
import { registerPwaServiceWorker } from './lib/pwaSw';

installAnalytics();
registerPwaServiceWorker();

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Missing #root element');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
