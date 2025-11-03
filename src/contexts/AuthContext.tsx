import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  displayName: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  toggleRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// База данных пользователей
const USERS_DB = [
  {
    username: 'admin',
    password: 'admin123',
    displayName: 'Администратор',
    role: 'admin' as const,
  },
  {
    username: 'user',
    password: 'user123',
    displayName: 'Пользователь',
    role: 'user' as const,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): { success: boolean; error?: string } => {
    // Проверка на пустые поля
    if (!username || !password) {
      return {
        success: false,
        error: 'Пожалуйста, заполните все поля',
      };
    }

    // Проверка длины логина
    if (username.length < 3) {
      return {
        success: false,
        error: 'Логин должен содержать минимум 3 символа',
      };
    }

    // Проверка длины пароля
    if (password.length < 6) {
      return {
        success: false,
        error: 'Пароль должен содержать минимум 6 символов',
      };
    }

    // Поиск пользователя в базе данных
    const foundUser = USERS_DB.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        error: 'Неверный логин или пароль',
      };
    }

    // Успешная авторизация
    setUser({
      username: foundUser.username,
      displayName: foundUser.displayName,
      role: foundUser.role,
    });

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRole = () => {
    if (user) {
      const newRole = user.role === 'admin' ? 'user' : 'admin';
      setUser({
        ...user,
        role: newRole,
        displayName: newRole === 'admin' ? 'Администратор' : 'Пользователь',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        toggleRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
