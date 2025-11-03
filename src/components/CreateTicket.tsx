import { useState } from 'react';
import { Ticket } from '../types';

interface CreateTicketProps {
  onBack: () => void;
  onSave: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => void;
  currentUser: string;
}

export function CreateTicket({ onBack, onSave, currentUser }: CreateTicketProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !priority) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const newTicket = {
      title,
      description,
      category,
      priority,
      status: 'Новая' as const,
      author: currentUser,
      assignedTo: null,
    };

    onSave(newTicket);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
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
          <h1 className="text-3xl">Создание новой заявки</h1>
          <p className="text-gray-500">Заполните форму для создания заявки в IT-отдел</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-xl mb-2">Информация о заявке</h3>
          <p className="text-sm text-gray-600">Все поля обязательны для заполнения</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm text-gray-700">
              Тема заявки *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Краткое описание проблемы"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm text-gray-700">
              Описание *
            </label>
            <textarea
              id="description"
              placeholder="Подробное описание проблемы или запроса..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm text-gray-700">
                Категория *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
                required
              >
                <option value="">Выберите категорию</option>
                <option value="Оборудование">Оборудование</option>
                <option value="Доступы">Доступы</option>
                <option value="Программное обеспечение">Программное обеспечение</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="block text-sm text-gray-700">
                Приоритет *
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none"
                required
              >
                <option value="">Выберите приоритет</option>
                <option value="Низкий">Низкий</option>
                <option value="Средний">Средний</option>
                <option value="Высокий">Высокий</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="mb-2 text-blue-900">Информация о создателе</h4>
            <p className="text-sm text-blue-800">Автор: {currentUser}</p>
            <p className="text-sm text-blue-800">Дата: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-[#27AE60] text-white rounded-lg hover:bg-[#1e8449] transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Создать заявку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
