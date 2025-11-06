import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Проверка силы пароля
  const getPasswordStrength = (pass: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 10) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;

    if (strength === 0) return { strength: 0, label: '', color: '' };
    if (strength <= 2) return { strength: 33, label: 'Слабый', color: 'bg-red-500' };
    if (strength === 3) return { strength: 66, label: 'Средний', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Сильный', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Имитация задержки для реалистичности
    setTimeout(() => {
      const result = register(username, email, displayName, password, confirmPassword);
      
      if (!result.success && result.error) {
        setError(result.error);
      }
      
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#27AE60] to-[#229954] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl mb-2">Регистрация</h1>
            <p className="text-gray-500">Создайте новый аккаунт</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Логин */}
            <div>
              <label htmlFor="username" className="block text-sm mb-2 text-gray-700">
                Логин <span className="text-red-500">*</span>
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
                    setError('');
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#27AE60]'
                  }`}
                  placeholder="Введите логин"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">От 3 до 20 символов, латинские буквы, цифры и _</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#27AE60]'
                  }`}
                  placeholder="example@college.ru"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Имя пользователя */}
            <div>
              <label htmlFor="displayName" className="block text-sm mb-2 text-gray-700">
                Полное имя <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    setError('');
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#27AE60]'
                  }`}
                  placeholder="Иванов Иван Иванович"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Пароль */}
            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                Пароль <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#27AE60]'
                  }`}
                  placeholder="Введите пароль"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Сила пароля:</span>
                    <span className={`text-xs ${
                      passwordStrength.strength === 100 ? 'text-green-600' :
                      passwordStrength.strength === 66 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Минимум 6 символов, буква и цифра</p>
            </div>

            {/* Подтверждение пароля */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-700">
                Подтвердите пароль <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {confirmPassword && password === confirmPassword ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    confirmPassword && password !== confirmPassword 
                      ? 'border-red-300 focus:ring-red-500' 
                      : confirmPassword && password === confirmPassword
                      ? 'border-green-300 focus:ring-green-500'
                      : error 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-[#27AE60]'
                  }`}
                  placeholder="Повторите пароль"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-600 mt-1">Пароли не совпадают</p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-xs text-green-600 mt-1">Пароли совпадают</p>
              )}
            </div>

            {/* Кнопка регистрации */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#27AE60] hover:bg-[#229954] text-white'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Регистрация...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </button>
          </form>

          {/* Переключение на вход */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Уже есть аккаунт?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-[#27AE60] hover:underline"
              >
                Войти
              </button>
            </p>
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
