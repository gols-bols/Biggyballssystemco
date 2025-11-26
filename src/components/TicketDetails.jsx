import { useState } from 'react';

export function TicketDetails({ ticket, onBack, onUpdate, isAdmin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(ticket.status);
  const [comment, setComment] = useState('');

  const getStatusStyle = (status) => {
    const base = {
      padding: '6px 14px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '600',
      display: 'inline-block',
    };
    switch (status) {
      case 'Новая':
        return { ...base, background: '#E3F2FD', color: '#1976D2' };
      case 'В работе':
        return { ...base, background: '#FFF9C4', color: '#F57C00' };
      case 'Завершена':
        return { ...base, background: '#C8E6C9', color: '#388E3C' };
      default:
        return { ...base, background: '#F5F5F5', color: '#666' };
    }
  };

  const getPriorityStyle = (priority) => {
    const base = {
      padding: '6px 14px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '600',
      display: 'inline-block',
    };
    switch (priority) {
      case 'Высокий':
        return { ...base, background: '#FFEBEE', color: '#C62828' };
      case 'Средний':
        return { ...base, background: '#FFF9C4', color: '#F57C00' };
      case 'Низкий':
        return { ...base, background: '#E8F5E9', color: '#388E3C' };
      default:
        return { ...base, background: '#F5F5F5', color: '#666' };
    }
  };

  const handleUpdateStatus = () => {
    const newHistory = [
      ...ticket.history,
      {
        timestamp: new Date().toISOString(),
        action: `Статус изменен на "${editedStatus}"`,
        user: 'Администратор',
      },
    ];

    onUpdate(ticket.id, {
      status: editedStatus,
      updatedAt: new Date().toISOString(),
      history: newHistory,
    });

    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (!comment.trim()) {
      alert('Комментарий не может быть пустым');
      return;
    }

    const newHistory = [
      ...ticket.history,
      {
        timestamp: new Date().toISOString(),
        action: `Добавлен комментарий: ${comment}`,
        user: 'Текущий пользователь',
      },
    ];

    onUpdate(ticket.id, {
      updatedAt: new Date().toISOString(),
      history: newHistory,
    });

    setComment('');
  };

  const handleCloseTicket = () => {
    const newHistory = [
      ...ticket.history,
      {
        timestamp: new Date().toISOString(),
        action: 'Заявка закрыта',
        user: 'Администратор',
      },
    ];

    onUpdate(ticket.id, {
      status: 'Завершена',
      updatedAt: new Date().toISOString(),
      history: newHistory,
    });
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Roboto, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      flexWrap: 'wrap',
      gap: '15px',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    backButton: {
      padding: '10px 18px',
      fontSize: '14px',
      fontWeight: '600',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      background: '#ffffff',
      color: '#555',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      margin: '0 0 5px 0',
    },
    subtitle: {
      fontSize: '14px',
      color: '#7f8c8d',
      margin: 0,
    },
    closeButton: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '600',
      background: '#27AE60',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 2px 8px rgba(39, 174, 96, 0.3)',
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 350px',
      gap: '20px',
    },
    leftColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    card: {
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '25px',
      border: '1px solid #e0e0e0',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    ticketTitle: {
      fontSize: '22px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0 0 12px 0',
    },
    badges: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginBottom: '20px',
    },
    categoryBadge: {
      padding: '6px 14px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '600',
      background: '#f0f0f0',
      color: '#555',
      display: 'inline-block',
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#7f8c8d',
      marginBottom: '10px',
    },
    description: {
      fontSize: '14px',
      color: '#555',
      lineHeight: '1.7',
      whiteSpace: 'pre-wrap',
    },
    textarea: {
      width: '100%',
      padding: '12px 14px',
      fontSize: '14px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      resize: 'vertical',
      fontFamily: 'Roboto, sans-serif',
      minHeight: '80px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '600',
      background: '#2E86C1',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '10px',
    },
    historyItem: {
      display: 'flex',
      gap: '12px',
      paddingBottom: '15px',
    },
    historyDot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '4px',
    },
    dot: {
      width: '8px',
      height: '8px',
      background: '#2E86C1',
      borderRadius: '50%',
    },
    line: {
      width: '2px',
      flex: 1,
      background: '#e0e0e0',
      marginTop: '6px',
    },
    historyText: {
      flex: 1,
    },
    historyAction: {
      fontSize: '14px',
      color: '#2c3e50',
      marginBottom: '4px',
    },
    historyMeta: {
      fontSize: '12px',
      color: '#7f8c8d',
    },
    infoRow: {
      marginBottom: '20px',
    },
    infoLabel: {
      fontSize: '12px',
      color: '#7f8c8d',
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    infoValue: {
      fontSize: '14px',
      color: '#2c3e50',
      fontWeight: '500',
    },
    divider: {
      height: '1px',
      background: '#e0e0e0',
      margin: '15px 0',
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '14px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      background: '#ffffff',
      cursor: 'pointer',
      fontFamily: 'Roboto, sans-serif',
      marginBottom: '12px',
      boxSizing: 'border-box',
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
    },
    saveButton: {
      flex: 1,
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '600',
      background: '#27AE60',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    cancelButton: {
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '600',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      background: '#ffffff',
      color: '#555',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button
            onClick={onBack}
            style={styles.backButton}
            onMouseEnter={(e) => {
              e.target.style.background = '#f5f5f5';
              e.target.style.borderColor = '#2E86C1';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.borderColor = '#e0e0e0';
            }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>
          <div>
            <h1 style={styles.title}>Заявка #{ticket.id}</h1>
            <p style={styles.subtitle}>Подробная информация</p>
          </div>
        </div>
        {isAdmin && ticket.status !== 'Завершена' && (
          <button
            onClick={handleCloseTicket}
            style={styles.closeButton}
            onMouseEnter={(e) => e.target.style.background = '#1e8449'}
            onMouseLeave={(e) => e.target.style.background = '#27AE60'}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Закрыть заявку
          </button>
        )}
      </div>

      <div style={styles.mainGrid}>
        {/* Левая колонка */}
        <div style={styles.leftColumn}>
          {/* Основная информация */}
          <div style={styles.card}>
            <h2 style={styles.ticketTitle}>{ticket.title}</h2>
            <div style={styles.badges}>
              <span style={getStatusStyle(ticket.status)}>{ticket.status}</span>
              <span style={getPriorityStyle(ticket.priority)}>{ticket.priority}</span>
              <span style={styles.categoryBadge}>{ticket.category}</span>
            </div>
            <div style={{ paddingTop: '15px', borderTop: '1px solid #f0f0f0' }}>
              <p style={styles.sectionTitle}>Описание</p>
              <p style={styles.description}>{ticket.description}</p>
            </div>
          </div>

          {/* Комментарии */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Комментарии
            </h3>
            <textarea
              placeholder="Введите комментарий..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              style={styles.textarea}
            />
            <button
              onClick={handleAddComment}
              style={styles.button}
              onMouseEnter={(e) => e.target.style.background = '#1F618D'}
              onMouseLeave={(e) => e.target.style.background = '#2E86C1'}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Добавить комментарий
            </button>
          </div>

          {/* История */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              История изменений
            </h3>
            <div>
              {ticket.history.map((entry, index) => (
                <div key={index} style={styles.historyItem}>
                  <div style={styles.historyDot}>
                    <div style={styles.dot}></div>
                    {index !== ticket.history.length - 1 && <div style={styles.line}></div>}
                  </div>
                  <div style={styles.historyText}>
                    <p style={styles.historyAction}>{entry.action}</p>
                    <p style={styles.historyMeta}>
                      {entry.user} • {new Date(entry.timestamp).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Информация */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Информация</h3>
            <div style={styles.infoRow}>
              <p style={styles.infoLabel}>
                <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Автор
              </p>
              <p style={styles.infoValue}>{ticket.author}</p>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.infoRow}>
              <p style={styles.infoLabel}>
                <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Исполнитель
              </p>
              <p style={styles.infoValue}>{ticket.assignedTo || 'Не назначен'}</p>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.infoRow}>
              <p style={styles.infoLabel}>
                <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Создана
              </p>
              <p style={styles.infoValue}>{new Date(ticket.createdAt).toLocaleString('ru-RU')}</p>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.infoRow}>
              <p style={styles.infoLabel}>
                <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Обновлена
              </p>
              <p style={styles.infoValue}>{new Date(ticket.updatedAt).toLocaleString('ru-RU')}</p>
            </div>
          </div>

          {/* Управление статусом */}
          {isAdmin && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Управление статусом</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  style={styles.button}
                  onMouseEnter={(e) => e.target.style.background = '#1F618D'}
                  onMouseLeave={(e) => e.target.style.background = '#2E86C1'}
                >
                  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Изменить статус
                </button>
              ) : (
                <div>
                  <label style={{ ...styles.sectionTitle, marginBottom: '8px', display: 'block' }}>
                    Новый статус
                  </label>
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
                    onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
                    style={styles.select}
                  >
                    <option value="Новая">Новая</option>
                    <option value="В работе">В работе</option>
                    <option value="Завершена">Завершена</option>
                  </select>
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={handleUpdateStatus}
                      style={styles.saveButton}
                      onMouseEnter={(e) => e.target.style.background = '#1e8449'}
                      onMouseLeave={(e) => e.target.style.background = '#27AE60'}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Сохранить
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      style={styles.cancelButton}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#f5f5f5';
                        e.target.style.borderColor = '#E74C3C';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#ffffff';
                        e.target.style.borderColor = '#e0e0e0';
                      }}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
