import { useState } from 'react';

export function Dashboard({ tickets, onViewTicket, onCreateTicket, isAdmin }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    title: {
      fontSize: '32px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      margin: 0,
    },
    createButton: {
      padding: '14px 28px',
      fontSize: '16px',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #27AE60 0%, #229954 100%)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
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
      marginBottom: '20px',
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
    ticketsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    ticketCard: {
      background: '#ffffff',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: '1px solid #e0e0e0',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    ticketHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px',
      gap: '15px',
      flexWrap: 'wrap',
    },
    ticketTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: 0,
      flex: 1,
      minWidth: '200px',
    },
    ticketMeta: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    },
    ticketDescription: {
      fontSize: '14px',
      color: '#555',
      marginBottom: '15px',
      lineHeight: '1.6',
    },
    ticketFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '15px',
      borderTop: '1px solid #f0f0f0',
      flexWrap: 'wrap',
      gap: '10px',
    },
    ticketInfo: {
      fontSize: '13px',
      color: '#7f8c8d',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      marginTop: '30px',
      padding: '20px',
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
    pageButtonActive: {
      background: '#2E86C1',
      color: '#ffffff',
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
      <div style={styles.header}>
        <h1 style={styles.title}>📋 Мои заявки</h1>
        <button
          onClick={onCreateTicket}
          style={styles.createButton}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'none';
            e.target.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.3)';
          }}
        >
          <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Создать заявку
        </button>
      </div>

      {/* Статистика */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#3498db'}}>{ stats.total}</p>
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
              placeholder="Поиск по ID, теме, описанию..."
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

      {/* Список заявок */}
      <div style={styles.ticketsList}>
        {paginatedTickets.length === 0 ? (
          <div style={styles.noResults}>
            <p>😔 Заявки не найдены</p>
            <p style={{ fontSize: '14px' }}>Попробуйте изменить фильтры</p>
          </div>
        ) : (
          paginatedTickets.map(ticket => (
            <div
              key={ticket.id}
              onClick={() => onViewTicket(ticket.id)}
              style={styles.ticketCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
              }}
            >
              <div style={styles.ticketHeader}>
                <h3 style={styles.ticketTitle}>
                  #{ticket.id} • {ticket.title}
                </h3>
                <div style={styles.ticketMeta}>
                  <span style={getStatusStyle(ticket.status)}>{ticket.status}</span>
                  <span style={getPriorityStyle(ticket.priority)}>{ticket.priority}</span>
                </div>
              </div>

              <p style={styles.ticketDescription}>
                {ticket.description.length > 150
                  ? ticket.description.substring(0, 150) + '...'
                  : ticket.description}
              </p>

              <div style={styles.ticketFooter}>
                <div style={styles.ticketInfo}>
                  <strong>Категория:</strong> {ticket.category}
                </div>
                <div style={styles.ticketInfo}>
                  <strong>Автор:</strong> {ticket.author}
                </div>
                <div style={styles.ticketInfo}>
                  <strong>Создана:</strong> {formatDate(ticket.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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
    </div>
  );
}