import { useState } from 'react';
import { Ticket } from '../types';

interface TicketDetailsProps {
  ticket: Ticket;
  onBack: () => void;
  onUpdate: (id: number, updates: Partial<Ticket>) => void;
  isAdmin: boolean;
}

export function TicketDetails({ ticket, onBack, onUpdate, isAdmin }: TicketDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(ticket.status);
  const [comment, setComment] = useState('');

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

  const handleUpdateStatus = () => {
    const newHistory = [
      ...ticket.history,
      {
        timestamp: new Date().toISOString(),
        action: `Статус изменен на "${editedStatus}"`,
        user: 'Администратор',
      },
    ];

    onUpdate(ticket.id, {
      status: editedStatus,
      updatedAt: new Date().toISOString(),
      history: newHistory,
    });

    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (!comment.trim()) {
      alert('Комментарий не может быть пустым');
      return;
    }

    const newHistory = [
      ...ticket.history,
      {
        timestamp: new Date().toISOString(),
        action: `Добавлен комментарий: ${comment}`,
        user: 'Текущий пользователь',
      },
    ];

    onUpdate(ticket.id, {
      updatedAt: new Date().toISOString(),
      history: newHistory,
    });

    setComment('');
  };

  const handleCloseTicket = () => {
    const newHistory = [
      ...ticket.history,
      {
        timestamp: new Date().toISOString(),
        action: 'Заявка закрыта',
        user: 'Администратор',
      },
    ];

    onUpdate(ticket.id, {
      status: 'Завершена',
      updatedAt: new Date().toISOString(),
      history: newHistory,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
            <h1 className="text-3xl">Заявка #{ticket.id}</h1>
            <p className="text-gray-500">Подробная информация о заявке</p>
          </div>
        </div>
        {isAdmin && ticket.status !== 'Завершена' && (
          <button
            onClick={handleCloseTicket}
            className="px-4 py-2 bg-[#27AE60] text-white rounded-lg hover:bg-[#1e8449] transition-colors shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Закрыть заявку
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка - Основная информация */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <h2 className="text-2xl mb-2">{ticket.title}</h2>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                  {ticket.category}
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="mb-2 text-gray-600">Описание</h3>
              <p className="whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>

          {/* Комментарии */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Комментарии
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="comment" className="block text-sm text-gray-700">
                  Добавить комментарий
                </label>
                <textarea
                  id="comment"
                  placeholder="Введите ваш комментарий..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none resize-none"
                />
                <button
                  onClick={handleAddComment}
                  className="w-full px-4 py-2 bg-[#2E86C1] text-white rounded-lg hover:bg-[#1F618D] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Добавить комментарий
                </button>
              </div>
            </div>
          </div>

          {/* История */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              История изменений
            </h3>
            <div className="space-y-4">
              {ticket.history.map((entry, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-[#2E86C1] rounded-full"></div>
                    {index !== ticket.history.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm">{entry.action}</p>
                    <p className="text-xs text-gray-500">
                      {entry.user} • {new Date(entry.timestamp).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка - Детали */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="mb-4">Информация</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Автор</span>
                </div>
                <p>{ticket.author}</p>
              </div>

              <div className="border-t border-gray-200 my-2"></div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Исполнитель</span>
                </div>
                <p>{ticket.assignedTo || 'Не назначен'}</p>
              </div>

              <div className="border-t border-gray-200 my-2"></div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Создана</span>
                </div>
                <p>{new Date(ticket.createdAt).toLocaleString('ru-RU')}</p>
              </div>

              <div className="border-t border-gray-200 my-2"></div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Обновлена</span>
                </div>
                <p>{new Date(ticket.updatedAt).toLocaleString('ru-RU')}</p>
              </div>
            </div>
          </div>

          {/* Управление статусом (только для админа) */}
          {isAdmin && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="mb-4">Управление статусом</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-4 py-2 bg-[#2E86C1] text-white rounded-lg hover:bg-[#1F618D] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Изменить статус
                </button>
              ) : (
                <div className="space-y-3">
                  <label htmlFor="status" className="block text-sm text-gray-700">
                    Новый статус
                  </label>
                  <select
                    id="status"
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
                  >
                    <option value="Новая">Новая</option>
                    <option value="В работе">В работе</option>
                    <option value="Завершена">Завершена</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateStatus}
                      className="flex-1 px-4 py-2 bg-[#27AE60] text-white rounded-lg hover:bg-[#1e8449] transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Сохранить
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
