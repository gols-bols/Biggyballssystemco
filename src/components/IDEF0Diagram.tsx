import React from 'react';

export function IDEF0Diagram() {
  return (
    <div>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2E86C1',
        marginBottom: '24px',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        IDEF0 Диаграмма системы управления заявками
      </h2>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
          Контекстная диаграмма (A-0)
        </h3>
        <svg width="100%" height="400" viewBox="0 0 1200 400" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', background: 'white' }}>
          {/* Main Process Box */}
          <rect x="450" y="150" width="300" height="120" fill="#2E86C1" stroke="#1a5490" strokeWidth="2" />
          <text x="600" y="200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
            Управление заявками
          </text>
          <text x="600" y="225" textAnchor="middle" fill="white" fontSize="14">
            IT-отдела колледжа
          </text>
          <text x="740" y="280" textAnchor="start" fill="#2E86C1" fontSize="12" fontWeight="bold">A0</text>

          {/* Input - Left */}
          <line x1="100" y1="210" x2="450" y2="210" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="250" y="200" textAnchor="middle" fill="#333" fontSize="13">Заявки от пользователей</text>

          {/* Control - Top */}
          <line x1="600" y1="50" x2="600" y2="150" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="600" y="40" textAnchor="middle" fill="#333" fontSize="13">Регламенты и правила</text>

          {/* Output - Right */}
          <line x1="750" y1="210" x2="1100" y2="210" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="900" y="200" textAnchor="middle" fill="#333" fontSize="13">Обработанные заявки</text>

          {/* Mechanism - Bottom */}
          <line x1="600" y1="350" x2="600" y2="270" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="600" y="370" textAnchor="middle" fill="#333" fontSize="13">Пользователи и администраторы</text>

          {/* Arrow marker definition */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
            </marker>
          </defs>
        </svg>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
          Диаграмма декомпозиции (A0)
        </h3>
        <svg width="100%" height="700" viewBox="0 0 1400 700" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', background: 'white' }}>
          {/* Process 1: Регистрация и авторизация */}
          <rect x="150" y="50" width="250" height="100" fill="#27AE60" stroke="#1e8449" strokeWidth="2" />
          <text x="275" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            Регистрация и
          </text>
          <text x="275" y="110" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            авторизация
          </text>
          <text x="390" y="155" textAnchor="start" fill="#27AE60" fontSize="11" fontWeight="bold">A1</text>

          {/* Process 2: Создание заявки */}
          <rect x="150" y="220" width="250" height="100" fill="#2E86C1" stroke="#1a5490" strokeWidth="2" />
          <text x="275" y="260" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            Создание заявки
          </text>
          <text x="390" y="325" textAnchor="start" fill="#2E86C1" fontSize="11" fontWeight="bold">A2</text>

          {/* Process 3: Обработка заявки */}
          <rect x="150" y="390" width="250" height="100" fill="#E67E22" stroke="#c0621d" strokeWidth="2" />
          <text x="275" y="430" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            Обработка заявки
          </text>
          <text x="390" y="495" textAnchor="start" fill="#E67E22" fontSize="11" fontWeight="bold">A3</text>

          {/* Process 4: Мониторинг и статистика */}
          <rect x="150" y="560" width="250" height="100" fill="#9B59B6" stroke="#7d3c98" strokeWidth="2" />
          <text x="275" y="600" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            Мониторинг и
          </text>
          <text x="275" y="620" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            статистика
          </text>
          <text x="390" y="665" textAnchor="start" fill="#9B59B6" fontSize="11" fontWeight="bold">A4</text>

          {/* Data flows */}
          {/* Input to A1 */}
          <line x1="50" y1="100" x2="150" y2="100" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <text x="80" y="90" fill="#333" fontSize="11">Данные пользователя</text>

          {/* A1 to A2 */}
          <line x1="275" y1="150" x2="275" y2="220" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <text x="285" y="185" fill="#333" fontSize="11">Авторизованный пользователь</text>

          {/* A2 to A3 */}
          <line x1="275" y1="320" x2="275" y2="390" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <text x="285" y="355" fill="#333" fontSize="11">Новая заявка</text>

          {/* A3 to A4 */}
          <line x1="275" y1="490" x2="275" y2="560" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <text x="285" y="525" fill="#333" fontSize="11">Данные о заявках</text>

          {/* Control from top */}
          <line x1="700" y1="20" x2="700" y2="100" stroke="#666" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="700" y1="100" x2="400" y2="100" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrowhead3)" />
          <text x="710" y="60" fill="#666" fontSize="11">Права доступа</text>

          <line x1="700" y1="100" x2="700" y2="270" stroke="#666" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="700" y1="270" x2="400" y2="270" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrowhead3)" />
          <text x="710" y="230" fill="#666" fontSize="11">Категории и приоритеты</text>

          <line x1="700" y1="270" x2="700" y2="440" stroke="#666" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="700" y1="440" x2="400" y2="440" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrowhead3)" />
          <text x="710" y="400" fill="#666" fontSize="11">Статусы обработки</text>

          {/* Outputs to right */}
          <line x1="400" y1="100" x2="550" y2="100" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <text x="560" y="100" fill="#333" fontSize="11">Зарегистрированный пользователь</text>

          <line x1="400" y1="270" x2="550" y2="270" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <text x="560" y="270" fill="#333" fontSize="11">Созданная заявка</text>

          <line x1="400" y1="440" x2="550" y2="440" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <text x="560" y="440" fill="#333" fontSize="11">Обработанная заявка</text>

          <line x1="400" y1="610" x2="550" y2="610" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <text x="560" y="610" fill="#333" fontSize="11">Отчеты и аналитика</text>

          {/* Mechanism from bottom */}
          <line x1="1000" y1="680" x2="1000" y2="150" stroke="#999" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="1000" y1="150" x2="400" y2="150" stroke="#999" strokeWidth="1.5" markerEnd="url(#arrowhead4)" />
          <text x="850" y="670" fill="#999" fontSize="11">База данных</text>

          <line x1="1000" y1="320" x2="400" y2="320" stroke="#999" strokeWidth="1.5" markerEnd="url(#arrowhead4)" />
          
          <line x1="1000" y1="490" x2="400" y2="490" stroke="#999" strokeWidth="1.5" markerEnd="url(#arrowhead4)" />
          
          <line x1="1000" y1="660" x2="400" y2="660" stroke="#999" strokeWidth="1.5" markerEnd="url(#arrowhead4)" />

          {/* Arrow markers */}
          <defs>
            <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
            </marker>
            <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
            <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#999" />
            </marker>
          </defs>
        </svg>
      </div>

      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
          Описание процессов:
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#27AE60',
              fontWeight: 'bold'
            }}>A1:</span>
            <strong>Регистрация и авторизация</strong> - управление пользователями, вход в систему, проверка прав доступа
          </li>
          <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#2E86C1',
              fontWeight: 'bold'
            }}>A2:</span>
            <strong>Создание заявки</strong> - формирование новой заявки с указанием категории, приоритета и описания проблемы
          </li>
          <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#E67E22',
              fontWeight: 'bold'
            }}>A3:</span>
            <strong>Обработка заявки</strong> - назначение исполнителя, изменение статуса, добавление комментариев, закрытие заявки
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '24px', position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#9B59B6',
              fontWeight: 'bold'
            }}>A4:</span>
            <strong>Мониторинг и статистика</strong> - просмотр аналитики, генерация отчетов, отслеживание производительности
          </li>
        </ul>
      </div>
    </div>
  );
}
