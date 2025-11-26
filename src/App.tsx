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

// Начальные данные заявок
const initialTickets = [
  {
    id: 1,
    title: 'Не работает принтер в аудитории 205',
    description: 'Принтер HP LaserJet в аудитории 205 не печатает документы.',
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
    description: 'Прошу предоставить доступ к корпоративной почте для нового сотрудника.',
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
];

const loadTicketsFromStorage = () => {
  try {
    const stored = localStorage.getItem('tickets_db');
    if (stored) return JSON.parse(stored);
  } catch (error) {
    console.error('Ошибка загрузки заявок:', error);
  }
  return initialTickets;
};

const saveTicketsToStorage = (tickets: any[]) => {
  try {
    localStorage.setItem('tickets_db', JSON.stringify(tickets));
  } catch (error) {
    console.error('Ошибка сохранения заявок:', error);
  }
};

function AppContent() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [tickets, setTickets] = useState(loadTicketsFromStorage);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    saveTicketsToStorage(tickets);
  }, [tickets]);

  const handleCreateTicket = (ticketData: any) => {
    const newTicket = {
      ...ticketData,
      id: Math.max(...tickets.map((t: any) => t.id)) + 1,
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
