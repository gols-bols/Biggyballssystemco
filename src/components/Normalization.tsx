import React from 'react';

export function Normalization() {
  return (
    <div>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2E86C1',
        marginBottom: '24px',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        Нормализация базы данных
      </h2>

      {/* First Normal Form */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '8px',
        border: '2px solid #27AE60',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#27AE60',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            background: '#27AE60',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>1</span>
          Первая нормальная форма (1NF)
        </h3>
        <p style={{ marginBottom: '12px', color: '#555', lineHeight: '1.6' }}>
          <strong>Требование:</strong> Каждый атрибут таблицы содержит только атомарные (неделимые) значения, 
          отсутствуют повторяющиеся группы.
        </p>
        <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '6px', border: '1px solid #86efac' }}>
          <p style={{ marginBottom: '8px', fontWeight: '600', color: '#333' }}>✅ Соответствие 1NF:</p>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', lineHeight: '1.8' }}>
            <li>Все атрибуты во всех таблицах содержат атомарные значения</li>
            <li>Каждая таблица имеет первичный ключ (PK)</li>
            <li>Отсутствуют повторяющиеся группы столбцов</li>
            <li>Каждая запись уникальна и идентифицируется первичным ключом</li>
          </ul>
        </div>
      </div>

      {/* Second Normal Form */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '8px',
        border: '2px solid #2E86C1',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#2E86C1',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            background: '#2E86C1',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>2</span>
          Вторая нормальная форма (2NF)
        </h3>
        <p style={{ marginBottom: '12px', color: '#555', lineHeight: '1.6' }}>
          <strong>Требование:</strong> Таблица находится в 1NF, и все неключевые атрибуты полностью зависят 
          от первичного ключа (отсутствует частичная зависимость).
        </p>
        <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '6px', border: '1px solid #93c5fd' }}>
          <p style={{ marginBottom: '8px', fontWeight: '600', color: '#333' }}>✅ Соответствие 2NF:</p>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', lineHeight: '1.8' }}>
            <li>Все таблицы имеют простые первичные ключи (не составные)</li>
            <li>Информация о категориях вынесена в отдельную таблицу <code>categories</code></li>
            <li>Информация о приоритетах вынесена в отдельную таблицу <code>priorities</code></li>
            <li>Информация о статусах вынесена в отдельную таблицу <code>statuses</code></li>
            <li>Все неключевые атрибуты зависят от всего первичного ключа</li>
          </ul>
        </div>
      </div>

      {/* Third Normal Form */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '8px',
        border: '2px solid #9B59B6',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#9B59B6',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            background: '#9B59B6',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>3</span>
          Третья нормальная форма (3NF)
        </h3>
        <p style={{ marginBottom: '12px', color: '#555', lineHeight: '1.6' }}>
          <strong>Требование:</strong> Таблица находится в 2NF, и отсутствуют транзитивные зависимости 
          (неключевые атрибуты не зависят от других неключевых атрибутов).
        </p>
        <div style={{ background: '#faf5ff', padding: '16px', borderRadius: '6px', border: '1px solid #d8b4fe' }}>
          <p style={{ marginBottom: '8px', fontWeight: '600', color: '#333' }}>✅ Соответствие 3NF:</p>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', lineHeight: '1.8' }}>
            <li>Атрибуты категории зависят только от category_id, а не от других атрибутов</li>
            <li>Атрибуты приоритета зависят только от priority_id</li>
            <li>Атрибуты статуса зависят только от status_id</li>
            <li>В таблице tickets все атрибуты зависят напрямую от ticket_id</li>
            <li>Отсутствуют транзитивные зависимости между неключевыми атрибутами</li>
          </ul>
        </div>
      </div>

      {/* Denormalization considerations */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '8px',
        border: '2px solid #E67E22'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#E67E22',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            background: '#E67E22',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>⚡</span>
          Оптимизация и денормализация
        </h3>
        <p style={{ marginBottom: '12px', color: '#555', lineHeight: '1.6' }}>
          База данных спроектирована в 3NF для обеспечения целостности данных. 
          Для повышения производительности рассмотрены следующие оптимизации:
        </p>
        <div style={{ background: '#fff7ed', padding: '16px', borderRadius: '6px', border: '1px solid #fed7aa' }}>
          <p style={{ marginBottom: '8px', fontWeight: '600', color: '#333' }}>🚀 Рекомендации по оптимизации:</p>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', lineHeight: '1.8' }}>
            <li><strong>Индексы:</strong> Созданы индексы на внешние ключи и часто используемые поля (email, created_at)</li>
            <li><strong>Кэширование:</strong> Таблицы справочников (categories, priorities, statuses) редко изменяются - подходят для кэширования</li>
            <li><strong>Партиционирование:</strong> В будущем можно разделить таблицу tickets по дате создания</li>
            <li><strong>Представления:</strong> Создание view для частых JOIN-запросов (tickets с полной информацией)</li>
            <li><strong>Полнотекстовый поиск:</strong> Индексы FULLTEXT для поиска по title и description в заявках</li>
          </ul>
        </div>
      </div>

      {/* Benefits */}
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginTop: '24px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
          📊 Преимущества нормализованной структуры:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontWeight: '600', color: '#27AE60', marginBottom: '4px' }}>✓ Целостность данных</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Исключение аномалий обновления и дублирования</div>
          </div>
          <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontWeight: '600', color: '#2E86C1', marginBottom: '4px' }}>✓ Гибкость изменений</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Легко добавлять новые категории и статусы</div>
          </div>
          <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontWeight: '600', color: '#9B59B6', marginBottom: '4px' }}>✓ Экономия места</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Минимизация избыточности хранения</div>
          </div>
          <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
            <div style={{ fontWeight: '600', color: '#E67E22', marginBottom: '4px' }}>✓ Простота поддержки</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Изменения в одном месте, а не во многих</div>
          </div>
        </div>
      </div>
    </div>
  );
}
