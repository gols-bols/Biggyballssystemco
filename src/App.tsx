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
  {
    id: 3,
    title: 'Установка Microsoft Office на новый компьютер',
    description: 'Необходимо установить пакет Microsoft Office 2021 на компьютер преподавателя в кабинете 301.',
    category: 'Программное обеспечение',
    priority: 'Средний',
    status: 'Завершена',
    author: 'Смирнов А.И.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-10-28T11:15:00',
    updatedAt: '2025-10-30T16:45:00',
    history: [
      { timestamp: '2025-10-28T11:15:00', action: 'Заявка создана', user: 'Смирнов А.И.' },
      { timestamp: '2025-10-29T09:00:00', action: 'Статус изменен на "В работе"', user: 'Администратор' },
      { timestamp: '2025-10-30T16:45:00', action: 'Статус изменен на "Завершена"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 4,
    title: 'Не работает проектор в актовом зале',
    description: 'Проектор Epson не включается, возможно проблема с питанием.',
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
    description: 'Забыл пароль от учетной записи в корпоративной сети, требуется сброс.',
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
    description: 'Требуется обновить Kaspersky Endpoint Security на всех компьютерах лаборатории.',
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
    description: 'В принтере Canon в кабинете 110 закончился тонер, нужна замена картриджа.',
    category: 'Оборудование',
    priority: 'Низкий',
    status: 'Завершена',
    author: 'Волкова Т.А.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-10-25T13:20:00',
    updatedAt: '2025-10-26T10:00:00',
    history: [
      { timestamp: '2025-10-25T13:20:00', action: 'Заявка создана', user: 'Волкова Т.А.' },
      { timestamp: '2025-10-25T14:00:00', action: 'Статус изменен на "В работе"', user: 'Петров П.П.' },
      { timestamp: '2025-10-26T10:00:00', action: 'Статус изменен на "Завершена"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 8,
    title: 'Настройка Wi-Fi в учебном корпусе',
    description: 'Слабый сигнал Wi-Fi на втором этаже, студенты жалуются на постоянные обрывы связи.',
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
    title: 'Установка Adobe Photoshop для дизайнеров',
    description: 'Необходимо установить Adobe Photoshop CC на компьютеры в кабинете дизайна.',
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
    title: 'Ремонт клавиатуры в компьютерном классе',
    description: 'Клавиатура на рабочем месте №5 не работает, требуется замена.',
    category: 'Оборудование',
    priority: 'Низкий',
    status: 'Завершена',
    author: 'Лебедев А.Н.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-10-29T10:30:00',
    updatedAt: '2025-10-30T14:00:00',
    history: [
      { timestamp: '2025-10-29T10:30:00', action: 'Заявка создана', user: 'Лебедев А.Н.' },
      { timestamp: '2025-10-30T09:00:00', action: 'Статус изменен на "В работе"', user: 'Петров П.П.' },
      { timestamp: '2025-10-30T14:00:00', action: 'Статус изменен на "Завершена"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 11,
    title: 'Создание учетной записи для нового преподавателя',
    description: 'Новому преподавателю Ивановой Л.М. нужен доступ к корпоративным ресурсам.',
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
    description: 'На компьютере бухгалтерии не запускается программа 1С, выдает ошибку.',
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
    title: 'Настройка общего сетевого диска',
    description: 'Требуется настроить доступ к общему сетевому диску для отдела.',
    category: 'Доступы',
    priority: 'Средний',
    status: 'Завершена',
    author: 'Сидоров В.А.',
    assignedTo: 'Администратор',
    createdAt: '2025-10-27T11:00:00',
    updatedAt: '2025-10-28T15:30:00',
    history: [
      { timestamp: '2025-10-27T11:00:00', action: 'Заявка создана', user: 'Сидоров В.А.' },
      { timestamp: '2025-10-27T14:00:00', action: 'Статус изменен на "В работе"', user: 'Администратор' },
      { timestamp: '2025-10-28T15:30:00', action: 'Статус изменен на "Завершена"', user: 'Администратор' },
    ],
  },
  {
    id: 14,
    title: 'Замена монитора в аудитории 315',
    description: 'Монитор мерцает и показывает полосы, требуется замена.',
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
    title: 'Установка Python 3.11 в лаборатории программирования',
    description: 'Для нового курса по машинному обучению нужен Python 3.11 и библиотеки.',
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
  {
    id: 16,
    title: 'Медленно работает интернет в библиотеке',
    description: 'Студенты жалуются на низкую скорость интернета в читальном зале.',
    category: 'Оборудование',
    priority: 'Средний',
    status: 'Новая',
    author: 'Козлова Е.И.',
    assignedTo: null,
    createdAt: '2025-11-02T16:00:00',
    updatedAt: '2025-11-02T16:00:00',
    history: [
      { timestamp: '2025-11-02T16:00:00', action: 'Заявка создана', user: 'Козлова Е.И.' },
    ],
  },
  {
    id: 17,
    title: 'Не открывается электронный журнал',
    description: 'При попытке войти в электронный журнал выдает ошибку авторизации.',
    category: 'Доступы',
    priority: 'Высокий',
    status: 'В работе',
    author: 'Романова Ю.Д.',
    assignedTo: 'Администратор',
    createdAt: '2025-11-03T08:00:00',
    updatedAt: '2025-11-03T09:30:00',
    history: [
      { timestamp: '2025-11-03T08:00:00', action: 'Заявка создана', user: 'Романова Ю.Д.' },
      { timestamp: '2025-11-03T09:30:00', action: 'Статус изменен на "В работе"', user: 'Администратор' },
    ],
  },
  {
    id: 18,
    title: 'Настройка видеоконференции в Zoom',
    description: 'Необходимо настроить и протестировать Zoom для онлайн-лекций.',
    category: 'Программное обеспечение',
    priority: 'Средний',
    status: 'Завершена',
    author: 'Алексеев Г.Н.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-10-26T10:00:00',
    updatedAt: '2025-10-27T16:00:00',
    history: [
      { timestamp: '2025-10-26T10:00:00', action: 'Заявка создана', user: 'Алексеев Г.Н.' },
      { timestamp: '2025-10-27T09:00:00', action: 'Статус изменен на "В работе"', user: 'Петров П.П.' },
      { timestamp: '2025-10-27T16:00:00', action: 'Статус изменен на "Завершена"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 19,
    title: 'Не работает сканер в деканате',
    description: 'Сканер HP не распознается системой, не удается отсканировать документы.',
    category: 'Оборудование',
    priority: 'Средний',
    status: 'Новая',
    author: 'Денисова О.Л.',
    assignedTo: null,
    createdAt: '2025-11-03T11:30:00',
    updatedAt: '2025-11-03T11:30:00',
    history: [
      { timestamp: '2025-11-03T11:30:00', action: 'Заявка создана', user: 'Денисова О.Л.' },
    ],
  },
  {
    id: 20,
    title: 'Установка AutoCAD для чертежной группы',
    description: 'Студентам инженерного отделения нужен AutoCAD 2024 для занятий.',
    category: 'Программное обеспечение',
    priority: 'Высокий',
    status: 'В работе',
    author: 'Захаров Д.В.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-11-02T13:00:00',
    updatedAt: '2025-11-03T10:30:00',
    history: [
      { timestamp: '2025-11-02T13:00:00', action: 'Заявка создана', user: 'Захаров Д.В.' },
      { timestamp: '2025-11-03T10:30:00', action: 'Статус изменен на "В работе"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 21,
    title: 'Блокировка спам-рассылок на почте',
    description: 'Последнее время много спама в корпоративной почте, требуется усилить фильтрацию.',
    category: 'Доступы',
    priority: 'Низкий',
    status: 'Новая',
    author: 'Белова М.К.',
    assignedTo: null,
    createdAt: '2025-11-01T15:00:00',
    updatedAt: '2025-11-01T15:00:00',
    history: [
      { timestamp: '2025-11-01T15:00:00', action: 'Заявка создана', user: 'Белова М.К.' },
    ],
  },
  {
    id: 22,
    title: 'Замена батареек в беспроводной мыши',
    description: 'В кабинете 204 беспроводная мышь не работает, нужны новые батарейки.',
    category: 'Оборудование',
    priority: 'Низкий',
    status: 'Завершена',
    author: 'Титов С.Р.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-10-30T12:00:00',
    updatedAt: '2025-10-30T14:30:00',
    history: [
      { timestamp: '2025-10-30T12:00:00', action: 'Заявка создана', user: 'Титов С.Р.' },
      { timestamp: '2025-10-30T14:30:00', action: 'Статус изменен на "Завершена"', user: 'Петров П.П.' },
    ],
  },
  {
    id: 23,
    title: 'Обновление операционной системы Windows',
    description: 'Требуется обновить Windows 10 до последней версии на компьютерах администрации.',
    category: 'Программное обеспечение',
    priority: 'Средний',
    status: 'В работе',
    author: 'Новиков А.В.',
    assignedTo: 'Администратор',
    createdAt: '2025-11-01T10:00:00',
    updatedAt: '2025-11-02T15:00:00',
    history: [
      { timestamp: '2025-11-01T10:00:00', action: 'Заявка создана', user: 'Новиков А.В.' },
      { timestamp: '2025-11-02T15:00:00', action: 'Статус изменен на "В работе"', user: 'Администратор' },
    ],
  },
  {
    id: 24,
    title: 'Настройка доступа к облачному хранилищу',
    description: 'Преподавателям нужен доступ к Google Drive для обмена учебными материалами.',
    category: 'Доступы',
    priority: 'Средний',
    status: 'Новая',
    author: 'Степанова В.П.',
    assignedTo: null,
    createdAt: '2025-11-03T14:00:00',
    updatedAt: '2025-11-03T14:00:00',
    history: [
      { timestamp: '2025-11-03T14:00:00', action: 'Заявка создана', user: 'Степанова В.П.' },
    ],
  },
  {
    id: 25,
    title: 'Ремонт системного блока в серверной',
    description: 'Один из серверов издает странные звуки, возможно проблема с вентилятором.',
    category: 'Оборудование',
    priority: 'Высокий',
    status: 'Новая',
    author: 'Администратор',
    assignedTo: null,
    createdAt: '2025-11-03T15:00:00',
    updatedAt: '2025-11-03T15:00:00',
    history: [
      { timestamp: '2025-11-03T15:00:00', action: 'Заявка создана', user: 'Администратор' },
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
  const [tickets, setTickets] = useState(loadTicketsFromStorage);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    saveTicketsToStorage(tickets);
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