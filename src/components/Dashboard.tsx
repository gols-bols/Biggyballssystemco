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

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
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
        <h3 className="mb-4">Фильтры</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Поиск</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по заявкам..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Статус</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
            >
              <option value="all">Все</option>
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
              <option value="all">Все</option>
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
              <option value="all">Все</option>
              <option value="Оборудование">Оборудование</option>
              <option value="Доступы">Доступы</option>
              <option value="Программное обеспечение">Программное обеспечение</option>
            </select>
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
