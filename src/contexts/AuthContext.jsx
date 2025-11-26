import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Тестовые пользователи
const testUsers = [
  {
    username: 'admin',
    password: 'admin123',
    displayName: 'Администратор',
    role: 'admin',
    email: 'admin@college.ru',
  },
  {
    username: 'user',
    password: 'user123',
    displayName: 'Иванов Иван',
    role: 'user',
    email: 'ivanov@college.ru',
  },
  {
    username: 'petrov',
    password: 'petrov123',
    displayName: 'Петров Петр',
    role: 'user',
    email: 'petrov@college.ru',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка пользователя из localStorage при монтировании
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('current_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователя:', error);
      localStorage.removeItem('current_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (username, password) => {
    // Проверяем тестовых пользователей
    const foundUser = testUsers.find(
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
      
      return { success: true };
    }

    // Проверяем зарегистрированных пользователей
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const registeredUser = registeredUsers.find(
      u => u.username === username && u.password === password
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
      
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Неверный логин или пароль' 
    };
  };

  const register = (username, password, displayName, email) => {
    // Проверяем, что пользователь не существует
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const userExists = testUsers.some(u => u.username === username) || 
                      registeredUsers.some(u => u.username === username);

    if (userExists) {
      return { 
        success: false, 
        error: 'Пользователь с таким логином уже существует' 
      };
    }

    // Создаем нового пользователя
    const newUser = {
      username,
      password,
      displayName,
      email,
      role: 'user',
    };

    registeredUsers.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('current_user');
  };

  const toggleRole = () => {
    if (user) {
      const newRole = user.role === 'admin' ? 'user' : 'admin';
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
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