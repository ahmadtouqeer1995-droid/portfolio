import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { LanguageProvider } from './i18n';

// No StrictMode: it double-mounts in dev, which would start the fluid
// simulation twice on the same canvas — unlike toukoum.fr's production build.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>
);
