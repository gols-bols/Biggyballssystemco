import React from 'react';
import { Database } from 'lucide-react';

export function TablesDescription() {
  const tables = [
    {
      name: 'users',
      title: 'Пользователи',
      color: '#2E86C1',
      description: 'Хранит информацию о всех пользователях системы (студентах, преподавателях, администраторах)',
      fields: [
        { name: 'user_id', type: 'INT', pk: true, description: 'Уникальный идентификатор пользователя' },
        { name: 'email', type: 'VARCHAR(100)', unique: true, description: 'Email для входа в систему' },
        { name: 'password_hash', type: 'VARCHAR(255)', description: 'Хеш пароля (bcrypt)' },
        { name: 'full_name', type: 'VARCHAR(150)', description: 'ФИО пользователя' },
        { name: 'phone', type: 'VARCHAR(20)', description: 'Контактный телефон' },
        { name: 'role', type: 'ENUM', description: 'Роль: user, admin, super_admin' },
        { name: 'created_at', type: 'TIMESTAMP', description: 'Дата и время регистрации' },
        { name: 'updated_at', type: 'TIMESTAMP', description: 'Дата и время последнего обновления' },
        { name: 'is_active', type: 'BOOLEAN', description: 'Активен ли аккаунт (по умолчанию TRUE)' },
        { name: 'department', type: 'VARCHAR(100)', description: 'Отделение/факультет' },
      ]
    },
    {
      name: 'tickets',
      title: 'Заявки',
      color: '#27AE60',
      description: 'Основная таблица для хранения всех заявок пользователей',
      fields: [
        { name: 'ticket_id', type: 'INT', pk: true, description: 'Уникальный идентификатор заявки' },
        { name: 'user_id', type: 'INT', fk: 'users(user_id)', description: 'ID пользователя, создавшего заявку' },
        { name: 'category_id', type: 'INT', fk: 'categories(category_id)', description: 'ID категории заявки' },
        { name: 'priority_id', type: 'INT', fk: 'priorities(priority_id)', description: 'ID приоритета заявки' },
        { name: 'status_id', type: 'INT', fk: 'statuses(status_id)', description: 'ID текущего статуса' },
        { name: 'assigned_to', type: 'INT', fk: 'users(user_id)', description: 'ID администратора, назначенного на заявку' },
        { name: 'title', type: 'VARCHAR(200)', description: 'Краткое название заявки' },
        { name: 'description', type: 'TEXT', description: 'Подробное описание проблемы' },
        { name: 'created_at', type: 'TIMESTAMP', description: 'Дата и время создания заявки' },
        { name: 'updated_at', type: 'TIMESTAMP', description: 'Дата и время последнего обновления' },
        { name: 'completed_at', type: 'TIMESTAMP', description: 'Дата и время завершения заявки' },
        { name: 'deadline', type: 'TIMESTAMP', description: 'Крайний срок выполнения' },
        { name: 'location', type: 'VARCHAR(100)', description: 'Местоположение (аудитория, кабинет)' },
      ]
    },
    {
      name: 'categories',
      title: 'Категории',
      color: '#E67E22',
      description: 'Справочник категорий заявок (Оборудование, Доступы, Программное обеспечение и т.д.)',
      fields: [
        { name: 'category_id', type: 'INT', pk: true, description: 'Уникальный идентификатор категории' },
        { name: 'category_name', type: 'VARCHAR(100)', description: 'Название категории' },
        { name: 'description', type: 'TEXT', description: 'Описание категории' },
        { name: 'icon', type: 'VARCHAR(50)', description: 'Название иконки Font Awesome' },
        { name: 'display_order', type: 'INT', description: 'Порядок отображения в списке' },
      ]
    },
    {
      name: 'priorities',
      title: 'Приоритеты',
      color: '#9B59B6',
      description: 'Справочник приоритетов заявок (Низкий, Средний, Высокий)',
      fields: [
        { name: 'priority_id', type: 'INT', pk: true, description: 'Уникальный идентификатор приоритета' },
        { name: 'priority_name', type: 'VARCHAR(50)', description: 'Название приоритета' },
        { name: 'priority_level', type: 'INT', description: 'Числовой уровень (1-3)' },
        { name: 'color_code', type: 'VARCHAR(7)', description: 'Цвет в формате HEX (#RRGGBB)' },
        { name: 'response_time_hours', type: 'INT', description: 'Ожидаемое время отклика в часах' },
      ]
    },
    {
      name: 'statuses',
      title: 'Статусы',
      color: '#E74C3C',
      description: 'Справочник статусов заявок (Новая, В работе, Завершена и т.д.)',
      fields: [
        { name: 'status_id', type: 'INT', pk: true, description: 'Уникальный идентификатор статуса' },
        { name: 'status_name', type: 'VARCHAR(50)', description: 'Название статуса' },
        { name: 'color_code', type: 'VARCHAR(7)', description: 'Цвет в формате HEX (#RRGGBB)' },
        { name: 'description', type: 'TEXT', description: 'Описание статуса' },
        { name: 'is_final', type: 'BOOLEAN', description: 'Является ли статус финальным' },
      ]
    },
    {
      name: 'comments',
      title: 'Комментарии',
      color: '#3498DB',
      description: 'Комментарии к заявкам от пользователей и администраторов',
      fields: [
        { name: 'comment_id', type: 'INT', pk: true, description: 'Уникальный идентификатор комментария' },
        { name: 'ticket_id', type: 'INT', fk: 'tickets(ticket_id)', description: 'ID заявки' },
        { name: 'user_id', type: 'INT', fk: 'users(user_id)', description: 'ID автора комментария' },
        { name: 'comment_text', type: 'TEXT', description: 'Текст комментария' },
        { name: 'created_at', type: 'TIMESTAMP', description: 'Дата и время создания' },
        { name: 'updated_at', type: 'TIMESTAMP', description: 'Дата и время последнего изменения' },
        { name: 'is_internal', type: 'BOOLEAN', description: 'Внутренний комментарий (видимый только админам)' },
      ]
    },
    {
      name: 'attachments',
      title: 'Вложения',
      color: '#16A085',
      description: 'Файлы, прикрепленные к заявкам (скриншоты, документы и т.д.)',
      fields: [
        { name: 'attachment_id', type: 'INT', pk: true, description: 'Уникальный идентификатор вложения' },
        { name: 'ticket_id', type: 'INT', fk: 'tickets(ticket_id)', description: 'ID заявки' },
        { name: 'uploaded_by', type: 'INT', fk: 'users(user_id)', description: 'ID пользователя, загрузившего файл' },
        { name: 'file_name', type: 'VARCHAR(255)', description: 'Имя файла' },
        { name: 'file_size', type: 'INT', description: 'Размер файла в байтах' },
        { name: 'file_type', type: 'VARCHAR(50)', description: 'MIME-тип файла' },
        { name: 'uploaded_at', type: 'TIMESTAMP', description: 'Дата и время загрузки' },
      ]
    },
    {
      name: 'notifications',
      title: 'Уведомления',
      color: '#F39C12',
      description: 'Уведомления для пользователей о событиях в системе',
      fields: [
        { name: 'notification_id', type: 'INT', pk: true, description: 'Уникальный идентификатор уведомления' },
        { name: 'user_id', type: 'INT', fk: 'users(user_id)', description: 'ID получателя уведомления' },
        { name: 'message', type: 'TEXT', description: 'Текст уведомления' },
        { name: 'created_at', type: 'TIMESTAMP', description: 'Дата и время создания' },
        { name: 'is_read', type: 'BOOLEAN', description: 'Прочитано ли уведомление' },
      ]
    },
  ];

  return (
    <div>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2E86C1',
        marginBottom: '24px',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        Описание таблиц базы данных
      </h2>

      {tables.map((table, index) => (
        <div
          key={table.name}
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: `2px solid ${table.color}`,
            marginBottom: '24px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: table.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Database size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: table.color,
                margin: 0
              }}>
                {table.title} ({table.name})
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#666',
                margin: 0,
                marginTop: '4px'
              }}>
                {table.description}
              </p>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px'
            }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #e0e0e0',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Поле
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #e0e0e0',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Тип данных
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #e0e0e0',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Ключ
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #e0e0e0',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Описание
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.fields.map((field, fieldIndex) => (
                  <tr
                    key={field.name}
                    style={{
                      background: fieldIndex % 2 === 0 ? 'white' : '#fafafa'
                    }}
                  >
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #f0f0f0',
                      fontFamily: 'monospace',
                      color: '#333',
                      fontWeight: field.pk ? '600' : '400'
                    }}>
                      {field.name}
                    </td>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #f0f0f0',
                      fontFamily: 'monospace',
                      color: '#666',
                      fontSize: '12px'
                    }}>
                      {field.type}
                    </td>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      {field.pk && (
                        <span style={{
                          background: '#27AE60',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          PK
                        </span>
                      )}
                      {field.fk && (
                        <span style={{
                          background: '#2E86C1',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          FK
                        </span>
                      )}
                      {field.unique && (
                        <span style={{
                          background: '#9B59B6',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600',
                          marginLeft: '4px'
                        }}>
                          UNIQUE
                        </span>
                      )}
                    </td>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #f0f0f0',
                      color: '#555',
                      lineHeight: '1.4'
                    }}>
                      {field.description}
                      {field.fk && (
                        <div style={{
                          fontSize: '11px',
                          color: '#2E86C1',
                          marginTop: '4px',
                          fontFamily: 'monospace'
                        }}>
                          → {field.fk}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
          📝 Примечания:
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', lineHeight: '1.8' }}>
          <li><strong>PK (Primary Key)</strong> - Первичный ключ, уникальный идентификатор записи</li>
          <li><strong>FK (Foreign Key)</strong> - Внешний ключ, ссылка на запись в другой таблице</li>
          <li><strong>UNIQUE</strong> - Уникальное значение (не может повторяться)</li>
          <li><strong>TIMESTAMP</strong> - Автоматически обновляется при изменении записи</li>
          <li><strong>ENUM</strong> - Список предопределенных значений</li>
        </ul>
      </div>
    </div>
  );
}
