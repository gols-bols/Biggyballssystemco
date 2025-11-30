import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext(undefined);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [toastMessages, setToastMessages] = useState([]);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    toastEnabled: true,
    desktopEnabled: false,
  });

  // Загрузка уведомлений из localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        setNotifications(JSON.parse(stored));
      }

      const storedSettings = localStorage.getItem('notification_settings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error('Ошибка загрузки уведомлений:', error);
    }
  }, []);

  // Сохранение уведомлений в localStorage
  const saveNotifications = (newNotifications) => {
    try {
      localStorage.setItem('notifications', JSON.stringify(newNotifications));
      setNotifications(newNotifications);
    } catch (error) {
      console.error('Ошибка сохранения уведомлений:', error);
    }
  };

  // Сохранение настроек
  const saveSettings = (newSettings) => {
    try {
      localStorage.setItem('notification_settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error);
    }
  };

  // Воспроизведение звука
  const playSound = () => {
    if (!settings.soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error('Ошибка воспроизведения звука:', error);
    }
  };

  // Показать toast
  const showToast = (title, message, type) => {
    if (!settings.toastEnabled) return;

    const toastId = Date.now() + Math.random();
    const toast = { id: toastId, title, message, type };
    
    setToastMessages(prev => [...prev, toast]);
    
    // Автоматически удалить toast через 4 секунды
    setTimeout(() => {
      setToastMessages(prev => prev.filter(t => t.id !== toastId));
    }, 4000);
  };

  // Создание уведомления
  const createNotification = (type, title, message, data = {}) => {
    const notification = {
      id: Date.now() + Math.random(),
      type, // 'new_ticket', 'status_change', 'comment', 'priority_change', 'completed'
      title,
      message,
      data,
      timestamp: new Date().toISOString(),
      read: false,
    };

    const newNotifications = [notification, ...notifications];
    saveNotifications(newNotifications);

    // Toast-уведомление
    showToast(title, message, type);

    // Звук
    playSound();

    return notification;
  };

  // Пометить как прочитанное
  const markAsRead = (notificationId) => {
    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  // Пометить все как прочитанные
  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  // Удалить уведомление
  const deleteNotification = (notificationId) => {
    const updated = notifications.filter(n => n.id !== notificationId);
    saveNotifications(updated);
  };

  // Очистить все уведомления
  const clearAll = () => {
    saveNotifications([]);
  };

  // Очистить прочитанные
  const clearRead = () => {
    const updated = notifications.filter(n => !n.read);
    saveNotifications(updated);
  };

  // Получить количество непрочитанных
  const unreadCount = notifications.filter(n => !n.read).length;

  // Уведомления для конкретной заявки
  const getTicketNotifications = (ticketId) => {
    return notifications.filter(n => n.data.ticketId === ticketId);
  };

  // Специфичные методы для разных типов уведомлений
  const notifyNewTicket = (ticket, createdBy) => {
    return createNotification(
      'new_ticket',
      '🆕 Новая заявка',
      `${createdBy} создал(а) заявку: ${ticket.title}`,
      { ticketId: ticket.id, ticketNumber: ticket.number }
    );
  };

  const notifyStatusChange = (ticket, oldStatus, newStatus, changedBy) => {
    return createNotification(
      'status_change',
      '🔄 Изменение статуса',
      `Заявка #${ticket.number}: ${oldStatus} → ${newStatus}`,
      { ticketId: ticket.id, ticketNumber: ticket.number, oldStatus, newStatus }
    );
  };

  const notifyNewComment = (ticket, comment, commentBy) => {
    return createNotification(
      'comment',
      '💬 Новый комментарий',
      `${commentBy} оставил(а) комментарий в заявке #${ticket.number}`,
      { ticketId: ticket.id, ticketNumber: ticket.number, comment }
    );
  };

  const notifyPriorityChange = (ticket, oldPriority, newPriority) => {
    return createNotification(
      'priority_change',
      '⚡ Изменение приоритета',
      `Заявка #${ticket.number}: приоритет изменен с "${oldPriority}" на "${newPriority}"`,
      { ticketId: ticket.id, ticketNumber: ticket.number, oldPriority, newPriority }
    );
  };

  const notifyCompleted = (ticket) => {
    return createNotification(
      'completed',
      '✅ Заявка завершена',
      `Заявка #${ticket.number} была завершена`,
      { ticketId: ticket.id, ticketNumber: ticket.number }
    );
  };

  const notifyAssigned = (ticket, assignedTo) => {
    return createNotification(
      'assigned',
      '👤 Назначение заявки',
      `Вам назначена заявка #${ticket.number}: ${ticket.title}`,
      { ticketId: ticket.id, ticketNumber: ticket.number, assignedTo }
    );
  };

  const value = {
    notifications,
    unreadCount,
    settings,
    toastMessages,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    clearRead,
    getTicketNotifications,
    updateSettings: saveSettings,
    // Специфичные методы
    notifyNewTicket,
    notifyStatusChange,
    notifyNewComment,
    notifyPriorityChange,
    notifyCompleted,
    notifyAssigned,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}
