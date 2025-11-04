import { useState } from 'react';
import { Ticket } from '../types';

interface DashboardProps {
  tickets: Ticket[];
  onViewTicket: (id: number) => void;
  onCreateTicket: () => void;
  isAdmin: boolean;
}

export function Dashboard({ tickets, onViewTicket, onCreateTicket, isAdmin }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const filteredTickets = tickets.filter(ticket => {
    // Поиск по ID, теме, описанию и категории
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      ticket.id.toString().includes(searchLower) ||
      ticket.title.toLowerCase().includes(searchLower) ||
      ticket.description.toLowerCase().includes(searchLower) ||
      ticket.category.toLowerCase().includes(searchLower) ||
      ticket.author.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    
    // Фильтр по дате
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const now = new Date();
      const ticketDate = new Date(ticket.createdAt);
      const daysDiff = Math.floor((now.getTime() - ticketDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesDate;
  }).sort((a, b) => {
    // Сортировка
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'priority-high':
        const priorityOrder = { 'Высокий': 3, 'Средний': 2, 'Низкий': 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      case 'priority-low':
        const priorityOrder2 = { 'Высокий': 3, 'Средний': 2, 'Низкий': 1 };
        return priorityOrder2[a.priority as keyof typeof priorityOrder2] - priorityOrder2[b.priority as keyof typeof priorityOrder2];
      case 'id-asc':
        return a.id - b.id;
      case 'id-desc':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'Новая').length,
    inProgress: tickets.filter(t => t.status === 'В работе').length,
    completed: tickets.filter(t => t.status === 'Завершена').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новая':
        return 'bg-blue-100 text-blue-800';
      case 'В работе':
        return 'bg-yellow-100 text-yellow-800';
      case 'Завершена':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Высокий':
        return 'bg-red-100 text-red-800';
      case 'Средний':
        return 'bg-orange-100 text-orange-800';
      case 'Низкий':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl mb-2">Дашборд</h1>
          <p className="text-gray-500">Обзор всех заявок в системе</p>
        </div>
        <button
          onClick={onCreateTicket}
          className="px-4 py-2 bg-[#27AE60] text-white rounded-lg hover:bg-[#1e8449] transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Создать заявку
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Всего заявок</p>
              <p className="text-3xl">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#2E86C1]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Новые</p>
              <p className="text-3xl text-[#2E86C1]">{stats.new}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#2E86C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#F39C12]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">В работе</p>
              <p className="text-3xl text-[#F39C12]">{stats.inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#F39C12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#27AE60]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Завершены</p>
              <p className="text-3xl text-[#27AE60]">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#27AE60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Фильтры и поиск</h3>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPriorityFilter('all');
              setCategoryFilter('all');
              setDateFilter('all');
              setSortBy('date-desc');
            }}
            className="text-sm text-[#2E86C1] hover:underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Сбросить фильтры
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Поиск */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Поиск по ID, теме, описанию, категории, автору
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Введите запрос для поиска..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Статус</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
              >
                <option value="all">Все статусы</option>
                <option value="Новая">Новая</option>
                <option value="В работе">В работе</option>
                <option value="Завершена">Завершена</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Приоритет</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
              >
                <option value="all">Все приоритеты</option>
                <option value="Низкий">Низкий</option>
                <option value="Средний">Средний</option>
                <option value="Высокий">Высокий</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Категория</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
              >
                <option value="all">Все категории</option>
                <option value="Оборудование">Оборудование</option>
                <option value="Доступы">Доступы</option>
                <option value="Программное обеспечение">Программное обеспечение</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Дата создания</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
              >
                <option value="all">За все время</option>
                <option value="today">Сегодня</option>
                <option value="week">За неделю</option>
                <option value="month">За месяц</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Сортировка</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
              >
                <option value="date-desc">Новые сначала</option>
                <option value="date-asc">Старые сначала</option>
                <option value="priority-high">Приоритет: высокий → низкий</option>
                <option value="priority-low">Приоритет: низкий → высокий</option>
                <option value="id-asc">ID по возрастанию</option>
                <option value="id-desc">ID по убыванию</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Список заявок */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3>Заявки ({filteredTickets.length})</h3>
        </div>

        {/* Мобильный вид - карточки */}
        <div className="lg:hidden">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Заявки не найдены</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTickets.map(ticket => (
                <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-1">#{ticket.id}</div>
                        <div className="mb-2">{ticket.title}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Категория: {ticket.category}</div>
                      <div>Автор: {ticket.author}</div>
                      <div>Дата: {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}</div>
                    </div>

                    <button
                      onClick={() => onViewTicket(ticket.id)}
                      className="w-full px-4 py-2 bg-[#2E86C1] text-white rounded-lg hover:bg-[#1F618D] transition-colors text-sm"
                    >
                      Просмотр заявки
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Десктопный вид - таблица */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Тема</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Категория</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Приоритет</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Автор</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Дата</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">#{ticket.id}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="max-w-xs truncate">{ticket.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onViewTicket(ticket.id)}
                      className="text-[#2E86C1] hover:text-[#1F618D] hover:underline"
                    >
                      Просмотр
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTickets.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>Заявки не найдены</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
