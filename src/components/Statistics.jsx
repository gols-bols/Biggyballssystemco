import { useMemo } from 'react';

export function Statistics({ tickets, onBack }) {
  const statistics = useMemo(() => {
    const totalTickets = tickets.length;
    const newTickets = tickets.filter(t => t.status === 'Новая').length;
    const inProgressTickets = tickets.filter(t => t.status === 'В работе').length;
    const completedTickets = tickets.filter(t => t.status === 'Завершена').length;

    const completionRate = totalTickets > 0 
      ? Math.round((completedTickets / totalTickets) * 100) 
      : 0;

    const completedWithTime = tickets.filter(t => t.status === 'Завершена' && t.updatedAt);
    const avgProcessingTime = completedWithTime.length > 0
      ? Math.round(
          completedWithTime.reduce((acc, ticket) => {
            const created = new Date(ticket.createdAt).getTime();
            const updated = new Date(ticket.updatedAt).getTime();
            const daysDiff = (updated - created) / (1000 * 60 * 60 * 24);
            return acc + daysDiff;
          }, 0) / completedWithTime.length
        )
      : 0;

    const categoryStats = tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {});

    const priorityStats = tickets.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
      return acc;
    }, {});

    const statusData = [
      { name: 'Новая', value: newTickets, color: '#2E86C1' },
      { name: 'В работе', value: inProgressTickets, color: '#F39C12' },
      { name: 'Завершена', value: completedTickets, color: '#27AE60' },
    ];

    const categoryData = Object.entries(categoryStats).map(([name, value]) => ({
      name,
      value,
      percent: totalTickets > 0 ? Math.round((value / totalTickets) * 100) : 0,
    }));

    const priorityData = Object.entries(priorityStats).map(([name, value], index) => {
      const colors = { 'Высокий': '#E74C3C', 'Средний': '#F39C12', 'Низкий': '#27AE60' };
      return {
        name,
        value,
        percent: totalTickets > 0 ? Math.round((value / totalTickets) * 100) : 0,
        color: colors[name] || '#95a5a6',
      };
    });

    return {
      totalTickets,
      newTickets,
      inProgressTickets,
      completedTickets,
      completionRate,
      avgProcessingTime,
      statusData,
      categoryData,
      priorityData,
    };
  }, [tickets]);

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '30px 20px',
      fontFamily: 'Roboto, sans-serif',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '30px',
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
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '25px',
      marginBottom: '30px',
    },
    chartCard: {
      background: '#ffffff',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: '1px solid #e0e0e0',
    },
    chartTitle: {
      fontSize: '18px',
      fontWeight: '600',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      marginBottom: '25px',
    },
    pieChart: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      flexWrap: 'wrap',
    },
    pieContainer: {
      position: 'relative',
      width: '200px',
      height: '200px',
    },
    pieLegend: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    legendColor: {
      width: '20px',
      height: '20px',
      borderRadius: '4px',
    },
    legendText: {
      fontSize: '14px',
      color: '#2c3e50',
      fontWeight: '500',
    },
    legendValue: {
      fontSize: '14px',
      color: '#7f8c8d',
      marginLeft: 'auto',
    },
    barChart: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    barItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    barLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#2c3e50',
      minWidth: '150px',
    },
    barTrack: {
      flex: 1,
      height: '30px',
      background: '#f0f0f0',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative',
    },
    barFill: {
      height: '100%',
      transition: 'width 0.5s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600',
      color: '#ffffff',
    },
    barValue: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
      minWidth: '40px',
      textAlign: 'right',
    },
  };

  // Создаём SVG пай-чарт
  const renderPieChart = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return null;

    let currentAngle = 0;
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    const segments = data.map(item => {
      const percent = item.value / total;
      const startAngle = currentAngle;
      const endAngle = currentAngle + (percent * 360);
      currentAngle = endAngle;

      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;

      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);

      const largeArc = percent > 0.5 ? 1 : 0;

      return {
        d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        color: item.color,
        percent: Math.round(percent * 100),
      };
    });

    return (
      <svg width="200" height="200" viewBox="0 0 200 200">
        {segments.map((segment, index) => (
          <path
            key={index}
            d={segment.d}
            fill={segment.color}
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}
      </svg>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
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
        <h1 style={styles.title}>📊 Статистика</h1>
      </div>

      {/* Общая статистика */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#3498db'}}>{statistics.totalTickets}</p>
          <p style={styles.statLabel}>Всего заявок</p>
        </div>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#2E86C1'}}>{statistics.newTickets}</p>
          <p style={styles.statLabel}>Новые</p>
        </div>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#F39C12'}}>{statistics.inProgressTickets}</p>
          <p style={styles.statLabel}>В работе</p>
        </div>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#27AE60'}}>{statistics.completedTickets}</p>
          <p style={styles.statLabel}>Завершены</p>
        </div>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#8E44AD'}}>{statistics.completionRate}%</p>
          <p style={styles.statLabel}>Процент завершения</p>
        </div>
        <div style={styles.statCard}>
          <p style={{...styles.statNumber, color: '#E74C3C'}}>{statistics.avgProcessingTime}</p>
          <p style={styles.statLabel}>Среднее время (дней)</p>
        </div>
      </div>

      {/* Графики */}
      <div style={styles.chartsGrid}>
        {/* График по статусам */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Распределение по статусам</h3>
          <div style={styles.pieChart}>
            <div style={styles.pieContainer}>
              {renderPieChart(statistics.statusData)}
            </div>
            <div style={styles.pieLegend}>
              {statistics.statusData.map((item, index) => (
                <div key={index} style={styles.legendItem}>
                  <div style={{...styles.legendColor, background: item.color}} />
                  <span style={styles.legendText}>{item.name}</span>
                  <span style={styles.legendValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* График по категориям */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Заявки по категориям</h3>
          <div style={styles.barChart}>
            {statistics.categoryData.map((item, index) => (
              <div key={index} style={styles.barItem}>
                <div style={styles.barLabel}>{item.name}</div>
                <div style={styles.barTrack}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${item.percent}%`,
                      background: '#2E86C1',
                    }}
                  >
                    {item.percent > 10 && `${item.percent}%`}
                  </div>
                </div>
                <div style={styles.barValue}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* График по приоритетам */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Заявки по приоритетам</h3>
          <div style={styles.barChart}>
            {statistics.priorityData.map((item, index) => (
              <div key={index} style={styles.barItem}>
                <div style={styles.barLabel}>{item.name}</div>
                <div style={styles.barTrack}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${item.percent}%`,
                      background: item.color,
                    }}
                  >
                    {item.percent > 10 && `${item.percent}%`}
                  </div>
                </div>
                <div style={styles.barValue}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
