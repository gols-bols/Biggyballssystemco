import { useState } from 'react';

export function AdminPanel({ tickets, onBack, onUpdateTicket }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleUpdate = () => {
    if (!selectedTicket) return;

    const updates = {
      updatedAt: new Date().toISOString(),
    };

    if (newStatus) {
      updates.status = newStatus;
    }

    if (assignedTo) {
      updates.assignedTo = assignedTo;
    }

    onUpdateTicket(selectedTicket.id, updates);
    setSelectedTicket(null);
    setNewStatus('');
    setAssignedTo('');
  };

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

  const filteredTickets = tickets.filter(ticket => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      ticket.id.toString().includes(searchLower) ||
      ticket.title.toLowerCase().includes(searchLower) ||
      ticket.description.toLowerCase().includes(searchLower) ||
      ticket.category.toLowerCase().includes(searchLower) ||
      ticket.author.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'Новая').length,
    inProgress: tickets.filter(t => t.status === 'В работе').length,
    completed: tickets.filter(t => t.status === 'Завершена').length,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '30px 20px',
      fontFamily: 'Roboto, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '20px',
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
      fontSize: '32px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      margin: 0,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    statCard: {
      background: '#ffffff',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: '1px solid #e0e0e0',
    },
    statNumber: {
      fontSize: '36px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      margin: '0 0 8px 0',
    },
    statLabel: {
      fontSize: '14px',
      color: '#7f8c8d',
      margin: 0,
    },
    filtersSection: {
      background: '#ffffff',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      marginBottom: '25px',
      border: '1px solid #e0e0e0',
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
    },
    input: {
      padding: '12px 16px',
      fontSize: '14px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.3s',
      fontFamily: 'Roboto, sans-serif',
    },
    select: {
      padding: '12px 16px',
      fontSize: '14px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.3s',
      fontFamily: 'Roboto, sans-serif',
      background: '#ffffff',
      cursor: 'pointer',
    },
    tableWrapper: {
      background: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: '1px solid #e0e0e0',
      overflow: 'hidden',
    },
    table: {
      width: '100%',
      display: 'table',
    },
    tableHeader: {
      background: '#f8f9fa',
      borderBottom: '2px solid #e0e0e0',
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '100px 2fr 1fr 130px 130px 150px 120px',
      gap: '15px',
      padding: '18px 20px',
      alignItems: 'center',
      borderBottom: '1px solid #f0f0f0',
      transition: 'background 0.2s',
    },
    tableCell: {
      fontSize: '14px',
      color: '#2c3e50',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    tableHeaderCell: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#7f8c8d',
      textTransform: 'uppercase',
    },
    mobileCard: {
      background: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
    },
    mobileCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px',
      gap: '10px',
    },
    mobileCardId: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#2E86C1',
    },
    mobileCardTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '12px',
    },
    mobileCardRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
      fontSize: '14px',
    },
    mobileCardLabel: {
      color: '#7f8c8d',
      fontSize: '13px',
    },
    mobileCardValue: {
      color: '#2c3e50',
      fontWeight: '500',
    },
    actionButton: {
      padding: '8px 14px',
      fontSize: '13px',
      fontWeight: '600',
      background: '#2E86C1',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    mobileCardButton: {
      width: '100%',
      padding: '12px',
      fontSize: '14px',
      fontWeight: '600',
      background: '#2E86C1',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      marginTop: '15px',
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
      padding: '20px',
    },
    modalContent: {
      background: '#ffffff',
      borderRadius: '15px',
      padding: '30px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      maxHeight: '90vh',
      overflowY: 'auto',
    },
    modalTitle: {
      fontSize: '22px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      marginBottom: '20px',
    },
    modalButtons: {
      display: 'flex',
      gap: '12px',
      marginTop: '20px',
    },
    button: {
      flex: 1,
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '600',
      border: '2px solid #2E86C1',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      background: 'transparent',
      color: '#2E86C1',
    },
    buttonPrimary: {
      background: '#27AE60',
      color: '#ffffff',
      border: '2px solid #27AE60',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      marginTop: '30px',
      padding: '20px',
      flexWrap: 'wrap',
    },
    pageButton: {
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '600',
      background: '#ffffff',
      color: '#2E86C1',
      border: '2px solid #2E86C1',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    pageButtonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    noResults: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#7f8c8d',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @media (max-width: 1200px) {
          .admin-table-row {
            grid-template-columns: 80px 2fr 1fr 110px 110px 130px 100px !important;
            gap: 10px !important;
            padding: 15px 12px !important;
          }
          .admin-table-cell {
            font-size: 13px !important;
          }
        }

        @media (max-width: 900px) {
          .admin-desktop-table {
            display: none !important;
          }
          .admin-mobile-cards {
            display: block !important;
          }
        }

        @media (min-width: 901px) {
          .admin-desktop-table {
            display: block !important;
          }
          .admin-mobile-cards {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .admin-title {
            font-size: 24px !important;
          }
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        .admin-table-row:hover {
          background: #f8f9fa !important;
        }
      `}</style>

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
          <h1 style={styles.title}>⚙️ Админ-панель</h1>
        </div>
      </div>

      {/* Статистика */}
      <div style={styles.statsGrid} className="admin-stats-grid">
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#3498db'}}>{stats.total}</p>
          <p style={styles.statLabel}>Всего заявок</p>
        </div>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#1976D2'}}>{stats.new}</p>
          <p style={styles.statLabel}>Новые</p>
        </div>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#F57C00'}}>{stats.inProgress}</p>
          <p style={styles.statLabel}>В работе</p>
        </div>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#27AE60'}}>{stats.completed}</p>
          <p style={styles.statLabel}>Завершены</p>
        </div>
      </div>

      {/* Фильтры */}
      <div style={styles.filtersSection}>
        <div style={styles.filtersGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>🔍 Поиск</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              style={styles.input}
              placeholder="Поиск по ID, теме..."
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Статус</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              style={styles.select}
            >
              <option value="all">Все</option>
              <option value="Новая">Новая</option>
              <option value="В работе">В работе</option>
              <option value="Завершена">Завершена</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Приоритет</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              style={styles.select}
            >
              <option value="all">Все</option>
              <option value="Высокий">Высокий</option>
              <option value="Средний">Средний</option>
              <option value="Низкий">Низкий</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Категория</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              style={styles.select}
            >
              <option value="all">Все</option>
              <option value="Оборудование">Оборудование</option>
              <option value="Доступы">Доступы</option>
              <option value="Программное обеспечение">Программное обеспечение</option>
            </select>
          </div>
        </div>
      </div>

      {/* Таблица заявок */}
      {paginatedTickets.length === 0 ? (
        <div style={styles.noResults}>
          <p>😔 Заявки не найдены</p>
          <p style={{ fontSize: '14px' }}>Попробуйте изменить фильтры</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div style={styles.tableWrapper} className="admin-desktop-table">
            <div style={styles.table}>
              <div style={{...styles.tableRow, ...styles.tableHeader}}>
                <div style={styles.tableHeaderCell}>ID</div>
                <div style={styles.tableHeaderCell}>Тема</div>
                <div style={styles.tableHeaderCell}>Автор</div>
                <div style={styles.tableHeaderCell}>Статус</div>
                <div style={styles.tableHeaderCell}>Приоритет</div>
                <div style={styles.tableHeaderCell}>Категория</div>
                <div style={styles.tableHeaderCell}>Действия</div>
              </div>
              {paginatedTickets.map(ticket => (
                <div key={ticket.id} style={styles.tableRow} className="admin-table-row">
                  <div style={styles.tableCell} className="admin-table-cell">#{ticket.id}</div>
                  <div style={{...styles.tableCell, fontWeight: '500'}} className="admin-table-cell">{ticket.title}</div>
                  <div style={styles.tableCell} className="admin-table-cell">{ticket.author}</div>
                  <div>
                    <span style={getStatusStyle(ticket.status)}>{ticket.status}</span>
                  </div>
                  <div>
                    <span style={getPriorityStyle(ticket.priority)}>{ticket.priority}</span>
                  </div>
                  <div style={styles.tableCell} className="admin-table-cell">{ticket.category}</div>
                  <div>
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setNewStatus(ticket.status);
                        setAssignedTo(ticket.assignedTo || '');
                      }}
                      style={styles.actionButton}
                      onMouseEnter={(e) => e.target.style.background = '#1F618D'}
                      onMouseLeave={(e) => e.target.style.background = '#2E86C1'}
                    >
                      Изменить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="admin-mobile-cards">
            {paginatedTickets.map(ticket => (
              <div key={ticket.id} style={styles.mobileCard}>
                <div style={styles.mobileCardHeader}>
                  <div style={styles.mobileCardId}>#{ticket.id}</div>
                  <span style={getStatusStyle(ticket.status)}>{ticket.status}</span>
                </div>

                <div style={styles.mobileCardTitle}>{ticket.title}</div>

                <div style={styles.mobileCardRow}>
                  <span style={styles.mobileCardLabel}>👤 Автор:</span>
                  <span style={styles.mobileCardValue}>{ticket.author}</span>
                </div>

                <div style={styles.mobileCardRow}>
                  <span style={styles.mobileCardLabel}>⚡ Приоритет:</span>
                  <span style={getPriorityStyle(ticket.priority)}>{ticket.priority}</span>
                </div>

                <div style={styles.mobileCardRow}>
                  <span style={styles.mobileCardLabel}>📂 Категория:</span>
                  <span style={styles.mobileCardValue}>{ticket.category}</span>
                </div>

                {ticket.assignedTo && (
                  <div style={styles.mobileCardRow}>
                    <span style={styles.mobileCardLabel}>👨‍💼 Исполнитель:</span>
                    <span style={styles.mobileCardValue}>{ticket.assignedTo}</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setNewStatus(ticket.status);
                    setAssignedTo(ticket.assignedTo || '');
                  }}
                  style={styles.mobileCardButton}
                  onMouseEnter={(e) => e.target.style.background = '#1F618D'}
                  onMouseLeave={(e) => e.target.style.background = '#2E86C1'}
                >
                  ✏️ Редактировать заявку
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              ...styles.pageButton,
              ...(currentPage === 1 ? styles.pageButtonDisabled : {})
            }}
            onMouseEnter={(e) => currentPage !== 1 && (e.target.style.background = '#2E86C1', e.target.style.color = '#ffffff')}
            onMouseLeave={(e) => currentPage !== 1 && (e.target.style.background = '#ffffff', e.target.style.color = '#2E86C1')}
          >
            ← Назад
          </button>

          <span style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>
            Страница {currentPage} из {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            style={{
              ...styles.pageButton,
              ...(currentPage === totalPages ? styles.pageButtonDisabled : {})
            }}
            onMouseEnter={(e) => currentPage !== totalPages && (e.target.style.background = '#2E86C1', e.target.style.color = '#ffffff')}
            onMouseLeave={(e) => currentPage !== totalPages && (e.target.style.background = '#ffffff', e.target.style.color = '#2E86C1')}
          >
            Вперед →
          </button>
        </div>
      )}

      {/* Модальное окно редактирования */}
      {selectedTicket && (
        <div style={styles.modal} onClick={() => setSelectedTicket(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Редактирование заявки #{selectedTicket.id}</h2>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Статус</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
                onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
                style={styles.select}
              >
                <option value="Новая">Новая</option>
                <option value="В работе">В работе</option>
                <option value="Завершена">Завершена</option>
              </select>
            </div>

            <div style={{...styles.inputGroup, marginTop: '15px'}}>
              <label style={styles.label}>Исполнитель</label>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
                onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
                style={styles.input}
                placeholder="Введите имя исполнителя"
              />
            </div>

            <div style={styles.modalButtons}>
              <button
                onClick={() => setSelectedTicket(null)}
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
                Отмена
              </button>
              <button
                onClick={handleUpdate}
                style={{...styles.button, ...styles.buttonPrimary}}
                onMouseEnter={(e) => e.target.style.background = '#1e8449'}
                onMouseLeave={(e) => e.target.style.background = '#27AE60'}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}