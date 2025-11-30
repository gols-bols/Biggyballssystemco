import { useNotifications } from '../contexts/NotificationContext';

export function ToastContainer() {
  const { toastMessages } = useNotifications();

  const getToastColor = (type) => {
    const colors = {
      new_ticket: '#3498DB',
      status_change: '#9B59B6',
      comment: '#2E86C1',
      priority_change: '#E67E22',
      completed: '#27AE60',
      assigned: '#1ABC9C',
      reminder: '#F39C12',
      error: '#E74C3C',
    };
    return colors[type] || '#3498DB';
  };

  const getIcon = (type) => {
    const icons = {
      new_ticket: '🆕',
      status_change: '🔄',
      comment: '💬',
      priority_change: '⚡',
      completed: '✅',
      assigned: '👤',
      reminder: '⏰',
      error: '❌',
    };
    return icons[type] || '🔔';
  };

  const styles = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      pointerEvents: 'none',
    },
    toast: {
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      padding: '16px 20px',
      minWidth: '320px',
      maxWidth: '420px',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
      animation: 'slideInRight 0.3s ease, fadeOut 0.3s ease 3.7s',
      pointerEvents: 'auto',
      fontFamily: 'Roboto, sans-serif',
    },
    icon: {
      fontSize: '24px',
      flexShrink: 0,
    },
    content: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '4px',
    },
    message: {
      fontSize: '13px',
      color: '#7f8c8d',
      lineHeight: '1.4',
    },
    progressBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '3px',
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
      animation: 'progress 4s linear',
    },
  };

  if (toastMessages.length === 0) return null;

  return (
    <>
      <div style={styles.container}>
        {toastMessages.map((toast) => (
          <div key={toast.id} style={styles.toast}>
            <div style={styles.icon}>{getIcon(toast.type)}</div>
            <div style={styles.content}>
              <div style={styles.title}>{toast.title}</div>
              <div style={styles.message}>{toast.message}</div>
            </div>
            <div
              style={{
                ...styles.progressBar,
                background: getToastColor(toast.type),
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </>
  );
}
