import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/globals.css';

console.log('=== Начало загрузки приложения ===');

// Минимальный тест
function MinimalTest() {
  console.log('MinimalTest рендерится');
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#2E86C1', marginBottom: '20px' }}>
          ✓ React загружен успешно!
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Проверьте консоль браузера (F12) для деталей.
        </p>
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f0f0f0', 
          borderRadius: '8px',
          fontSize: '14px',
          color: '#333'
        }}>
          <strong>Время загрузки:</strong> {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

try {
  const root = document.getElementById('root');
  console.log('Root элемент найден:', root);
  
  ReactDOM.createRoot(root).render(<MinimalTest />);
  console.log('=== React успешно смонтирован ===');
} catch (error) {
  console.error('=== ОШИБКА при монтировании ===', error);
  document.body.innerHTML = `
    <div style="padding: 40px; font-family: Arial, sans-serif;">
      <h1 style="color: red;">Ошибка загрузки</h1>
      <pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; overflow: auto;">
        ${error.message}
        ${error.stack}
      </pre>
    </div>
  `;
}
