import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary перехватил ошибку:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Детали ошибки:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#f5f5f5',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <h1 style={{ color: '#E74C3C', marginBottom: '20px', fontFamily: 'Montserrat, sans-serif' }}>
              Произошла ошибка
            </h1>
            <p style={{ color: '#666', marginBottom: '20px', fontFamily: 'Roboto, sans-serif' }}>
              Приложение столкнулось с неожиданной ошибкой. Попробуйте перезагрузить страницу.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#2E86C1',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px'
              }}
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}