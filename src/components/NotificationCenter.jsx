import { useState } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

export function NotificationCenter({ onClose, onViewTicket }) {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    clearRead,
  } = useNotifications();

  const [filter, setFilter] = useState('all'); // 'all', 'unread'

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

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

  const getColor = (type) => {
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
    return colors[type] || '#95a5a6';
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.data.ticketId && onViewTicket) {
      onViewTicket(notification.data.ticketId);
      onClose();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    if (days < 7) return `${days} д назад`;
    return date.toLocaleDateString('ru-RU');
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9998,
      animation: 'fadeIn 0.2s ease',
    },
    panel: {
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      maxWidth: '450px',
      height: '100vh',
      background: '#ffffff',
      boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.2)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.3s ease',
      fontFamily: 'Roboto, sans-serif',
    },
    header: {
      padding: '20px',
      borderBottom: '2px solid #ecf0f1',
      background: '#f8f9fa',
    },
    headerTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
    },
    title: {
      fontSize: '22px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    badge: {
      background: '#E74C3C',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '2px 8px',
      fontSize: '12px',
      fontWeight: '600',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#7f8c8d',
      padding: '5px',
      transition: 'color 0.2s',
    },
    filters: {
      display: 'flex',
      gap: '8px',
    },
    filterButton: {
      padding: '6px 14px',
      borderRadius: '20px',
      border: 'none',
      background: '#ecf0f1',
      color: '#2c3e50',
      fontSize: '13px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    filterButtonActive: {
      background: '#2E86C1',
      color: '#ffffff',
    },
    actions: {
      padding: '12px 20px',
      borderBottom: '1px solid #ecf0f1',
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    },
    actionButton: {
      padding: '6px 12px',
      borderRadius: '6px',
      border: '1px solid #ecf0f1',
      background: '#ffffff',
      color: '#2c3e50',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontWeight: '500',
    },
    content: {
      flex: 1,
      overflowY: 'auto',
      padding: '10px',
    },
    notificationItem: {
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
      position: 'relative',
    },
    notificationItemUnread: {
      background: '#EBF5FB',
      borderLeft: '4px solid #2E86C1',
    },
    notificationItemRead: {
      background: '#f8f9fa',
      borderLeft: '4px solid transparent',
    },
    notificationIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      flexShrink: 0,
    },
    notificationContent: {
      flex: 1,
      minWidth: 0,
    },
    notificationTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '4px',
    },
    notificationMessage: {
      fontSize: '13px',
      color: '#7f8c8d',
      marginBottom: '6px',
      lineHeight: '1.4',
    },
    notificationTime: {
      fontSize: '11px',
      color: '#95a5a6',
    },
    deleteButton: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'none',
      border: 'none',
      color: '#95a5a6',
      fontSize: '18px',
      cursor: 'pointer',
      padding: '4px',
      opacity: 0,
      transition: 'opacity 0.2s',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#95a5a6',
    },
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.panel}>
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div style={styles.title}>
              🔔 Уведомления
              {unreadCount > 0 && (
                <span style={styles.badge}>{unreadCount}</span>
              )}
            </div>
            <button
              onClick={onClose}
              style={styles.closeButton}
              onMouseEnter={(e) => e.target.style.color = '#2c3e50'}
              onMouseLeave={(e) => e.target.style.color = '#7f8c8d'}
            >
              ×
            </button>
          </div>
          <div style={styles.filters}>
            <button
              onClick={() => setFilter('all')}
              style={{
                ...styles.filterButton,
                ...(filter === 'all' ? styles.filterButtonActive : {}),
              }}
            >
              Все ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              style={{
                ...styles.filterButton,
                ...(filter === 'unread' ? styles.filterButtonActive : {}),
              }}
            >
              Непрочитанные ({unreadCount})
            </button>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            onClick={markAllAsRead}
            style={styles.actionButton}
            disabled={unreadCount === 0}
            onMouseEnter={(e) => {
              if (unreadCount > 0) e.target.style.background = '#ecf0f1';
            }}
            onMouseLeave={(e) => e.target.style.background = '#ffffff'}
          >
            ✓ Прочитать все
          </button>
          <button
            onClick={clearRead}
            style={styles.actionButton}
            disabled={notifications.length === unreadCount}
            onMouseEnter={(e) => {
              if (notifications.length !== unreadCount) e.target.style.background = '#ecf0f1';
            }}
            onMouseLeave={(e) => e.target.style.background = '#ffffff'}
          >
            🗑 Удалить прочитанные
          </button>
          <button
            onClick={() => {
              if (confirm('Удалить все уведомления?')) clearAll();
            }}
            style={styles.actionButton}
            disabled={notifications.length === 0}
            onMouseEnter={(e) => {
              if (notifications.length > 0) e.target.style.background = '#ffe6e6';
            }}
            onMouseLeave={(e) => e.target.style.background = '#ffffff'}
          >
            🗑 Очистить все
          </button>
        </div>

        <div style={styles.content}>
          {filteredNotifications.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: '64px', marginBottom: '15px' }}>🔔</div>
              <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                {filter === 'unread' ? 'Нет непрочитанных уведомлений' : 'Нет уведомлений'}
              </div>
              <div style={{ fontSize: '14px' }}>
                {filter === 'unread' 
                  ? 'Все уведомления прочитаны'
                  : 'Уведомления будут отображаться здесь'
                }
              </div>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                style={{
                  ...styles.notificationItem,
                  ...(notification.read 
                    ? styles.notificationItemRead 
                    : styles.notificationItemUnread
                  ),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(-4px)';
                  const deleteBtn = e.currentTarget.querySelector('[data-delete]');
                  if (deleteBtn) deleteBtn.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  const deleteBtn = e.currentTarget.querySelector('[data-delete]');
                  if (deleteBtn) deleteBtn.style.opacity = '0';
                }}
              >
                <div
                  style={{
                    ...styles.notificationIcon,
                    background: getColor(notification.type) + '20',
                    color: getColor(notification.type),
                  }}
                >
                  {getIcon(notification.type)}
                </div>
                <div style={styles.notificationContent}>
                  <div style={styles.notificationTitle}>
                    {notification.title}
                  </div>
                  <div style={styles.notificationMessage}>
                    {notification.message}
                  </div>
                  <div style={styles.notificationTime}>
                    {formatTime(notification.timestamp)}
                  </div>
                </div>
                <button
                  data-delete
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  style={styles.deleteButton}
                  onMouseEnter={(e) => e.target.style.color = '#E74C3C'}
                  onMouseLeave={(e) => e.target.style.color = '#95a5a6'}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
