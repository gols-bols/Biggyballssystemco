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

// Начальные данные заявок
const initialTickets = [
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
  {
    id: 6,
    title: 'Замена картриджа в принтере Canon',
    description: 'Необходимо заменить картридж в принтере Canon в кабинете 112. Принтер выдает ошибку "Low Toner".',
    category: 'Оборудование',
    priority: 'Средний',
    status: 'Новая',
    author: 'Морозова Т.В.',
    assignedTo: null,
    createdAt: '2025-11-04T10:15:00',
    updatedAt: '2025-11-04T10:15:00',
    history: [
      {
        timestamp: '2025-11-04T10:15:00',
        action: 'Заявка создана',
        user: 'Морозова Т.В.',
      },
    ],
  },
  {
    id: 7,
    title: 'Настройка учетной записи для нового преподавателя',
    description: 'Создать учетную запись в системе и предоставить доступ к электронному журналу для Федорова А.С.',
    category: 'Доступы',
    priority: 'Высокий',
    status: 'В работе',
    author: 'Романова К.П.',
    assignedTo: 'Иванов И.И.',
    createdAt: '2025-11-03T13:45:00',
    updatedAt: '2025-11-03T16:20:00',
    history: [
      {
        timestamp: '2025-11-03T13:45:00',
        action: 'Заявка создана',
        user: 'Романова К.П.',
      },
      {
        timestamp: '2025-11-03T16:20:00',
        action: 'Статус изменен на "В работе"',
        user: 'Администратор',
      },
    ],
  },
  {
    id: 8,
    title: 'Установка AutoCAD на компьютеры в чертежном кабинете',
    description: 'Требуется установить AutoCAD 2024 на 10 компьютеров в кабинете технического черчения.',
    category: 'Программное обеспечение',
    priority: 'Средний',
    status: 'Новая',
    author: 'Григорьев В.М.',
    assignedTo: null,
    createdAt: '2025-11-04T09:00:00',
    updatedAt: '2025-11-04T09:00:00',
    history: [
      {
        timestamp: '2025-11-04T09:00:00',
        action: 'Заявка создана',
        user: 'Григорьев В.М.',
      },
    ],
  },
  {
    id: 9,
    title: 'Ремонт компьютера в кабинете директора',
    description: 'Компьютер не включается. При нажатии на кнопку питания индикаторы не загораются, вентиляторы не запускаются.',
    category: 'Оборудование',
    priority: 'Высокий',
    status: 'В работе',
    author: 'Соколова Л.И.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-11-02T08:00:00',
    updatedAt: '2025-11-02T11:30:00',
    history: [
      {
        timestamp: '2025-11-02T08:00:00',
        action: 'Заявка создана',
        user: 'Соколова Л.И.',
      },
      {
        timestamp: '2025-11-02T11:30:00',
        action: 'Статус изменен на "В работе"',
        user: 'Администратор',
      },
    ],
  },
  {
    id: 10,
    title: 'Обновление веб-браузеров на всех компьютерах',
    description: 'Необходимо обновить Chrome и Firefox до последних версий на всех рабочих станциях.',
    category: 'Программное обеспечение',
    priority: 'Низкий',
    status: 'Завершена',
    author: 'Волков Н.Н.',
    assignedTo: 'Сидоров С.С.',
    createdAt: '2025-10-25T14:00:00',
    updatedAt: '2025-10-29T17:00:00',
    history: [
      {
        timestamp: '2025-10-25T14:00:00',
        action: 'Заявка создана',
        user: 'Волков Н.Н.',
      },
      {
        timestamp: '2025-10-26T10:00:00',
        action: 'Статус изменен на "В работе"',
        user: 'Администратор',
      },
      {
        timestamp: '2025-10-29T17:00:00',
        action: 'Заявка закрыта',
        user: 'Администратор',
      },
    ],
  },
  {
    id: 11,
    title: 'Настройка проектора в актовом зале',
    description: 'Проектор не проецирует изображение с ноутбука. Возможно проблема с кабелем HDMI или настройками.',
    category: 'Оборудование',
    priority: 'Высокий',
    status: 'Новая',
    author: 'Белова Е.А.',
    assignedTo: null,
    createdAt: '2025-11-04T11:30:00',
    updatedAt: '2025-11-04T11:30:00',
    history: [
      {
        timestamp: '2025-11-04T11:30:00',
        action: 'Заявка создана',
        user: 'Белова Е.А.',
      },
    ],
  },
  {
    id: 12,
    title: 'Создание почтовой рассылки для студентов',
    description: 'Необходимо создать групповую почтовую рассылку для группы СПО-23.',
    category: 'Доступы',
    priority: 'Низкий',
    status: 'Новая',
    author: 'Захарова М.Ю.',
    assignedTo: null,
    createdAt: '2025-11-03T15:00:00',
    updatedAt: '2025-11-03T15:00:00',
    history: [
      {
        timestamp: '2025-11-03T15:00:00',
        action: 'Заявка создана',
        user: 'Захарова М.Ю.',
      },
    ],
  },
  {
    id: 13,
    title: 'Установка Python и необходимых библиотек',
    description: 'Установить Python 3.11 и библиотеки NumPy, Pandas, Matplotlib на компьютеры в лаборатории программирования.',
    category: 'Программное обеспечение',
    priority: 'Средний',
    status: 'В работе',
    author: 'Лебедев С.В.',
    assignedTo: 'Иванов И.И.',
    createdAt: '2025-11-01T12:00:00',
    updatedAt: '2025-11-02T09:00:00',
    history: [
      {
        timestamp: '2025-11-01T12:00:00',
        action: 'Заявка создана',
        user: 'Лебедев С.В.',
      },
      {
        timestamp: '2025-11-02T09:00:00',
        action: 'Статус изменен на "В работе"',
        user: 'Администратор',
      },
    ],
  },
  {
    id: 14,
    title: 'Чистка и обслуживание компьютеров в кабинете 301',
    description: 'Необходимо провести чистку системных блоков от пыли и проверит работоспособность всех компонентов.',
    category: 'Оборудование',
    priority: 'Низкий',
    status: 'Завершена',
    author: 'Орлов Д.П.',
    assignedTo: 'Петров П.П.',
    createdAt: '2025-10-20T10:00:00',
    updatedAt: '2025-10-27T16:00:00',
    history: [
      {
        timestamp: '2025-10-20T10:00:00',
        action: 'Заявка создана',
        user: 'Орлов Д.П.',
      },
      {
        timestamp: '2025-10-22T08:00:00',
        action: 'Статус изменен на "В работе"',
        user: 'Администратор',
      },
      {
        timestamp: '2025-10-27T16:00:00',
        action: 'Заявка закрыта',
        user: 'Администратор',
      },
    ],
  },
  {
    id: 15,
    title: 'Настройка доступа к сетевому хранилищу',
    description: 'Предоставить доступ к сетевой папке "Учебные материалы" для группы преподавателей математики.',
    category: 'Доступы',
    priority: 'Средний',
    status: 'Новая',
    author: 'Новикова А.С.',
    assignedTo: null,
    createdAt: '2025-11-04T14:00:00',
    updatedAt: '2025-11-04T14:00:00',
    history: [
      {
        timestamp: '2025-11-04T14:00:00',
        action: 'Заявка создана',
        user: 'Новикова А.С.',
      },
    ],
  },
];

// Функция для загрузки заявок из localStorage
const loadTicketsFromStorage = () => {
  try {
    const stored = localStorage.getItem('tickets_db');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Ошибка загрузки заявок из localStorage:', error);
  }
  return initialTickets;
};

// Функция для сохранения заявок в localStorage
const saveTicketsToStorage = (tickets) => {
  try {
    localStorage.setItem('tickets_db', JSON.stringify(tickets));
  } catch (error) {
    console.error('Ошибка сохранения заявок в localStorage:', error);
  }
};

function AppContent() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [tickets, setTickets] = useState(loadTicketsFromStorage);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // Сохранение заявок в localStorage при каждом изменении
  useEffect(() => {
    saveTicketsToStorage(tickets);
  }, [tickets]);

  const handleCreateTicket = (ticketData) => {
    const newTicket = {
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

  const handleUpdateTicket = (id, updates) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    ));
  };

  const handleViewTicket = (id) => {
    setSelectedTicketId(id);
    setCurrentPage('details');
  };

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  // Если пользователь не авторизован, показываем страницу входа или регистрации
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
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppContent />
        <YandexVerification />
      </div>
    </AuthProvider>
  );
}
