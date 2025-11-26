import React from 'react';

export function ERDiagram() {
  return (
    <div>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2E86C1',
        marginBottom: '24px',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        ER-Диаграмма базы данных
      </h2>

      <div style={{ marginBottom: '24px', overflowX: 'auto' }}>
        <svg width="100%" height="900" viewBox="0 0 1400 900" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fafafa' }}>
          {/* Users Table */}
          <g>
            <rect x="50" y="50" width="280" height="300" fill="white" stroke="#2E86C1" strokeWidth="2" rx="4" />
            <rect x="50" y="50" width="280" height="40" fill="#2E86C1" />
            <text x="190" y="75" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Пользователи (users)</text>
            
            <text x="60" y="110" fill="#333" fontSize="13" fontWeight="bold">🔑 user_id (PK)</text>
            <text x="60" y="135" fill="#333" fontSize="13">📧 email</text>
            <text x="60" y="160" fill="#333" fontSize="13">🔒 password_hash</text>
            <text x="60" y="185" fill="#333" fontSize="13">👤 full_name</text>
            <text x="60" y="210" fill="#333" fontSize="13">📱 phone</text>
            <text x="60" y="235" fill="#333" fontSize="13">🎭 role</text>
            <text x="60" y="260" fill="#333" fontSize="13">📅 created_at</text>
            <text x="60" y="285" fill="#333" fontSize="13">🔄 updated_at</text>
            <text x="60" y="310" fill="#333" fontSize="13">✅ is_active</text>
            <text x="60" y="335" fill="#333" fontSize="13">🏢 department</text>
          </g>

          {/* Tickets Table */}
          <g>
            <rect x="450" y="50" width="300" height="380" fill="white" stroke="#27AE60" strokeWidth="2" rx="4" />
            <rect x="450" y="50" width="300" height="40" fill="#27AE60" />
            <text x="600" y="75" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Заявки (tickets)</text>
            
            <text x="460" y="110" fill="#333" fontSize="13" fontWeight="bold">🔑 ticket_id (PK)</text>
            <text x="460" y="135" fill="#333" fontSize="13">🔗 user_id (FK)</text>
            <text x="460" y="160" fill="#333" fontSize="13">🔗 category_id (FK)</text>
            <text x="460" y="185" fill="#333" fontSize="13">🔗 priority_id (FK)</text>
            <text x="460" y="210" fill="#333" fontSize="13">🔗 status_id (FK)</text>
            <text x="460" y="235" fill="#333" fontSize="13">🔗 assigned_to (FK)</text>
            <text x="460" y="260" fill="#333" fontSize="13">📝 title</text>
            <text x="460" y="285" fill="#333" fontSize="13">📄 description</text>
            <text x="460" y="310" fill="#333" fontSize="13">📅 created_at</text>
            <text x="460" y="335" fill="#333" fontSize="13">🔄 updated_at</text>
            <text x="460" y="360" fill="#333" fontSize="13">✅ completed_at</text>
            <text x="460" y="385" fill="#333" fontSize="13">⏱️ deadline</text>
            <text x="460" y="410" fill="#333" fontSize="13">📍 location</text>
          </g>

          {/* Categories Table */}
          <g>
            <rect x="900" y="50" width="280" height="180" fill="white" stroke="#E67E22" strokeWidth="2" rx="4" />
            <rect x="900" y="50" width="280" height="40" fill="#E67E22" />
            <text x="1040" y="75" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Категории (categories)</text>
            
            <text x="910" y="110" fill="#333" fontSize="13" fontWeight="bold">🔑 category_id (PK)</text>
            <text x="910" y="135" fill="#333" fontSize="13">📛 category_name</text>
            <text x="910" y="160" fill="#333" fontSize="13">📝 description</text>
            <text x="910" y="185" fill="#333" fontSize="13">🎨 icon</text>
            <text x="910" y="210" fill="#333" fontSize="13">🔢 display_order</text>
          </g>

          {/* Priorities Table */}
          <g>
            <rect x="900" y="260" width="280" height="180" fill="white" stroke="#9B59B6" strokeWidth="2" rx="4" />
            <rect x="900" y="260" width="280" height="40" fill="#9B59B6" />
            <text x="1040" y="285" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Приоритеты (priorities)</text>
            
            <text x="910" y="320" fill="#333" fontSize="13" fontWeight="bold">🔑 priority_id (PK)</text>
            <text x="910" y="345" fill="#333" fontSize="13">📛 priority_name</text>
            <text x="910" y="370" fill="#333" fontSize="13">🔢 priority_level</text>
            <text x="910" y="395" fill="#333" fontSize="13">🎨 color_code</text>
            <text x="910" y="420" fill="#333" fontSize="13">⏱️ response_time_hours</text>
          </g>

          {/* Statuses Table */}
          <g>
            <rect x="900" y="470" width="280" height="180" fill="white" stroke="#E74C3C" strokeWidth="2" rx="4" />
            <rect x="900" y="470" width="280" height="40" fill="#E74C3C" />
            <text x="1040" y="495" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Статусы (statuses)</text>
            
            <text x="910" y="530" fill="#333" fontSize="13" fontWeight="bold">🔑 status_id (PK)</text>
            <text x="910" y="555" fill="#333" fontSize="13">📛 status_name</text>
            <text x="910" y="580" fill="#333" fontSize="13">🎨 color_code</text>
            <text x="910" y="605" fill="#333" fontSize="13">📝 description</text>
            <text x="910" y="630" fill="#333" fontSize="13">✅ is_final</text>
          </g>

          {/* Comments Table */}
          <g>
            <rect x="50" y="450" width="280" height="220" fill="white" stroke="#3498DB" strokeWidth="2" rx="4" />
            <rect x="50" y="450" width="280" height="40" fill="#3498DB" />
            <text x="190" y="475" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Комментарии (comments)</text>
            
            <text x="60" y="510" fill="#333" fontSize="13" fontWeight="bold">🔑 comment_id (PK)</text>
            <text x="60" y="535" fill="#333" fontSize="13">🔗 ticket_id (FK)</text>
            <text x="60" y="560" fill="#333" fontSize="13">🔗 user_id (FK)</text>
            <text x="60" y="585" fill="#333" fontSize="13">💬 comment_text</text>
            <text x="60" y="610" fill="#333" fontSize="13">📅 created_at</text>
            <text x="60" y="635" fill="#333" fontSize="13">🔄 updated_at</text>
            <text x="60" y="660" fill="#333" fontSize="13">👁️ is_internal</text>
          </g>

          {/* Attachments Table */}
          <g>
            <rect x="450" y="520" width="300" height="220" fill="white" stroke="#16A085" strokeWidth="2" rx="4" />
            <rect x="450" y="520" width="300" height="40" fill="#16A085" />
            <text x="600" y="545" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Вложения (attachments)</text>
            
            <text x="460" y="580" fill="#333" fontSize="13" fontWeight="bold">🔑 attachment_id (PK)</text>
            <text x="460" y="605" fill="#333" fontSize="13">🔗 ticket_id (FK)</text>
            <text x="460" y="630" fill="#333" fontSize="13">🔗 uploaded_by (FK)</text>
            <text x="460" y="655" fill="#333" fontSize="13">📁 file_name</text>
            <text x="460" y="680" fill="#333" fontSize="13">📊 file_size</text>
            <text x="460" y="705" fill="#333" fontSize="13">🎭 file_type</text>
            <text x="460" y="730" fill="#333" fontSize="13">📅 uploaded_at</text>
          </g>

          {/* Notification Table */}
          <g>
            <rect x="50" y="720" width="280" height="160" fill="white" stroke="#F39C12" strokeWidth="2" rx="4" />
            <rect x="50" y="720" width="280" height="40" fill="#F39C12" />
            <text x="190" y="745" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Уведомления (notifications)</text>
            
            <text x="60" y="780" fill="#333" fontSize="13" fontWeight="bold">🔑 notification_id (PK)</text>
            <text x="60" y="805" fill="#333" fontSize="13">🔗 user_id (FK)</text>
            <text x="60" y="830" fill="#333" fontSize="13">💬 message</text>
            <text x="60" y="855" fill="#333" fontSize="13">📅 created_at</text>
            <text x="60" y="880" fill="#333" fontSize="13">✅ is_read</text>
          </g>

          {/* Relationships */}
          {/* User to Tickets (creator) */}
          <line x1="330" y1="200" x2="450" y2="135" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="360" y="160" fill="#666" fontSize="11">создает</text>
          <text x="360" y="175" fill="#666" fontSize="10">1:N</text>

          {/* User to Tickets (assigned) */}
          <line x1="330" y1="240" x2="450" y2="235" stroke="#666" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
          <text x="360" y="230" fill="#666" fontSize="11">назначен</text>
          <text x="360" y="245" fill="#666" fontSize="10">1:N</text>

          {/* Tickets to Categories */}
          <line x1="750" y1="160" x2="900" y2="135" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="800" y="140" fill="#666" fontSize="11">имеет</text>
          <text x="800" y="155" fill="#666" fontSize="10">N:1</text>

          {/* Tickets to Priorities */}
          <line x1="750" y1="185" x2="900" y2="345" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="800" y="260" fill="#666" fontSize="11">имеет</text>
          <text x="800" y="275" fill="#666" fontSize="10">N:1</text>

          {/* Tickets to Statuses */}
          <line x1="750" y1="210" x2="900" y2="555" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="800" y="380" fill="#666" fontSize="11">имеет</text>
          <text x="800" y="395" fill="#666" fontSize="10">N:1</text>

          {/* Tickets to Comments */}
          <line x1="450" y1="335" x2="330" y2="535" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="370" y="420" fill="#666" fontSize="11">содержит</text>
          <text x="370" y="435" fill="#666" fontSize="10">1:N</text>

          {/* User to Comments */}
          <line x1="190" y1="350" x2="190" y2="450" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="200" y="400" fill="#666" fontSize="11">пишет</text>
          <text x="200" y="415" fill="#666" fontSize="10">1:N</text>

          {/* Tickets to Attachments */}
          <line x1="600" y1="430" x2="600" y2="520" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="610" y="475" fill="#666" fontSize="11">имеет</text>
          <text x="610" y="490" fill="#666" fontSize="10">1:N</text>

          {/* User to Attachments */}
          <line x1="330" y1="300" x2="460" y2="630" stroke="#666" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
          <text x="370" y="500" fill="#666" fontSize="11">загружает</text>
          <text x="370" y="515" fill="#666" fontSize="10">1:N</text>

          {/* User to Notifications */}
          <line x1="190" y1="350" x2="190" y2="720" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="200" y="540" fill="#666" fontSize="11">получает</text>
          <text x="200" y="555" fill="#666" fontSize="10">1:N</text>

          {/* Arrow marker */}
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#666" />
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
          Связи между таблицами:
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '1.8' }}>
          <li>• <strong>Пользователи → Заявки</strong>: один пользователь может создать множество заявок (1:N)</li>
          <li>• <strong>Пользователи → Заявки (назначение)</strong>: один администратор может быть назначен на множество заявок (1:N)</li>
          <li>• <strong>Категории → Заявки</strong>: одна категория может относиться к множеству заявок (1:N)</li>
          <li>• <strong>Приоритеты → Заявки</strong>: один приоритет может быть у множества заявок (1:N)</li>
          <li>• <strong>Статусы → Заявки</strong>: один статус может быть у множества заявок (1:N)</li>
          <li>• <strong>Заявки → Комментарии</strong>: одна заявка может иметь множество комментариев (1:N)</li>
          <li>• <strong>Пользователи → Комментарии</strong>: один пользователь может написать множество комментариев (1:N)</li>
          <li>• <strong>Заявки → Вложения</strong>: одна заявка может иметь множество вложений (1:N)</li>
          <li>• <strong>Пользователи → Вложения</strong>: один пользователь может загрузить множество вложений (1:N)</li>
          <li>• <strong>Пользователи → Уведомления</strong>: один пользователь может получить множество уведомлений (1:N)</li>
        </ul>
      </div>
    </div>
  );
}
