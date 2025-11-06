import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onSwitchToRegister: () => void;
}

export function LoginPage({ onSwitchToRegister }: LoginPageProps) {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Если пользователь уже авторизован, показываем сообщение
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2E86C1] to-[#1F618D] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl mb-2">Вы уже ав��оризованы</h2>
              <p className="text-gray-500 mb-4">Вы не можете войти повторно</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Имитация задержки для реалистичности
    setTimeout(() => {
      const result = login(username, password);
      
      if (!result.success && result.error) {
        setError(result.error);
      }
      
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E86C1] to-[#1F618D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#2E86C1] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-2xl mb-2">Система управления заявками</h1>
            <p className="text-gray-500">IT-отдел колледжа</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Сообщение об ошибке */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm mb-2 text-gray-700">
                Логин
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(''); // Очищаем ошибку при вводе
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#2E86C1]'
                  }`}
                  placeholder="Введите логин"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(''); // Очищаем ошибку при вводе
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#2E86C1]'
                  }`}
                  placeholder="Введите пароль"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#2E86C1] hover:bg-[#1F618D] text-white'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </button>
          </form>

          {/* Переключение на регистрацию */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Нет аккаунта?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-[#2E86C1] hover:underline"
              >
                Зарегистрироваться
              </button>
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Тестовые учетные записи:</p>
            <p className="text-xs text-gray-600">👤 Пользователь: user / user123</p>
            <p className="text-xs text-gray-600">👤 Администратор: admin / admin123</p>
          </div>

          {/* Социальные сети */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-3">Мы в социальных сетях</p>
            <div className="flex justify-center gap-4">
              {/* ВКонтакте */}
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#0077FF] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="ВКонтакте"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .373.169.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.492-.085.745-.576.745z"/>
                </svg>
              </a>

              {/* Телеграм */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#0088CC] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Телеграм"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
