// ============================================
// УТИЛИТЫ БЕЗОПАСНОСТИ
// ============================================

// 1. ЗАЩИТА ОТ XSS - Санитизация HTML
export const escapeHtml = (text) => {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Компонент для безопасного отображения текста
export const SafeText = ({ children }) => {
  if (!children) return null;
  return <span dangerouslySetInnerHTML={{ __html: escapeHtml(String(children)) }} />;
};

// 2. ХЕШИРОВАНИЕ ПАРОЛЕЙ (SHA-256)
export const hashPassword = async (password) => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'SALT_KEY_2025'); // Добавляем соль
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error('Ошибка хеширования:', error);
    // Fallback для старых браузеров
    return btoa(password + 'SALT_KEY_2025');
  }
};

// 3. ВАЛИДАЦИЯ ВВОДА
export const validators = {
  // Проверка email
  email: (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return 'Email обязателен';
    if (!emailRegex.test(value)) return 'Неверный формат email';
    if (value.length > 100) return 'Email слишком длинный';
    return null;
  },

  // Проверка имени пользователя
  username: (value) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!value) return 'Логин обязателен';
    if (value.length < 3) return 'Логин должен содержать минимум 3 символа';
    if (value.length > 20) return 'Логин должен содержать максимум 20 символов';
    if (!usernameRegex.test(value)) return 'Логин может содержать только буквы, цифры и _';
    return null;
  },

  // Проверка пароля (усиленная)
  password: (value) => {
    if (!value) return 'Пароль обязателен';
    if (value.length < 8) return 'Пароль должен содержать минимум 8 символов';
    if (value.length > 50) return 'Пароль слишком длинный';
    if (!/[A-Z]/.test(value)) return 'Пароль должен содержать хотя бы одну заглавную букву';
    if (!/[a-z]/.test(value)) return 'Пароль должен содержать хотя бы одну строчную букву';
    if (!/[0-9]/.test(value)) return 'Пароль должен содержать хотя бы одну цифру';
    return null;
  },

  // Проверка отображаемого имени
  displayName: (value) => {
    if (!value) return 'Имя обязательно';
    if (value.length < 2) return 'Имя должно содержать минимум 2 символа';
    if (value.length > 50) return 'Имя слишком длинное';
    // Разрешаем буквы, пробелы, дефисы
    if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value)) return 'Имя может содержать только буквы, пробелы и дефисы';
    return null;
  },

  // Проверка заголовка заявки
  ticketTitle: (value) => {
    if (!value || !value.trim()) return 'Название обязательно';
    if (value.length < 5) return 'Название должно содержать минимум 5 символов';
    if (value.length > 200) return 'Название слишком длинное (максимум 200 символов)';
    return null;
  },

  // Проверка описания заявки
  ticketDescription: (value) => {
    if (!value || !value.trim()) return 'Описание обязательно';
    if (value.length < 10) return 'Описание должно содержать минимум 10 символов';
    if (value.length > 2000) return 'Описание слишком длинное (максимум 2000 символов)';
    return null;
  },

  // Проверка комментария
  comment: (value) => {
    if (!value || !value.trim()) return 'Комментарий не может быть пустым';
    if (value.length > 1000) return 'Комментарий слишком длинный (максимум 1000 символов)';
    return null;
  }
};

// 4. RATE LIMITING - Ограничение попыток входа
class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) { // 5 попыток за 15 минут
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  // Проверка, можно ли выполнить действие
  canAttempt(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Удаляем старые попытки
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      const oldestAttempt = recentAttempts[0];
      const timeLeft = Math.ceil((this.windowMs - (now - oldestAttempt)) / 1000 / 60);
      return {
        allowed: false,
        remainingTime: timeLeft
      };
    }
    
    return { allowed: true };
  }

  // Регистрация попытки
  recordAttempt(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    userAttempts.push(now);
    this.attempts.set(identifier, userAttempts);
    
    // Сохраняем в localStorage для персистентности
    try {
      localStorage.setItem('rate_limit_' + identifier, JSON.stringify(userAttempts));
    } catch (e) {
      console.error('Ошибка сохранения rate limit:', e);
    }
  }

  // Сброс попыток (после успешного входа)
  reset(identifier) {
    this.attempts.delete(identifier);
    try {
      localStorage.removeItem('rate_limit_' + identifier);
    } catch (e) {
      console.error('Ошибка сброса rate limit:', e);
    }
  }

  // Восстановление из localStorage
  restore(identifier) {
    try {
      const stored = localStorage.getItem('rate_limit_' + identifier);
      if (stored) {
        const attempts = JSON.parse(stored);
        this.attempts.set(identifier, attempts);
      }
    } catch (e) {
      console.error('Ошибка восстановления rate limit:', e);
    }
  }
}

export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 попыток за 15 минут

// 5. SESSION TIMEOUT - Автоматический выход
export class SessionManager {
  constructor(timeoutMs = 30 * 60 * 1000) { // 30 минут по умолчанию
    this.timeoutMs = timeoutMs;
    this.timeoutId = null;
    this.lastActivityKey = 'last_activity';
  }

  // Запуск отслеживания сессии
  start(onTimeout) {
    this.updateActivity();
    this.startTimeout(onTimeout);
    
    // Отслеживаем активность пользователя
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, () => this.updateActivity());
    });
  }

  // Обновление времени последней активности
  updateActivity() {
    const now = Date.now();
    try {
      localStorage.setItem(this.lastActivityKey, now.toString());
    } catch (e) {
      console.error('Ошибка обновления активности:', e);
    }
  }

  // Запуск таймера
  startTimeout(onTimeout) {
    this.clearTimeout();
    
    this.timeoutId = setInterval(() => {
      const lastActivity = parseInt(localStorage.getItem(this.lastActivityKey) || '0');
      const now = Date.now();
      
      if (now - lastActivity > this.timeoutMs) {
        this.clearTimeout();
        onTimeout();
      }
    }, 60000); // Проверяем каждую минуту
  }

  // Остановка таймера
  clearTimeout() {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
      this.timeoutId = null;
    }
  }

  // Очистка при выходе
  cleanup() {
    this.clearTimeout();
    try {
      localStorage.removeItem(this.lastActivityKey);
    } catch (e) {
      console.error('Ошибка очистки сессии:', e);
    }
  }
}

// 6. ЛОГИРОВАНИЕ БЕЗОПАСНОСТИ
export class SecurityLogger {
  constructor() {
    this.logKey = 'security_logs';
    this.maxLogs = 100;
  }

  // Добавление записи в лог
  log(event, details = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    try {
      const logs = this.getLogs();
      logs.unshift(logEntry);
      
      // Ограничиваем количество записей
      if (logs.length > this.maxLogs) {
        logs.splice(this.maxLogs);
      }
      
      localStorage.setItem(this.logKey, JSON.stringify(logs));
    } catch (e) {
      console.error('Ошибка логирования:', e);
    }

    // Также выводим в консоль для разработки
    console.log(`[SECURITY] ${event}`, details);
  }

  // Получение всех логов
  getLogs() {
    try {
      const stored = localStorage.getItem(this.logKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Ошибка чтения логов:', e);
      return [];
    }
  }

  // Очистка логов
  clearLogs() {
    try {
      localStorage.removeItem(this.logKey);
    } catch (e) {
      console.error('Ошибка очистки логов:', e);
    }
  }

  // Получение подозрительной активности
  getSuspiciousActivity() {
    const logs = this.getLogs();
    return logs.filter(log => 
      log.event === 'login_failed' || 
      log.event === 'rate_limit_exceeded' ||
      log.event === 'validation_error'
    );
  }
}

export const securityLogger = new SecurityLogger();

// 7. ОЧИСТКА ДАННЫХ ПРИ ЗАКРЫТИИ
export const setupSecurityCleanup = () => {
  // Очистка чувствительных данных при закрытии вкладки
  window.addEventListener('beforeunload', () => {
    // Можно добавить дополнительную очистку при необходимости
    sessionStorage.clear();
  });
};

// 8. ПРОВЕРКА БЕЗОПАСНОСТИ БРАУЗЕРА
export const checkBrowserSecurity = () => {
  const warnings = [];

  // Проверка поддержки crypto API
  if (!window.crypto || !window.crypto.subtle) {
    warnings.push('Ваш браузер не поддерживает современные методы шифрования');
  }

  // Проверка localStorage
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
  } catch (e) {
    warnings.push('LocalStorage недоступен. Некоторые функции могут не работать');
  }

  // Проверка HTTPS (в production)
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    warnings.push('Соединение не защищено (HTTP). Рекомендуется использовать HTTPS');
  }

  return warnings;
};

// 9. ГЕНЕРАЦИЯ СЛУЧАЙНОГО ТОКЕНА (для CSRF в будущем)
export const generateToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// 10. ЗАЩИТА ОТ АВТОЗАПОЛНЕНИЯ ПАРОЛЕЙ (опционально)
export const disableAutocomplete = () => {
  return {
    autoComplete: 'new-password', // Трюк для отключения автозаполнения
    'data-lpignore': 'true' // Для LastPass
  };
};
