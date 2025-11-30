import { useState } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

export function NotificationSettings({ onBack }) {
  const { settings, updateSettings, clearAll } = useNotifications();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaultSettings = {
      soundEnabled: true,
      toastEnabled: true,
      desktopEnabled: false,
    };
    setLocalSettings(defaultSettings);
  };

  const styles = {
    container: {
      maxWidth: '800px',
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
    backButton: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      background: '#ecf0f1',
      color: '#2c3e50',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s',
    },
    card: {
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '30px',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    settingItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      borderRadius: '8px',
      background: '#f8f9fa',
      marginBottom: '12px',
    },
    settingInfo: {
      flex: 1,
    },
    settingLabel: {
      fontSize: '15px',
      fontWeight: '500',
      color: '#2c3e50',
      marginBottom: '4px',
    },
    settingDescription: {
      fontSize: '13px',
      color: '#7f8c8d',
    },
    toggle: {
      position: 'relative',
      width: '50px',
      height: '26px',
      background: '#dfe6e9',
      borderRadius: '13px',
      cursor: 'pointer',
      transition: 'background 0.3s',
      border: 'none',
      padding: 0,
    },
    toggleActive: {
      background: '#27AE60',
    },
    toggleCircle: {
      position: 'absolute',
      top: '3px',
      left: '3px',
      width: '20px',
      height: '20px',
      background: '#ffffff',
      borderRadius: '50%',
      transition: 'transform 0.3s',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    toggleCircleActive: {
      transform: 'translateX(24px)',
    },
    actions: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    },
    button: {
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s',
    },
    saveButton: {
      background: '#27AE60',
      color: '#ffffff',
    },
    saveButtonSaved: {
      background: '#2ECC71',
    },
    resetButton: {
      background: '#E67E22',
      color: '#ffffff',
    },
    clearButton: {
      background: '#E74C3C',
      color: '#ffffff',
    },
    info: {
      background: '#EBF5FB',
      borderLeft: '4px solid #2E86C1',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#2c3e50',
      lineHeight: '1.6',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>⚙️ Настройки уведомлений</h1>
        <button
          onClick={onBack}
          style={styles.backButton}
          onMouseEnter={(e) => e.target.style.background = '#dfe6e9'}
          onMouseLeave={(e) => e.target.style.background = '#ecf0f1'}
        >
          ← Назад
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>
          🔔 Типы уведомлений
        </div>

        <div style={styles.settingItem}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Toast-уведомления</div>
            <div style={styles.settingDescription}>
              Всплывающие сообщения в углу экрана
            </div>
          </div>
          <button
            onClick={() => setLocalSettings({ ...localSettings, toastEnabled: !localSettings.toastEnabled })}
            style={{
              ...styles.toggle,
              ...(localSettings.toastEnabled ? styles.toggleActive : {}),
            }}
          >
            <div
              style={{
                ...styles.toggleCircle,
                ...(localSettings.toastEnabled ? styles.toggleCircleActive : {}),
              }}
            />
          </button>
        </div>

        <div style={styles.settingItem}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Звуковые уведомления</div>
            <div style={styles.settingDescription}>
              Звуковой сигнал при новом уведомлении
            </div>
          </div>
          <button
            onClick={() => setLocalSettings({ ...localSettings, soundEnabled: !localSettings.soundEnabled })}
            style={{
              ...styles.toggle,
              ...(localSettings.soundEnabled ? styles.toggleActive : {}),
            }}
          >
            <div
              style={{
                ...styles.toggleCircle,
                ...(localSettings.soundEnabled ? styles.toggleCircleActive : {}),
              }}
            />
          </button>
        </div>

        <div style={styles.settingItem}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Desktop-уведомления (скоро)</div>
            <div style={styles.settingDescription}>
              Системные уведомления на рабочем столе
            </div>
          </div>
          <button
            onClick={() => setLocalSettings({ ...localSettings, desktopEnabled: !localSettings.desktopEnabled })}
            style={{
              ...styles.toggle,
              ...(localSettings.desktopEnabled ? styles.toggleActive : {}),
            }}
            disabled
          >
            <div
              style={{
                ...styles.toggleCircle,
                ...(localSettings.desktopEnabled ? styles.toggleCircleActive : {}),
              }}
            />
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>
          ℹ️ Информация
        </div>
        <div style={styles.info}>
          <strong>О уведомлениях:</strong>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>Вы будете получать уведомления о новых заявках, комментариях и изменениях статуса</li>
            <li>Непрочитанные уведомления отображаются в центре уведомлений</li>
            <li>Звуковые уведомления можно отключить для тихой работы</li>
            <li>Все уведомления сохраняются локально в браузере</li>
          </ul>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionTitle}>
          🗑 Управление данными
        </div>
        <div style={styles.actions}>
          <button
            onClick={handleSave}
            style={{
              ...styles.button,
              ...(saved ? styles.saveButtonSaved : styles.saveButton),
            }}
            onMouseEnter={(e) => {
              if (!saved) e.target.style.background = '#229954';
            }}
            onMouseLeave={(e) => {
              if (!saved) e.target.style.background = '#27AE60';
            }}
          >
            {saved ? '✓ Сохранено!' : 'Сохранить настройки'}
          </button>
          <button
            onClick={handleReset}
            style={{ ...styles.button, ...styles.resetButton }}
            onMouseEnter={(e) => e.target.style.background = '#D35400'}
            onMouseLeave={(e) => e.target.style.background = '#E67E22'}
          >
            🔄 Сбросить
          </button>
          <button
            onClick={() => {
              if (confirm('Удалить все уведомления? Это действие нельзя отменить.')) {
                clearAll();
                alert('Все уведомления удалены');
              }
            }}
            style={{ ...styles.button, ...styles.clearButton }}
            onMouseEnter={(e) => e.target.style.background = '#C0392B'}
            onMouseLeave={(e) => e.target.style.background = '#E74C3C'}
          >
            🗑 Очистить все уведомления
          </button>
        </div>
      </div>
    </div>
  );
}
