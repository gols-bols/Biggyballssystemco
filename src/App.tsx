import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { CreateTicket } from './components/CreateTicket';
import { TicketDetails } from './components/TicketDetails';
import { AdminPanel } from './components/AdminPanel';
import { Statistics } from './components/Statistics';
import { Navbar } from './components/Navbar';
import { Ticket, Page } from './types';

// Начальные данные заявок
const initialTickets: Ticket[] = [
  {
    id: 1,
    title: 'Не работает принтер в аудитории 205',
    description: 'Принтер HP LaserJet в аудитории 205 не печатает документы. При отправке на печать документ висит в очереди и не выходит. Индикаторы на принтере мигают красным.',
    category: 'Оборудование',
    priority: 'Высокий',
    status: 'В работе',
    author: 'Иванова М.С.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-11-01T09:00:00',
    updatedAt: '2025-11-02T10:30:00',
    history: [
      {
        timestamp: '2025-11-01T09:00:00',
        action: 'Заявка создана',
        user: 'Иванова М.С.',
      },
      {
        timestamp: '2025-11-02T10:30:00',
        action: 'Статус изменен на "В работе"',
        user: 'Администратор',
      },
      {
        timestamp: '2025-11-02T10:31:00',
        action: 'Назначен исполнитель: Петров П.П.',
        user: 'Администратор',
      },
    ],
  },
  {
    id: 2,
    title: 'Запрос доступа к корпоративной почте',
    description: 'Прошу предоставить доступ к корпоративной почте для нового сотрудника Сидорова А.А. Необходим доступ к общим папкам и календарю.',
    category: 'Доступы',
    priority: 'Средний',
    status: 'Новая',
    author: 'Кузнецова О.В.',
    assignedTo: null,
    createdAt: '2025-11-02T14:20:00',
    updatedAt: '2025-11-02T14:20:00',
    history: [
      {
        timestamp: '2025-11-02T14:20:00',
        action: 'Заявка создана',
        user: 'Кузнецова О.В.',
      },
    ],
  },
  {
    id: 3,
    title: 'Установка Microsoft Office на новый компьютер',
    description: 'Необходимо установить пакет Microsoft Office 2021 на новый компьютер в аудитории 310. Компьютер уже настроен и подключен к сети.',
    category: 'Программное обеспечение',
    priority: 'Средний',
    status: 'В работе',
    author: 'Смирнов В.П.',
    assignedTo: 'Иванов И.И.',
    createdAt: '2025-11-01T11:00:00',
    updatedAt: '2025-11-01T15:45:00',
    history: [
      {
        timestamp: '2025-11-01T11:00:00',
        action: 'Заявка создана',
        user: 'Смирнов В.П.',
      },
      {
        timestamp: '2025-11-01T15:45:00',
        action: 'Статус изменен на "В работе"',
        user: 'Администратор',
      },
    ],
  },
  {
    id: 4,
    title: 'Проблема с подключением к Wi-Fi в библиотеке',
    description: 'В библиотеке не работает Wi-Fi. Сеть видна, но при попытке подключения выдает ошибку "Не удается получить IP-адрес".',
    category: 'Оборудование',
    priority: 'Высокий',
    status: 'Новая',
    author: 'Николаев Д.А.',
    assignedTo: null,
    createdAt: '2025-11-03T08:30:00',
    updatedAt: '2025-11-03T08:30:00',
    history: [
      {
        timestamp: '2025-11-03T08:30:00',
        action: 'Заявка создана',
        user: 'Николаев Д.А.',
      },
    ],
  },
  {
    id: 5,
    title: 'Обновление антивируса на компьютерах в кабинете информатики',
    description: 'Истекает лицензия антивируса Kaspersky на компьютерах в кабинете информатики (15 компьютеров). Требуется обновление лицензии или установка нового антивируса.',
    category: 'Программное обеспечение',
    priority: 'Низкий',
    status: 'Завершена',
    author: 'Павлова Е.И.',
    assignedTo: 'Сидоров С.С.',
    createdAt: '2025-10-28T10:00:00',
    updatedAt: '2025-10-31T16:00:00',
    history: [
      {
        timestamp: '2025-10-28T10:00:00',
        action: 'Заявка создана',
        user: 'Павлова Е.И.',
      },
      {
        timestamp: '2025-10-29T09:00:00',
        action: 'Статус изменен на "В работе"',
        user: 'Администратор',
      },
      {
        timestamp: '2025-10-31T16:00:00',
        action: 'Заявка закрыта',
        user: 'Администратор',
      },
    ],
  },
];

function AppContent() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleCreateTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Math.max(...tickets.map(t => t.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          timestamp: new Date().toISOString(),
          action: 'Заявка создана',
          user: user?.displayName || 'Пользователь',
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setCurrentPage('dashboard');
  };

  const handleUpdateTicket = (id: number, updates: Partial<Ticket>) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    ));
  };

  const handleViewTicket = (id: number) => {
    setSelectedTicketId(id);
    setCurrentPage('details');
  };

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  // Если пользователь не авторизован, п��казываем страницу входа или регистрации
  if (!isAuthenticated) {
    if (showRegister) {
      return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return <LoginPage onSwitchToRegister={() => setShowRegister(true)} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Верхняя панель навигации */}
      <Navbar
        currentPage={currentPage}
        onNavigateAdmin={() => setCurrentPage('admin')}
        onNavigateDashboard={() => setCurrentPage('dashboard')}
        onNavigateStatistics={() => setCurrentPage('statistics')}
      />

      {/* Основной контент */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {currentPage === 'dashboard' && (
          <Dashboard
            tickets={tickets}
            onViewTicket={handleViewTicket}
            onCreateTicket={() => setCurrentPage('create')}
            isAdmin={isAdmin}
          />
        )}

        {currentPage === 'create' && (
          <CreateTicket
            onBack={() => setCurrentPage('dashboard')}
            onSave={handleCreateTicket}
            currentUser={user?.displayName || 'Пользователь'}
          />
        )}

        {currentPage === 'details' && selectedTicket && (
          <TicketDetails
            ticket={selectedTicket}
            onBack={() => setCurrentPage('dashboard')}
            onUpdate={handleUpdateTicket}
            isAdmin={isAdmin}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPanel
            tickets={tickets}
            onBack={() => setCurrentPage('dashboard')}
            onUpdateTicket={handleUpdateTicket}
          />
        )}

        {currentPage === 'statistics' && (
          <Statistics
            tickets={tickets}
            onBack={() => setCurrentPage('dashboard')}
          />
        )}
      </main>

      {/* Футер */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-gray-500">
          © 2025 IT-отдел колледжа. Система управления заявками.
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppContent />
      </div>
    </AuthProvider>
  );
}
