import { useState, useEffect } from 'react';
import { securityLogger } from '../utils/security';

export function SecurityLogs({ onBack }) {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    const allLogs = securityLogger.getLogs();
    setLogs(allLogs);
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    if (filter === 'security') return log.event.includes('login') || log.event.includes('logout') || log.event.includes('session');
    if (filter === 'suspicious') return log.event.includes('failed') || log.event.includes('exceeded');
    return true;
  });

  const getEventColor = (event) => {
    if (event.includes('success')) return '#27AE60';
    if (event.includes('failed') || event.includes('error')) return '#E74C3C';
    if (event.includes('exceeded')) return '#E67E22';
    return '#3498DB';
  };

  const getEventIcon = (event) => {
    if (event.includes('login_success')) return '✓';
    if (event.includes('logout')) return '←';
    if (event.includes('failed')) return '✗';
    if (event.includes('session')) return '⏱';
    if (event.includes('registration')) return '📝';
    if (event.includes('role')) return '👤';
    return '🔒';
  };

  const formatEvent = (event) => {
    const eventNames = {
      'login_success': 'Успешный вход',
      'login_failed': 'Неудачная попытка входа',
      'login_error': 'Ошибка входа',
      'logout': 'Выход',
      'registration_success': 'Регистрация успешна',
      'registration_failed': 'Ошибка регистрации',
      'session_timeout': 'Таймаут сессии',
      'session_restored': 'Сессия восстановлена',
      'rate_limit_exceeded': 'Превышен лимит попыток',
      'role_changed': 'Изменение роли',
      'login_validation_failed': 'Ошибка валидации при входе',
      'registration_validation_failed': 'Ошибка валидации при регистрации',
    };
    return eventNames[event] || event;
  };

  const clearLogs = () => {
    if (confirm('Вы уверены, что хотите очистить все логи?')) {
      securityLogger.clearLogs();
      setLogs([]);
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px',
      fontFamily: 'Roboto, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '15px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
    },
    headerButtons: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s',
    },
    backButton: {
      background: '#ecf0f1',
      color: '#2c3e50',
    },
    clearButton: {
      background: '#E74C3C',
      color: '#ffffff',
    },
    refreshButton: {
      background: '#3498DB',
      color: '#ffffff',
    },
    filters: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    filterButton: {
      padding: '8px 16px',
      borderRadius: '20px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#ecf0f1',
      background: '#ffffff',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.3s',
    },
    filterButtonActive: {
      background: '#2E86C1',
      color: '#ffffff',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#2E86C1',
    },
    logsContainer: {
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      maxHeight: '600px',
      overflowY: 'auto',
    },
    logItem: {
      padding: '15px',
      borderBottom: '1px solid #ecf0f1',
      display: 'flex',
      gap: '15px',
      alignItems: 'flex-start',
    },
    logIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      flexShrink: 0,
    },
    logContent: {
      flex: 1,
    },
    logEvent: {
      fontWeight: '600',
      fontSize: '15px',
      marginBottom: '5px',
    },
    logDetails: {
      fontSize: '13px',
      color: '#7f8c8d',
      marginBottom: '8px',
    },
    logTimestamp: {
      fontSize: '12px',
      color: '#95a5a6',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#95a5a6',
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginBottom: '30px',
    },
    statCard: {
      background: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    statLabel: {
      fontSize: '14px',
      color: '#7f8c8d',
      marginBottom: '8px',
    },
    statValue: {
      fontSize: '28px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
    },
  };

  const stats = {
    total: logs.length,
    successful: logs.filter(l => l.event.includes('success')).length,
    failed: logs.filter(l => l.event.includes('failed')).length,
    suspicious: logs.filter(l => l.event.includes('exceeded') || l.event.includes('failed')).length,
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🔒 Логи безопасности</h1>
        <div style={styles.headerButtons}>
          <button
            onClick={loadLogs}
            style={{...styles.button, ...styles.refreshButton}}
          >
            🔄 Обновить
          </button>
          <button
            onClick={clearLogs}
            style={{...styles.button, ...styles.clearButton}}
          >
            🗑 Очистить
          </button>
          <button
            onClick={onBack}
            style={{...styles.button, ...styles.backButton}}
          >
            ← Назад
          </button>
        </div>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Всего событий</div>
          <div style={{...styles.statValue, color: '#3498DB'}}>{stats.total}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Успешных</div>
          <div style={{...styles.statValue, color: '#27AE60'}}>{stats.successful}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Неудачных</div>
          <div style={{...styles.statValue, color: '#E74C3C'}}>{stats.failed}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Подозрительных</div>
          <div style={{...styles.statValue, color: '#E67E22'}}>{stats.suspicious}</div>
        </div>
      </div>

      <div style={styles.filters}>
        <button
          onClick={() => setFilter('all')}
          style={{
            ...styles.filterButton,
            ...(filter === 'all' ? styles.filterButtonActive : {})
          }}
        >
          Все события
        </button>
        <button
          onClick={() => setFilter('security')}
          style={{
            ...styles.filterButton,
            ...(filter === 'security' ? styles.filterButtonActive : {})
          }}
        >
          Безопасность
        </button>
        <button
          onClick={() => setFilter('suspicious')}
          style={{
            ...styles.filterButton,
            ...(filter === 'suspicious' ? styles.filterButtonActive : {})
          }}
        >
          Подозрительные
        </button>
      </div>

      <div style={styles.logsContainer}>
        {filteredLogs.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>Логи отсутствуют</div>
            <div style={{ fontSize: '14px' }}>События безопасности будут отображаться здесь</div>
          </div>
        ) : (
          filteredLogs.map((log, index) => (
            <div key={index} style={styles.logItem}>
              <div
                style={{
                  ...styles.logIcon,
                  background: getEventColor(log.event) + '20',
                  color: getEventColor(log.event),
                }}
              >
                {getEventIcon(log.event)}
              </div>
              <div style={styles.logContent}>
                <div
                  style={{
                    ...styles.logEvent,
                    color: getEventColor(log.event),
                  }}
                >
                  {formatEvent(log.event)}
                </div>
                {log.details && Object.keys(log.details).length > 0 && (
                  <div style={styles.logDetails}>
                    {log.details.username && `Пользователь: ${log.details.username}`}
                    {log.details.role && ` | Роль: ${log.details.role}`}
                    {log.details.reason && ` | Причина: ${log.details.reason}`}
                    {log.details.remainingTime && ` | Осталось: ${log.details.remainingTime} мин`}
                  </div>
                )}
                <div style={styles.logTimestamp}>
                  {new Date(log.timestamp).toLocaleString('ru-RU')}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}