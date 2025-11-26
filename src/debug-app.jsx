// Минимальная версия приложения для отладки
import { useState, useEffect } from 'react';

export function DebugApp() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState('Инициализация...');

  useEffect(() => {
    console.log('1. DebugApp смонтирован');
    setStep('Монтирование завершено');
    
    const timer = setTimeout(() => {
      console.log('2. Таймер сработал');
      setMounted(true);
      setStep('Приложение готово');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: 'Roboto, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#2E86C1', marginBottom: '20px' }}>
          Тестовое приложение
        </h1>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Статус: {step}
        </p>
        <p style={{ color: mounted ? '#27AE60' : '#E74C3C' }}>
          {mounted ? '✓ Загрузка успешна' : '⏳ Загрузка...'}
        </p>
        {mounted && (
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => {
                console.log('Переключение на основное приложение');
                window.location.reload();
              }}
              style={{
                background: '#2E86C1',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Все работает! Кликните для перезагрузки
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
