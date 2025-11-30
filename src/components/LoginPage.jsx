import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validators, securityLogger } from '../utils/security';

export function LoginPage({ onSwitchToRegister }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    // Базовая валидация (не такая строгая как при регистрации)
    if (!username || username.length < 3) {
      errors.username = 'Логин должен содержать минимум 3 символа';
    }
    if (!password || password.length < 3) {
      errors.password = 'Пароль слишком короткий';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});
    
    // Валидация
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      securityLogger.log('login_validation_failed', { username, errors });
      return;
    }
    
    setIsLoading(true);

    try {
      // login теперь асинхронный (из-за хеширования)
      const result = await login(username, password);
      
      if (!result.success) {
        setError(result.error || 'Ошибка входа');
      }
    } catch (err) {
      console.error('Ошибка при входе:', err);
      setError('Произошла непредвиденная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2E86C1 0%, #1A5276 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Roboto, sans-serif',
    },
    card: {
      width: '100%',
      maxWidth: '450px',
      background: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      padding: '50px 40px',
    },
    logoContainer: {
      width: '80px',
      height: '80px',
      background: '#2E86C1',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 30px',
    },
    logo: {
      width: '45px',
      height: '45px',
      color: '#ffffff',
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      textAlign: 'center',
      marginBottom: '10px',
      color: '#2c3e50',
    },
    subtitle: {
      fontSize: '16px',
      color: '#7f8c8d',
      textAlign: 'center',
      marginBottom: '40px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#2c3e50',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '14px 16px 14px 45px',
      fontSize: '15px',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s',
      fontFamily: 'Roboto, sans-serif',
      boxSizing: 'border-box',
    },
    inputFocus: {
      border: '2px solid #2E86C1',
      boxShadow: '0 0 0 3px rgba(46, 134, 193, 0.1)',
    },
    inputIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      color: '#95a5a6',
    },
    togglePassword: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '5px',
      color: '#95a5a6',
    },
    button: {
      width: '100%',
      padding: '16px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#ffffff',
      background: 'linear-gradient(135deg, #2E86C1 0%, #1A5276 100%)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      marginTop: '10px',
      fontFamily: 'Montserrat, sans-serif',
      boxShadow: '0 4px 15px rgba(46, 134, 193, 0.3)',
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(46, 134, 193, 0.4)',
    },
    buttonDisabled: {
      background: '#95a5a6',
      cursor: 'not-allowed',
      transform: 'none',
    },
    error: {
      padding: '15px',
      background: '#ffebee',
      border: '1px solid #ffcdd2',
      borderRadius: '10px',
      color: '#c62828',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    divider: {
      margin: '30px 0',
      textAlign: 'center',
      position: 'relative',
    },
    dividerText: {
      background: '#ffffff',
      padding: '0 15px',
      color: '#95a5a6',
      fontSize: '14px',
      position: 'relative',
      zIndex: 1,
    },
    dividerLine: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      background: '#e0e0e0',
      zIndex: 0,
    },
    testAccounts: {
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '12px',
      marginTop: '20px',
    },
    testAccountTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '12px',
      textAlign: 'center',
    },
    testAccountItem: {
      fontSize: '13px',
      color: '#555',
      marginBottom: '8px',
      padding: '8px 12px',
      background: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
    },
    registerLink: {
      textAlign: 'center',
      marginTop: '25px',
      fontSize: '14px',
      color: '#7f8c8d',
    },
    link: {
      color: '#2E86C1',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <svg style={styles.logo} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>

        <h1 style={styles.title}>Добро пожаловать!</h1>
        <p style={styles.subtitle}>Система управления заявками IT-отдела</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.error}>
              <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Логин
            </label>
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
                style={styles.input}
                placeholder="Введите логин"
                disabled={isLoading}
              />
            </div>
            {validationErrors.username && (
              <div style={{ color: '#c62828', fontSize: '12px', marginTop: '5px' }}>
                {validationErrors.username}
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Пароль
            </label>
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
                style={styles.input}
                placeholder="Введите пароль"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.togglePassword}
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {validationErrors.password && (
              <div style={{ color: '#c62828', fontSize: '12px', marginTop: '5px' }}>
                {validationErrors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{...styles.button, ...(isLoading ? styles.buttonDisabled : {})}}
            onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={(e) => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = '0 4px 15px rgba(46, 134, 193, 0.3)';
            }}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>Тестовые аккаунты</span>
        </div>

        <div style={styles.testAccounts}>
          <div style={styles.testAccountTitle}>🔑 Для быстрого входа:</div>
          <div style={styles.testAccountItem}>
            <strong>Админ:</strong> admin / admin123
          </div>
          <div style={styles.testAccountItem}>
            <strong>Пользователь:</strong> user / user123
          </div>
        </div>

        <div style={styles.registerLink}>
          Нет аккаунта?{' '}
          <span style={styles.link} onClick={onSwitchToRegister}>
            Зарегистрироваться
          </span>
        </div>
      </div>
    </div>
  );
}