import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  displayName: string;
  role: 'admin' | 'user';
}

interface StoredUser {
  username: string;
  password: string;
  displayName: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  register: (username: string, email: string, displayName: string, password: string, confirmPassword: string) => { success: boolean; error?: string };
  logout: () => void;
  toggleRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Начальная база данных пользователей
const initialUsersDB: StoredUser[] = [
  {
    username: 'admin',
    password: 'admin123',
    displayName: 'Администратор',
    email: 'admin@college.ru',
    role: 'admin',
  },
  {
    username: 'user',
    password: 'user123',
    displayName: 'Пользователь',
    email: 'user@college.ru',
    role: 'user',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usersDB, setUsersDB] = useState<StoredUser[]>(initialUsersDB);

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
    const foundUser = usersDB.find(
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

  const register = (
    username: string,
    email: string,
    displayName: string,
    password: string,
    confirmPassword: string
  ): { success: boolean; error?: string } => {
    // Проверка на пустые поля
    if (!username || !email || !displayName || !password || !confirmPassword) {
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

    // Проверка длины логина (максимум)
    if (username.length > 20) {
      return {
        success: false,
        error: 'Логин должен содержать максимум 20 символов',
      };
    }

    // Проверка формата логина (только буквы, цифры и подчеркивание)
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return {
        success: false,
        error: 'Логин может содержать только латинские буквы, цифры и символ подчеркивания',
      };
    }

    // Проверка уникальности логина
    if (usersDB.find((u) => u.username === username)) {
      return {
        success: false,
        error: 'Пользователь с таким логином уже существует',
      };
    }

    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Некорректный формат email',
      };
    }

    // Проверка уникальности email
    if (usersDB.find((u) => u.email === email)) {
      return {
        success: false,
        error: 'Пользователь с таким email уже зарегистрирован',
      };
    }

    // Проверка длины имени
    if (displayName.length < 2) {
      return {
        success: false,
        error: 'Имя должно содержать минимум 2 символа',
      };
    }

    // Проверка длины пароля
    if (password.length < 6) {
      return {
        success: false,
        error: 'Пароль должен содержать минимум 6 символов',
      };
    }

    // Проверка сложности пароля
    if (!/(?=.*[a-z])(?=.*[0-9])/.test(password)) {
      return {
        success: false,
        error: 'Пароль должен содержать хотя бы одну букву и одну цифру',
      };
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      return {
        success: false,
        error: 'Пароли не совпадают',
      };
    }

    // Добавление нового пользователя в базу данных
    const newUser: StoredUser = {
      username,
      password,
      displayName,
      email,
      role: 'user', // Новые пользователи по умолчанию получают роль 'user'
    };

    setUsersDB([...usersDB, newUser]);

    // Автоматический вход после регистрации
    setUser({
      username: newUser.username,
      displayName: newUser.displayName,
      role: newUser.role,
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
        register,
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
