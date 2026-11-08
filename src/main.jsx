import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import './styles/fonts.css';
import './styles/global.css';
import './styles/components.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
