import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

export function Navbar({
  currentPage,
  onNavigateAdmin,
  onNavigateDashboard,
  onNavigateStatistics,
  onNavigateDocumentation,
  onNavigateSecurityLogs,
  onToggleNotifications,
}) {
  const { user, isAdmin, logout, toggleRole } = useAuth();
  const { unreadCount } = useNotifications();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const styles = {
    header: {
      background: '#ffffff',
      borderBottom: '2px solid #e0e0e0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    logoIcon: {
      width: '45px',
      height: '45px',
      background: '#2E86C1',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    logoText: {
      display: 'flex',
      flexDirection: 'column',
    },
    logoTitle: {
      fontSize: '20px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      margin: 0,
    },
    logoSubtitle: {
      fontSize: '13px',
      color: '#7f8c8d',
      margin: 0,
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    userBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 15px',
      background: '#f8f9fa',
      borderRadius: '10px',
      border: '1px solid #e0e0e0',
    },
    userIcon: {
      width: '18px',
      height: '18px',
      color: '#2E86C1',
    },
    userName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#2c3e50',
    },
    roleBadge: {
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      background: isAdmin ? '#27AE60' : '#3498db',
      color: '#ffffff',
    },
    notificationButton: {
      position: 'relative',
      padding: '10px',
      border: 'none',
      borderRadius: '10px',
      background: '#f8f9fa',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      background: '#E74C3C',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '2px 6px',
      fontSize: '11px',
      fontWeight: '700',
      minWidth: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    button: {
      padding: '10px 18px',
      fontSize: '14px',
      fontWeight: '600',
      border: '2px solid #2E86C1',
      borderRadius: '10px',
      background: 'transparent',
      color: '#2E86C1',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontFamily: 'Roboto, sans-serif',
    },
    buttonPrimary: {
      background: '#2E86C1',
      color: '#ffffff',
    },
    buttonDanger: {
      borderColor: '#E74C3C',
      color: '#E74C3C',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
    },
    modalContent: {
      background: '#ffffff',
      borderRadius: '15px',
      padding: '30px',
      maxWidth: '400px',
      width: '90%',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    },
    modalTitle: {
      fontSize: '22px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      marginBottom: '15px',
      textAlign: 'center',
    },
    modalText: {
      fontSize: '15px',
      color: '#555',
      marginBottom: '25px',
      textAlign: 'center',
      lineHeight: '1.6',
    },
    modalButtons: {
      display: 'flex',
      gap: '12px',
    },
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>
              <svg style={{ width: '25px', height: '25px', color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div style={styles.logoText}>
              <h1 style={styles.logoTitle}>Система заявок</h1>
              <p style={styles.logoSubtitle}>IT-отдел колледжа</p>
            </div>
          </div>

          <nav style={styles.nav}>
            <div style={styles.userBadge}>
              <svg style={styles.userIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span style={styles.userName}>{user?.displayName}</span>
              <span style={styles.roleBadge}>
                {isAdmin ? 'ADMIN' : 'USER'}
              </span>
            </div>

            <button
              onClick={onToggleNotifications}
              style={styles.notificationButton}
              onMouseEnter={(e) => e.target.style.background = '#e8f4f8'}
              onMouseLeave={(e) => e.target.style.background = '#f8f9fa'}
              title="Уведомления"
            >
              <svg style={{ width: '20px', height: '20px', color: '#2E86C1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span style={styles.notificationBadge}>{unreadCount}</span>
              )}
            </button>

            <button
              onClick={toggleRole}
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.background = '#2E86C1';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#2E86C1';
              }}
            >
              Сменить роль
            </button>

            {currentPage !== 'dashboard' && (
              <button
                onClick={onNavigateDashboard}
                style={{...styles.button, ...styles.buttonPrimary}}
                onMouseEnter={(e) => e.target.style.background = '#1A5276'}
                onMouseLeave={(e) => e.target.style.background = '#2E86C1'}
              >
                Главная
              </button>
            )}

            {isAdmin && currentPage !== 'admin' && (
              <button
                onClick={onNavigateAdmin}
                style={styles.button}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2E86C1';
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#2E86C1';
                }}
              >
                Админ-панель
              </button>
            )}

            {currentPage !== 'statistics' && (
              <button
                onClick={onNavigateStatistics}
                style={styles.button}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2E86C1';
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#2E86C1';
                }}
              >
                Статистика
              </button>
            )}

            {currentPage !== 'documentation' && (
              <button
                onClick={onNavigateDocumentation}
                style={styles.button}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2E86C1';
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#2E86C1';
                }}
              >
                Документация
              </button>
            )}

            {currentPage !== 'securityLogs' && (
              <button
                onClick={onNavigateSecurityLogs}
                style={styles.button}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2E86C1';
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#2E86C1';
                }}
              >
                Логи безопасности
              </button>
            )}

            <button
              onClick={() => setShowLogoutConfirm(true)}
              style={{...styles.button, ...styles.buttonDanger}}
              onMouseEnter={(e) => {
                e.target.style.background = '#E74C3C';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#E74C3C';
              }}
            >
              Выход
            </button>
          </nav>
        </div>
      </header>

      {showLogoutConfirm && (
        <div style={styles.modal} onClick={() => setShowLogoutConfirm(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Выход из системы</h2>
            <p style={styles.modalText}>
              Вы уверены, что хотите выйти из системы?
            </p>
            <div style={styles.modalButtons}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{...styles.button, flex: 1}}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2E86C1';
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#2E86C1';
                }}
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowLogoutConfirm(false);
                }}
                style={{...styles.button, ...styles.buttonDanger, flex: 1}}
                onMouseEnter={(e) => {
                  e.target.style.background = '#E74C3C';
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#E74C3C';
                }}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}