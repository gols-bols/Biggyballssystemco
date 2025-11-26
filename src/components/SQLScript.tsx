import React, { useState } from 'react';
import { Copy, Check, Download } from './icons';

export function SQLScript() {
  const [copied, setCopied] = useState(false);

  const sqlScript = `-- ==================================================
-- База данных системы управления заявками IT-отдела
-- ==================================================
-- Создано: ${new Date().toLocaleDateString('ru-RU')}
-- Версия: 1.0
-- СУБД: MySQL 8.0+
-- ==================================================

-- Создание базы данных
CREATE DATABASE IF NOT EXISTS it_ticket_system
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE it_ticket_system;

-- ==================================================
-- Таблица: users (Пользователи)
-- ==================================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    role ENUM('user', 'admin', 'super_admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    department VARCHAR(100),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- Таблица: categories (Категории заявок)
-- ==================================================
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'folder',
    display_order INT DEFAULT 0,
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- Таблица: priorities (Приоритеты заявок)
-- ==================================================
CREATE TABLE priorities (
    priority_id INT AUTO_INCREMENT PRIMARY KEY,
    priority_name VARCHAR(50) NOT NULL UNIQUE,
    priority_level INT NOT NULL,
    color_code VARCHAR(7) NOT NULL,
    response_time_hours INT,
    INDEX idx_priority_level (priority_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- Таблица: statuses (Статусы заявок)
-- ==================================================
CREATE TABLE statuses (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    color_code VARCHAR(7) NOT NULL,
    description TEXT,
    is_final BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- Таблица: tickets (Заявки)
-- ==================================================
CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    priority_id INT NOT NULL,
    status_id INT NOT NULL DEFAULT 1,
    assigned_to INT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    deadline TIMESTAMP NULL,
    location VARCHAR(100),
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE RESTRICT,
    FOREIGN KEY (priority_id) REFERENCES priorities(priority_id) ON DELETE RESTRICT,
    FOREIGN KEY (status_id) REFERENCES statuses(status_id) ON DELETE RESTRICT,
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL,
    
    INDEX idx_user_id (user_id),
    INDEX idx_status_id (status_id),
    INDEX idx_created_at (created_at),
    INDEX idx_assigned_to (assigned_to),
    FULLTEXT INDEX idx_fulltext_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- Таблица: comments (Комментарии к заявкам)
-- ==================================================
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_internal BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
    INDEX idx_ticket_id (ticket_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- Таблица: attachments (Вложения к заявкам)
-- ==================================================
CREATE TABLE attachments (
    attachment_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    uploaded_by INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id) ON DELETE CASCADE,
    
    INDEX idx_ticket_id (ticket_id),
    INDEX idx_uploaded_by (uploaded_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- Таблица: notifications (Уведомления)
-- ==================================================
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ticket_id INT,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id) ON DELETE CASCADE,
    
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- Заполнение справочных таблиц
-- ==================================================

-- Категории заявок
INSERT INTO categories (category_name, description, icon, display_order) VALUES
('Оборудование', 'Проблемы с компьютерами, принтерами и другим оборудованием', 'monitor', 1),
('Доступы', 'Запросы на предоставление доступа к системам и ресурсам', 'key', 2),
('Программное обеспечение', 'Установка, обновление и настройка программного обеспечения', 'package', 3),
('Сеть', 'Проблемы с интернетом и локальной сетью', 'wifi', 4),
('Почта', 'Вопросы по корпоративной электронной почте', 'mail', 5),
('Прочее', 'Прочие запросы и вопросы', 'more-horizontal', 6);

-- Приоритеты заявок
INSERT INTO priorities (priority_name, priority_level, color_code, response_time_hours) VALUES
('Низкий', 1, '#27AE60', 48),
('Средний', 2, '#F39C12', 24),
('Высокий', 3, '#E74C3C', 4);

-- Статусы заявок
INSERT INTO statuses (status_name, color_code, description, is_final) VALUES
('Новая', '#3498DB', 'Заявка создана и ожидает рассмотрения', FALSE),
('В работе', '#F39C12', 'Заявка принята в работу', FALSE),
('Ожидание', '#9B59B6', 'Заявка ожидает дополнительной информации', FALSE),
('Завершена', '#27AE60', 'Заявка успешно выполнена', TRUE),
('Отклонена', '#E74C3C', 'Заявка отклонена', TRUE);

-- ==================================================
-- Примеры данных для тестирования
-- ==================================================

-- Добавление тестовых пользователей
INSERT INTO users (email, password_hash, full_name, phone, role, department) VALUES
('admin@college.ru', '$2a$10$dummyhash1', 'Администратор Системы', '+7 (900) 123-45-67', 'admin', 'IT-отдел'),
('ivanov@college.ru', '$2a$10$dummyhash2', 'Иванов Иван Иванович', '+7 (900) 234-56-78', 'user', 'Факультет информатики'),
('petrova@college.ru', '$2a$10$dummyhash3', 'Петрова Мария Сергеевна', '+7 (900) 345-67-89', 'user', 'Гуманитарный факультет'),
('sidorov@college.ru', '$2a$10$dummyhash4', 'Сидоров Петр Александрович', '+7 (900) 456-78-90', 'admin', 'IT-отдел');

-- Добавление тестовых заявок
INSERT INTO tickets (user_id, category_id, priority_id, status_id, assigned_to, title, description, location) VALUES
(2, 1, 3, 2, 1, 'Не работает принтер в аудитории 205', 'Принтер HP LaserJet не печатает документы. При отправке на печать документ висит в очереди.', 'Аудитория 205'),
(3, 2, 2, 1, NULL, 'Запрос доступа к корпоративной почте', 'Необходим доступ к корпоративной почте для нового сотрудника.', NULL),
(2, 3, 2, 2, 4, 'Установка Microsoft Office', 'Требуется установить пакет MS Office 2021 на новый компьютер.', 'Аудитория 310');

-- Добавление тестовых комментариев
INSERT INTO comments (ticket_id, user_id, comment_text, is_internal) VALUES
(1, 1, 'Проблема принята в работу. Выезжаю на место.', FALSE),
(1, 2, 'Спасибо! Буду ждать.', FALSE),
(1, 1, 'Заменен картридж, принтер работает.', FALSE);

-- Добавление уведомлений
INSERT INTO notifications (user_id, ticket_id, message) VALUES
(2, 1, 'Ваша заявка №1 принята в работу'),
(2, 1, 'Новый комментарий к заявке №1');

-- ==================================================
-- Представления (Views)
-- ==================================================

-- Полная информация о заявках
CREATE VIEW v_tickets_full AS
SELECT 
    t.ticket_id,
    t.title,
    t.description,
    t.location,
    t.created_at,
    t.updated_at,
    t.completed_at,
    t.deadline,
    u.full_name AS author_name,
    u.email AS author_email,
    u.department AS author_department,
    c.category_name,
    c.icon AS category_icon,
    p.priority_name,
    p.priority_level,
    p.color_code AS priority_color,
    s.status_name,
    s.color_code AS status_color,
    s.is_final AS status_is_final,
    admin.full_name AS assigned_to_name,
    admin.email AS assigned_to_email
FROM tickets t
INNER JOIN users u ON t.user_id = u.user_id
INNER JOIN categories c ON t.category_id = c.category_id
INNER JOIN priorities p ON t.priority_id = p.priority_id
INNER JOIN statuses s ON t.status_id = s.status_id
LEFT JOIN users admin ON t.assigned_to = admin.user_id;

-- Статистика по заявкам
CREATE VIEW v_ticket_statistics AS
SELECT 
    DATE(created_at) AS date,
    COUNT(*) AS total_tickets,
    SUM(CASE WHEN status_id = 1 THEN 1 ELSE 0 END) AS new_tickets,
    SUM(CASE WHEN status_id = 2 THEN 1 ELSE 0 END) AS in_progress_tickets,
    SUM(CASE WHEN status_id = 4 THEN 1 ELSE 0 END) AS completed_tickets,
    SUM(CASE WHEN status_id = 5 THEN 1 ELSE 0 END) AS rejected_tickets
FROM tickets
GROUP BY DATE(created_at);

-- ==================================================
-- Хранимые процедуры
-- ==================================================

DELIMITER //

-- Процедура для создания заявки с уведомлением
CREATE PROCEDURE sp_create_ticket(
    IN p_user_id INT,
    IN p_category_id INT,
    IN p_priority_id INT,
    IN p_title VARCHAR(200),
    IN p_description TEXT,
    IN p_location VARCHAR(100)
)
BEGIN
    DECLARE new_ticket_id INT;
    
    -- Создание заявки
    INSERT INTO tickets (user_id, category_id, priority_id, status_id, title, description, location)
    VALUES (p_user_id, p_category_id, p_priority_id, 1, p_title, p_description, p_location);
    
    SET new_ticket_id = LAST_INSERT_ID();
    
    -- Создание уведомления для пользователя
    INSERT INTO notifications (user_id, ticket_id, message)
    VALUES (p_user_id, new_ticket_id, CONCAT('Заявка №', new_ticket_id, ' успешно создана'));
    
    -- Создание уведомлений для всех администраторов
    INSERT INTO notifications (user_id, ticket_id, message)
    SELECT user_id, new_ticket_id, CONCAT('Новая заявка №', new_ticket_id, ': ', p_title)
    FROM users
    WHERE role IN ('admin', 'super_admin') AND is_active = TRUE;
    
    SELECT new_ticket_id AS ticket_id;
END //

-- Процедура для изменения статуса заявки
CREATE PROCEDURE sp_update_ticket_status(
    IN p_ticket_id INT,
    IN p_status_id INT,
    IN p_admin_id INT
)
BEGIN
    DECLARE v_user_id INT;
    DECLARE v_status_name VARCHAR(50);
    
    -- Получение данных
    SELECT user_id INTO v_user_id FROM tickets WHERE ticket_id = p_ticket_id;
    SELECT status_name INTO v_status_name FROM statuses WHERE status_id = p_status_id;
    
    -- Обновление статуса
    UPDATE tickets SET status_id = p_status_id WHERE ticket_id = p_ticket_id;
    
    -- Если статус финальный, установить дату завершения
    IF p_status_id IN (SELECT status_id FROM statuses WHERE is_final = TRUE) THEN
        UPDATE tickets SET completed_at = CURRENT_TIMESTAMP WHERE ticket_id = p_ticket_id;
    END IF;
    
    -- Уведомление пользователя
    INSERT INTO notifications (user_id, ticket_id, message)
    VALUES (v_user_id, p_ticket_id, CONCAT('Статус заявки №', p_ticket_id, ' изменен на "', v_status_name, '"'));
END //

DELIMITER ;

-- ==================================================
-- Триггеры
-- ==================================================

DELIMITER //

-- Триггер для автоматического расчета дедлайна
CREATE TRIGGER tr_tickets_before_insert
BEFORE INSERT ON tickets
FOR EACH ROW
BEGIN
    DECLARE response_hours INT;
    
    -- Получить время отклика для данного приоритета
    SELECT response_time_hours INTO response_hours
    FROM priorities
    WHERE priority_id = NEW.priority_id;
    
    -- Установить дедлайн
    IF response_hours IS NOT NULL THEN
        SET NEW.deadline = DATE_ADD(NOW(), INTERVAL response_hours HOUR);
    END IF;
END //

DELIMITER ;

-- ==================================================
-- Индексы для оптимизации производитеьности
-- ==================================================

-- Дополнительные индексы для часто используемых запросов
CREATE INDEX idx_tickets_status_created ON tickets(status_id, created_at DESC);
CREATE INDEX idx_tickets_user_status ON tickets(user_id, status_id);
CREATE INDEX idx_tickets_assigned_status ON tickets(assigned_to, status_id);
CREATE INDEX idx_comments_ticket_created ON comments(ticket_id, created_at DESC);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read, created_at DESC);

-- ==================================================
-- Права доступа (опционально)
-- ==================================================

-- Создание пользователя для приложения
-- CREATE USER 'ticket_app'@'localhost' IDENTIFIED BY 'secure_password_here';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON it_ticket_system.* TO 'ticket_app'@'localhost';
-- FLUSH PRIVILEGES;

-- ==================================================
-- Конец скрипта
-- ==================================================`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sqlScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка при копировании:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([sqlScript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'it_ticket_system.sql';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#2E86C1',
          margin: 0,
          fontFamily: 'Montserrat, sans-serif'
        }}>
          SQL Скрипт создания базы данных
        </h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: copied ? '#27AE60' : '#2E86C1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              if (!copied) e.currentTarget.style.background = '#1A5276';
            }}
            onMouseLeave={(e) => {
              if (!copied) e.currentTarget.style.background = '#2E86C1';
            }}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Скопировано!' : 'Копировать'}
          </button>
          <button
            onClick={handleDownload}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: '#27AE60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1E8449'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#27AE60'}
          >
            <Download size={18} />
            Скачать .sql
          </button>
        </div>
      </div>

      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
          📋 О скрипте:
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', lineHeight: '1.8' }}>
          <li>Создает базу данных <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>it_ticket_system</code></li>
          <li>Содержит 8 таблиц с полной структурой и связями</li>
          <li>Включает индексы для оптимизации производительности</li>
          <li>Содержит хранимые процедуры для основных операций</li>
          <li>Включает триггеры для автоматизации</li>
          <li>Создает представления (views) для удобных выборок</li>
          <li>Заполняет справочники тестовыми данными</li>
          <li>Совместим с MySQL 8.0+ и MariaDB 10.5+</li>
        </ul>
      </div>

      <div style={{
        background: '#2c3e50',
        borderRadius: '8px',
        padding: '20px',
        overflow: 'auto',
        maxHeight: '600px',
        position: 'relative'
      }}>
        <pre style={{
          margin: 0,
          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
          fontSize: '13px',
          lineHeight: '1.6',
          color: '#ecf0f1',
          whiteSpace: 'pre'
        }}>
          {sqlScript}
        </pre>
      </div>

      <div style={{
        background: '#fff3cd',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #ffc107',
        marginTop: '20px'
      }}>
        <h3 style={{
          fontSize: '15px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#856404',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ⚠️ Важные замечания:
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#856404', lineHeight: '1.7', fontSize: '14px' }}>
          <li>Перед запуском скрипта создайте резервную копию существующих данных</li>
          <li>Тестовые пароли в примерах НЕ являются настоящими хешами - замените их на реальные</li>
          <li>Настройте права доступа пользователя базы данных согласно вашим требованиям безопасности</li>
          <li>Проверьте настройки кодировки (utf8mb4) для корректной работы с русским языком</li>
          <li>Для production-среды рекомендуется настроить дополнительное резервное копирование</li>
        </ul>
      </div>
    </div>
  );
}