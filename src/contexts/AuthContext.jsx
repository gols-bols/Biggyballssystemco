import { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword, loginRateLimiter, SessionManager, securityLogger } from '../utils/security';

const AuthContext = createContext(undefined);

// ВРЕМЕННОЕ РЕШЕНИЕ: Тестовые пользователи с открытыми паролями для отладки
// После получения хешей - заменим на хешированные версии
const testUsersTemp = [
  {
    username: 'admin',
    password: 'admin123', // Временно открытый пароль
    displayName: 'Администратор',
    role: 'admin',
    email: 'admin@college.ru',
  },
  {
    username: 'user',
    password: 'user123', // Временно открытый пароль
    displayName: 'Иванов Иван',
    role: 'user',
    email: 'ivanov@college.ru',
  },
  {
    username: 'petrov',
    password: 'petrov123', // Временно открытый пароль
    displayName: 'Петров Петр',
    role: 'user',
    email: 'petrov@college.ru',
  },
];

// Функция для инициализации хешей при первом запуске
const initTestUsersHashes = async () => {
  console.log('🔐 Генерация хешей тестовых паролей...');
  console.log('');
  
  for (const user of testUsersTemp) {
    const hash = await hashPassword(user.password);
    console.log(`${user.username} / ${user.password}`);
    console.log(`Hash: ${hash}`);
    console.log('');
  }
  
  console.log('✅ Скопируйте хеши выше и обновите testUsers в AuthContext.jsx');
};

// Раскомментируйте для генерации хешей:
// initTestUsersHashes();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionManager] = useState(() => new SessionManager(30 * 60 * 1000)); // 30 минут

  // Загрузка пользователя из localStorage при монтировании
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('current_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
        
        // Запускаем session manager
        sessionManager.start(() => {
          securityLogger.log('session_timeout', { username: userData.username });
          logout();
          alert('Ваша сессия истекла. Пожалуйста, войдите снова.');
        });
        
        securityLogger.log('session_restored', { username: userData.username });
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователя:', error);
      localStorage.removeItem('current_user');
      securityLogger.log('session_restore_error', { error: error.message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    // Проверка rate limiting
    loginRateLimiter.restore(username);
    const rateLimitCheck = loginRateLimiter.canAttempt(username);
    
    if (!rateLimitCheck.allowed) {
      const error = `Слишком много попыток входа. Попробуйте через ${rateLimitCheck.remainingTime} минут`;
      securityLogger.log('rate_limit_exceeded', { username, remainingTime: rateLimitCheck.remainingTime });
      return { success: false, error };
    }

    try {
      // Хешируем введенный пароль
      const passwordHash = await hashPassword(password);
      
      // Проверяем тестовых пользователей
      const foundUser = testUsersTemp.find(
        u => u.username === username && u.password === password
      );

      if (foundUser) {
        const userData = {
          username: foundUser.username,
          displayName: foundUser.displayName,
          role: foundUser.role,
          email: foundUser.email,
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('current_user', JSON.stringify(userData));
        
        // Сброс rate limit после успешного входа
        loginRateLimiter.reset(username);
        
        // Запуск session manager
        sessionManager.start(() => {
          securityLogger.log('session_timeout', { username: userData.username });
          logout();
          alert('Ваша сессия истекла. Пожалуйста, войдите снова.');
        });
        
        securityLogger.log('login_success', { username, role: foundUser.role });
        return { success: true };
      }

      // Проверяем зарегистрированных пользователей
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const registeredUser = registeredUsers.find(
        u => u.username === username && u.passwordHash === passwordHash
      );

      if (registeredUser) {
        const userData = {
          username: registeredUser.username,
          displayName: registeredUser.displayName,
          role: registeredUser.role || 'user',
          email: registeredUser.email,
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('current_user', JSON.stringify(userData));
        
        loginRateLimiter.reset(username);
        
        sessionManager.start(() => {
          securityLogger.log('session_timeout', { username: userData.username });
          logout();
          alert('Ваша сессия истекла. Пожалуйста, войдите снова.');
        });
        
        securityLogger.log('login_success', { username, role: userData.role });
        return { success: true };
      }

      // Неудачная попытка входа
      loginRateLimiter.recordAttempt(username);
      securityLogger.log('login_failed', { username, reason: 'invalid_credentials' });
      
      return { 
        success: false, 
        error: 'Неверный логин или пароль' 
      };
    } catch (error) {
      console.error('Ошибка входа:', error);
      securityLogger.log('login_error', { username, error: error.message });
      return {
        success: false,
        error: 'Ошибка при входе. Попробуйте позже.'
      };
    }
  };

  const register = async (username, password, displayName, email) => {
    try {
      // Проверяем, что пользователь не существует
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const userExists = testUsersTemp.some(u => u.username === username) || 
                        registeredUsers.some(u => u.username === username);

      if (userExists) {
        securityLogger.log('registration_failed', { username, reason: 'user_exists' });
        return { 
          success: false, 
          error: 'Пользователь с таким логином уже существует' 
        };
      }

      // Хешируем пароль
      const passwordHash = await hashPassword(password);

      // Создаем нового пользователя
      const newUser = {
        username,
        passwordHash, // Сохраняем хеш вместо пароля
        displayName,
        email,
        role: 'user',
        createdAt: new Date().toISOString()
      };

      registeredUsers.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));

      securityLogger.log('registration_success', { username, email });
      return { success: true };
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      securityLogger.log('registration_error', { username, error: error.message });
      return {
        success: false,
        error: 'Ошибка при регистрации. Попробуйте позже.'
      };
    }
  };

  const logout = () => {
    const username = user?.username;
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('current_user');
    sessionManager.cleanup();
    
    if (username) {
      securityLogger.log('logout', { username });
    }
  };

  const toggleRole = () => {
    if (user) {
      const newRole = user.role === 'admin' ? 'user' : 'admin';
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
      securityLogger.log('role_changed', { username: user.username, oldRole: user.role, newRole });
    }
  };

  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    register,
    toggleRole,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}