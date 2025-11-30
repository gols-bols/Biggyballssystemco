import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { CreateTicket } from './components/CreateTicket';
import { TicketDetails } from './components/TicketDetails';
import { AdminPanel } from './components/AdminPanel';
import { Statistics } from './components/Statistics';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { YandexVerification } from './components/YandexVerification';
import { DatabaseDocumentation } from './components/DatabaseDocumentation';
import { SecurityLogs } from './components/SecurityLogs';

// Начальные данные заявок (оптимизированный набор для пагинации)
const initialTickets = [
  {
    id: 1,
    title: 'Не работает принтер в аудитории 205',
    description: 'Принтер HP LaserJet не печатает документы.',
    category: 'Оборудование',
    priority: 'Высокий',
    status: 'В работе',
    author: 'Иванова М.С.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-11-01T09:00:00',
    updatedAt: '2025-11-02T10:30:00',
    history: [
      { timestamp: '2025-11-01T09:00:00', action: 'Заявка создана', user: 'Иванова М.С.' },
      { timestamp: '2025-11-02T10:30:00', action: 'Статус изменен на "В работе"', user: 'Администратор' },
    ],
  },
  {
    id: 2,
    title: 'Запрос доступа к корпоративной почте',
    description: 'Прошу предоставить доступ к почте для нового сотрудника.',
    category: 'Доступы',
    priority: 'Средний',
    status: 'Новая',
    author: 'Кузнецова О.В.',
    assignedTo: null,
    createdAt: '2025-11-02T14:20:00',
    updatedAt: '2025-11-02T14:20:00',
    history: [
      { timestamp: '2025-11-02T14:20:00', action: 'Заявка создана', user: 'Кузнецова О.В.' },
    ],
  },
  {
    id: 3,
    title: 'Установка Microsoft Office',
    description: 'Установить MS Office 2021 на компьютер в кабинете 301.',
    category: 'Программное обеспечение',
    priority: 'Средний',
    status: 'Завершена',
    author: 'Смирнов А.И.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-10-28T11:15:00',
    updatedAt: '2025-10-30T16:45:00',
    history: [
      { timestamp: '2025-10-28T11:15:00', action: 'Заявка создана', user: 'Смирнов А.И.' },
      { timestamp: '2025-10-30T16:45:00', action: 'Статус изменен на "Завершена"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 4,
    title: 'Не работает проектор в актовом зале',
    description: 'Проектор Epson не включается.',
    category: 'Оборудование',
    priority: 'Высокий',
    status: 'Новая',
    author: 'Павлова Е.Н.',
    assignedTo: null,
    createdAt: '2025-11-03T08:30:00',
    updatedAt: '2025-11-03T08:30:00',
    history: [
      { timestamp: '2025-11-03T08:30:00', action: 'Заявка создана', user: 'Павлова Е.Н.' },
    ],
  },
  {
    id: 5,
    title: 'Сброс пароля от учетной записи',
    description: 'Требуется сброс пароля от корпоративной сети.',
    category: 'Доступы',
    priority: 'Высокий',
    status: 'В работе',
    author: 'Николаев С.В.',
    assignedTo: 'Администратор',
    createdAt: '2025-11-03T10:00:00',
    updatedAt: '2025-11-03T11:15:00',
    history: [
      { timestamp: '2025-11-03T10:00:00', action: 'Заявка создана', user: 'Николаев С.В.' },
      { timestamp: '2025-11-03T11:15:00', action: 'Статус изменен на "В работе"', user: 'Администратор' },
    ],
  },
  {
    id: 6,
    title: 'Обновление антивирусного ПО',
    description: 'Обновить Kaspersky на всех компьютерах лаборатории.',
    category: 'Программное обеспечение',
    priority: 'Средний',
    status: 'Новая',
    author: 'Федоров Д.М.',
    assignedTo: null,
    createdAt: '2025-11-02T15:40:00',
    updatedAt: '2025-11-02T15:40:00',
    history: [
      { timestamp: '2025-11-02T15:40:00', action: 'Заявка создана', user: 'Федоров Д.М.' },
    ],
  },
  {
    id: 7,
    title: 'Замена картриджа в принтере',
    description: 'В принтере Canon закончился тонер.',
    category: 'Оборудование',
    priority: 'Низкий',
    status: 'Завершена',
    author: 'Волкова Т.А.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-10-25T13:20:00',
    updatedAt: '2025-10-26T10:00:00',
    history: [
      { timestamp: '2025-10-25T13:20:00', action: 'Заявка создана', user: 'Волкова Т.А.' },
      { timestamp: '2025-10-26T10:00:00', action: 'Статус изменен на "Завершена"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 8,
    title: 'Настройка Wi-Fi в учебном корпусе',
    description: 'Слабый сигнал Wi-Fi на втором этаже.',
    category: 'Оборудование',
    priority: 'Высокий',
    status: 'В работе',
    author: 'Морозов К.Л.',
    assignedTo: 'Администратор',
    createdAt: '2025-11-01T16:30:00',
    updatedAt: '2025-11-02T09:00:00',
    history: [
      { timestamp: '2025-11-01T16:30:00', action: 'Заявка создана', user: 'Морозов К.Л.' },
      { timestamp: '2025-11-02T09:00:00', action: 'Статус изменен на "В работе"', user: 'Администратор' },
    ],
  },
  {
    id: 9,
    title: 'Установка Adobe Photoshop',
    description: 'Установить Adobe Photoshop CC на компьютеры в кабинете дизайна.',
    category: 'Программное обеспечение',
    priority: 'Средний',
    status: 'Новая',
    author: 'Соколова И.П.',
    assignedTo: null,
    createdAt: '2025-11-03T12:00:00',
    updatedAt: '2025-11-03T12:00:00',
    history: [
      { timestamp: '2025-11-03T12:00:00', action: 'Заявка создана', user: 'Соколова И.П.' },
    ],
  },
  {
    id: 10,
    title: 'Ремонт клавиатуры',
    description: 'Клав��атура на рабочем месте №5 не работает.',
    category: 'Оборудование',
    priority: 'Низкий',
    status: 'Завершена',
    author: 'Лебедев А.Н.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-10-29T10:30:00',
    updatedAt: '2025-10-30T14:00:00',
    history: [
      { timestamp: '2025-10-29T10:30:00', action: 'Заявка создана', user: 'Лебедев А.Н.' },
      { timestamp: '2025-10-30T14:00:00', action: 'Статус изменен на "Завершена"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 11,
    title: 'Создание учетной записи',
    description: 'Новому преподавателю нужен доступ к ресурсам.',
    category: 'Доступы',
    priority: 'Средний',
    status: 'В работе',
    author: 'Отдел кадров',
    assignedTo: 'Администратор',
    createdAt: '2025-11-02T09:00:00',
    updatedAt: '2025-11-03T10:00:00',
    history: [
      { timestamp: '2025-11-02T09:00:00', action: 'Заявка создана', user: 'Отдел кадров' },
      { timestamp: '2025-11-03T10:00:00', action: 'Статус изменен на "В работе"', user: 'Администратор' },
    ],
  },
  {
    id: 12,
    title: 'Не запускается 1С:Предприятие',
    description: 'Программа 1С выдает ошибку при запуске.',
    category: 'Программное обеспечение',
    priority: 'Высокий',
    status: 'Новая',
    author: 'Петрова Н.В.',
    assignedTo: null,
    createdAt: '2025-11-03T13:45:00',
    updatedAt: '2025-11-03T13:45:00',
    history: [
      { timestamp: '2025-11-03T13:45:00', action: 'Заявка создана', user: 'Петрова Н.В.' },
    ],
  },
  {
    id: 13,
    title: 'Настройка сетевого диска',
    description: 'Настроить доступ к общему сетевому диску.',
    category: 'Доступы',
    priority: 'Средний',
    status: 'Завершена',
    author: 'Сидоров В.А.',
    assignedTo: 'Администратор',
    createdAt: '2025-10-27T11:00:00',
    updatedAt: '2025-10-28T15:30:00',
    history: [
      { timestamp: '2025-10-27T11:00:00', action: 'Заявка создана', user: 'Сидоров В.А.' },
      { timestamp: '2025-10-28T15:30:00', action: 'Статус изменен на "Завершена"', user: 'Администратор' },
    ],
  },
  {
    id: 14,
    title: 'Замена монитора',
    description: 'Монитор мерцает и показывает полосы.',
    category: 'Оборудование',
    priority: 'Средний',
    status: 'В работе',
    author: 'Григорьев М.С.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-11-01T14:20:00',
    updatedAt: '2025-11-02T11:00:00',
    history: [
      { timestamp: '2025-11-01T14:20:00', action: 'Заявка создана', user: 'Григорьев М.С.' },
      { timestamp: '2025-11-02T11:00:00', action: 'Статус изменен на "В работе"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 15,
    title: 'Установка Python 3.11',
    description: 'Для курса по ML нужен Python 3.11.',
    category: 'Программное обеспечение',
    priority: 'Высокий',
    status: 'Новая',
    author: 'Орлов П.Е.',
    assignedTo: null,
    createdAt: '2025-11-03T09:15:00',
    updatedAt: '2025-11-03T09:15:00',
    history: [
      { timestamp: '2025-11-03T09:15:00', action: 'Заявка создана', user: 'Орлов П.Е.' },
    ],
  },
];

const loadTicketsFromStorage = () => {
  if (typeof window === 'undefined') return [...initialTickets];
  
  try {
    const stored = localStorage.getItem('tickets_db');
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...initialTickets];
    }
  } catch (error) {
    console.error('Ошибка загрузки заявок:', error);
  }
  return [...initialTickets];
};

const saveTicketsToStorage = (tickets: any[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('tickets_db', JSON.stringify(tickets));
  } catch (error) {
    console.error('Ошибка сохранения заявок:', error);
  }
};

function AppContent() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [tickets, setTickets] = useState(() => loadTicketsFromStorage());
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (tickets && tickets.length > 0) {
      saveTicketsToStorage(tickets);
    }
  }, [tickets]);

  const handleCreateTicket = (ticketData: any) => {
    const newTicket = {
      ...ticketData,
      id: tickets.length > 0 ? Math.max(...tickets.map((t: any) => t.id)) + 1 : 1,
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

  const handleUpdateTicket = (id: number, updates: any) => {
    setTickets(tickets.map((ticket: any) => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    ));
  };

  const handleViewTicket = (id: number) => {
    setSelectedTicketId(id);
    setCurrentPage('details');
  };

  const selectedTicket = tickets.find((t: any) => t.id === selectedTicketId);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '18px', 
            color: '#2E86C1',
            fontFamily: 'Roboto, sans-serif'
          }}>
            Загрузка...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (showRegister) {
      return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return <LoginPage onSwitchToRegister={() => setShowRegister(true)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        currentPage={currentPage}
        onNavigateAdmin={() => setCurrentPage('admin')}
        onNavigateDashboard={() => setCurrentPage('dashboard')}
        onNavigateStatistics={() => setCurrentPage('statistics')}
        onNavigateDocumentation={() => setCurrentPage('documentation')}
        onNavigateSecurityLogs={() => setCurrentPage('securitylogs')}
      />

      <main style={{ flex: 1 }}>
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

        {currentPage === 'documentation' && <DatabaseDocumentation />}
        
        {currentPage === 'securitylogs' && (
          <SecurityLogs onBack={() => setCurrentPage('dashboard')} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <AppContent />
        <YandexVerification />
      </div>
    </AuthProvider>
  );
}