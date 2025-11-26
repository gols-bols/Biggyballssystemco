import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.tsx';
import { ErrorBoundary } from '../error-boundary.jsx';
import '../styles/globals.css';

// Убираем StrictMode который может вызывать проблемы
ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);