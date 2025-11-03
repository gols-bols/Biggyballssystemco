import { useState } from 'react';
import { Ticket } from '../types';

interface AdminPanelProps {
  tickets: Ticket[];
  onBack: () => void;
  onUpdateTicket: (id: number, updates: Partial<Ticket>) => void;
}

export function AdminPanel({ tickets, onBack, onUpdateTicket }: AdminPanelProps) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleUpdate = () => {
    if (!selectedTicket) return;

    const updates: Partial<Ticket> = {
      updatedAt: new Date().toISOString(),
    };

    if (newStatus) {
      updates.status = newStatus;
    }

    if (assignedTo) {
      updates.assignedTo = assignedTo;
    }

    onUpdateTicket(selectedTicket.id, updates);
    setSelectedTicket(null);
    setNewStatus('');
    setAssignedTo('');
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Новая': 'bg-[#2E86C1] text-white',
      'В работе': 'bg-[#F39C12] text-white',
      'Завершена': 'bg-[#27AE60] text-white',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'Высокий': 'bg-[#E74C3C] text-white',
      'Средний': 'bg-[#F39C12] text-white',
      'Низкий': 'bg-[#27AE60] text-white',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'Новая').length,
    inProgress: tickets.filter(t => t.status === 'В работе').length,
    completed: tickets.filter(t => t.status === 'Завершена').length,
    unassigned: tickets.filter(t => !t.assignedTo).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>
        <div>
          <h1 className="text-3xl">Панель администратора</h1>
          <p className="text-gray-500">Управление всеми заявками в системе</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Всего</p>
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

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#E74C3C]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Не назначены</p>
              <p className="text-3xl text-[#E74C3C]">{stats.unassigned}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#E74C3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Список заявок */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3>Управление заявками</h3>
        </div>

        {/* Мобильный вид - карточки */}
        <div className="lg:hidden">
          <div className="divide-y divide-gray-200">
            {tickets.map(ticket => (
              <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">#{ticket.id}</div>
                      <div className="mb-2">{ticket.title}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Категория: {ticket.category}</div>
                    <div>Исполнитель: {ticket.assignedTo || <span className="text-gray-400">Не назначен</span>}</div>
                  </div>

                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="w-full px-4 py-2 bg-[#2E86C1] text-white rounded-lg hover:bg-[#1F618D] transition-colors text-sm"
                  >
                    Изменить заявку
                  </button>
                </div>
              </div>
            ))}
          </div>
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
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Исполнитель</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">#{ticket.id}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="max-w-xs truncate">{ticket.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {ticket.assignedTo || <span className="text-gray-400">Не назначен</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-[#2E86C1] hover:text-[#1F618D] hover:underline"
                    >
                      Изменить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно редактирования */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Редактировать заявку #{selectedTicket.id}</h3>
              <button
                onClick={() => {
                  setSelectedTicket(null);
                  setNewStatus('');
                  setAssignedTo('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Тема:</p>
                <p className="mb-4">{selectedTicket.title}</p>
              </div>

              <div>
                <label htmlFor="modal-status" className="block text-sm mb-2 text-gray-700">
                  Статус
                </label>
                <select
                  id="modal-status"
                  value={newStatus || selectedTicket.status}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
                >
                  <option value="Новая">Новая</option>
                  <option value="В работе">В работе</option>
                  <option value="Завершена">Завершена</option>
                </select>
              </div>

              <div>
                <label htmlFor="modal-assignee" className="block text-sm mb-2 text-gray-700">
                  Исполнитель
                </label>
                <input
                  id="modal-assignee"
                  type="text"
                  value={assignedTo || selectedTicket.assignedTo || ''}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Введите имя исполнителя"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setSelectedTicket(null);
                    setNewStatus('');
                    setAssignedTo('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-2 bg-[#27AE60] text-white rounded-lg hover:bg-[#1e8449] transition-colors"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
