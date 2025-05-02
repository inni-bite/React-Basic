import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@assets/styles/main.scss';
import '@assets/styles/fonts.css';
import '@assets/styles/landing.css';
import '@assets/styles/cursor.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
