import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigateAdmin: () => void;
  onNavigateDashboard: () => void;
}

export function Navbar({
  currentPage,
  onNavigateAdmin,
  onNavigateDashboard,
}: NavbarProps) {
  const { user, isAdmin, logout, toggleRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    closeMobileMenu();
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Логотип и название */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#2E86C1] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl">Система управления заявками</h1>
                <p className="text-sm text-gray-500">IT-отдел колледжа</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg">Заявки IT</h1>
              </div>
            </div>

            {/* Десктопное меню */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">{user?.displayName}</span>
              </div>

              <button
                onClick={toggleRole}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Переключить роль
              </button>

              {isAdmin && currentPage !== 'admin' && (
                <button
                  onClick={onNavigateAdmin}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Админ-панель
                </button>
              )}

              {currentPage !== 'dashboard' && (
                <button
                  onClick={onNavigateDashboard}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Дашборд
                </button>
              )}

              <button
                onClick={handleLogoutClick}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#E74C3C] whitespace-nowrap"
              >
                Выйти
              </button>
            </div>

            {/* Бургер кнопка для мобильных */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Меню"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Мобильное меню */}
          {isMobileMenuOpen && (
            <>
              {/* Оверлей */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                style={{ top: '0', left: '0', right: '0', bottom: '0', marginTop: '73px' }}
                onClick={closeMobileMenu}
              />

              {/* Меню */}
              <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg">
                <nav className="container mx-auto px-4 py-4 space-y-3">
                  {/* Информация о пользователе */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">{user?.displayName}</span>
                  </div>

                  {/* Переключить роль */}
                  <button
                    onClick={() => {
                      toggleRole();
                      closeMobileMenu();
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    Переключить роль
                  </button>

                  {/* Админ-панель */}
                  {isAdmin && currentPage !== 'admin' && (
                    <button
                      onClick={() => {
                        onNavigateAdmin();
                        closeMobileMenu();
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      Админ-панель
                    </button>
                  )}

                  {/* Дашборд */}
                  {currentPage !== 'dashboard' && (
                    <button
                      onClick={() => {
                        onNavigateDashboard();
                        closeMobileMenu();
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      Дашборд
                    </button>
                  )}

                  {/* Выйти */}
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#E74C3C] text-left"
                  >
                    Выйти
                  </button>
                </nav>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Модальное окно подтверждения выхода */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#E74C3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-2xl mb-2">Подтверждение выхода</h2>
              <p className="text-gray-600">Вы действительно хотите выйти из системы?</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-3 bg-[#E74C3C] text-white rounded-lg hover:bg-[#C0392B] transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
