import { useMemo } from 'react';
import { Ticket } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface StatisticsProps {
  tickets: Ticket[];
  onBack: () => void;
}

const COLORS = ['#2E86C1', '#F39C12', '#27AE60', '#E74C3C', '#8E44AD', '#16A085'];

export function Statistics({ tickets, onBack }: StatisticsProps) {
  // Расчет статистики
  const statistics = useMemo(() => {
    // Общая статистика
    const totalTickets = tickets.length;
    const newTickets = tickets.filter(t => t.status === 'Новая').length;
    const inProgressTickets = tickets.filter(t => t.status === 'В работе').length;
    const completedTickets = tickets.filter(t => t.status === 'Завершена').length;

    // Процент завершения
    const completionRate = totalTickets > 0 
      ? Math.round((completedTickets / totalTickets) * 100) 
      : 0;

    // Среднее время обработки (в днях) для завершенных заявок
    const completedWithTime = tickets.filter(t => t.status === 'Завершена' && t.updatedAt);
    const avgProcessingTime = completedWithTime.length > 0
      ? Math.round(
          completedWithTime.reduce((acc, ticket) => {
            const created = new Date(ticket.createdAt).getTime();
            const updated = new Date(ticket.updatedAt).getTime();
            const daysDiff = (updated - created) / (1000 * 60 * 60 * 24);
            return acc + daysDiff;
          }, 0) / completedWithTime.length
        )
      : 0;

    // Статистика по категориям
    const categoryStats = tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Статистика по приоритетам
    const priorityStats = tickets.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Статистика по статусам
    const statusStats = {
      'Новая': newTickets,
      'В работе': inProgressTickets,
      'Завершена': completedTickets,
    };

    // Активность по дням (последние 7 дней)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const dailyActivity = last7Days.map(date => {
      const count = tickets.filter(t => {
        const ticketDate = new Date(t.createdAt).toISOString().split('T')[0];
        return ticketDate === date;
      }).length;
      
      return {
        date: new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
        count,
      };
    });

    // Топ-5 авторов по количеству заявок
    const authorStats = tickets.reduce((acc, ticket) => {
      acc[ticket.author] = (acc[ticket.author] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topAuthors = Object.entries(authorStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([author, count]) => ({ author, count }));

    return {
      totalTickets,
      newTickets,
      inProgressTickets,
      completedTickets,
      completionRate,
      avgProcessingTime,
      categoryStats,
      priorityStats,
      statusStats,
      dailyActivity,
      topAuthors,
    };
  }, [tickets]);

  // Данные для круговой диаграммы (категории)
  const categoryChartData = Object.entries(statistics.categoryStats).map(([name, value]) => ({
    name,
    value,
  }));

  // Данные для круговой диаграммы (приоритеты)
  const priorityChartData = Object.entries(statistics.priorityStats).map(([name, value]) => ({
    name,
    value,
  }));

  // Данные д��я столбчатой диаграммы (статусы)
  const statusChartData = Object.entries(statistics.statusStats).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      {/* Заголовок */}
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
          <h1 className="text-3xl">Статистика и аналитика</h1>
          <p className="text-gray-500">Подробная информация о заявках</p>
        </div>
      </div>

      {/* Ключевые показатели */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Всего заявок</p>
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-4xl mb-1">{statistics.totalTickets}</p>
          <p className="text-xs text-gray-500">Всего создано</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Процент завершения</p>
            <svg className="w-8 h-8 text-[#27AE60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-4xl mb-1 text-[#27AE60]">{statistics.completionRate}%</p>
          <p className="text-xs text-gray-500">
            {statistics.completedTickets} из {statistics.totalTickets}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Среднее время</p>
            <svg className="w-8 h-8 text-[#F39C12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-4xl mb-1 text-[#F39C12]">{statistics.avgProcessingTime}</p>
          <p className="text-xs text-gray-500">Дней на обработку</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Активные заявки</p>
            <svg className="w-8 h-8 text-[#2E86C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-4xl mb-1 text-[#2E86C1]">
            {statistics.newTickets + statistics.inProgressTickets}
          </p>
          <p className="text-xs text-gray-500">Новые + В работе</p>
        </div>
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Статистика по статусам */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="mb-4">Распределение по статусам</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2E86C1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Статистика по категориям */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="mb-4">Распределение по категориям</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Активность по дням */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="mb-4">Активность за последние 7 дней</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statistics.dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#27AE60" 
                strokeWidth={2}
                name="Количество заявок"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Статистика по приоритетам */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="mb-4">Распределение по приоритетам</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Топ авторов */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="mb-4">Топ-5 авторов по количеству заявок</h3>
        <div className="space-y-3">
          {statistics.topAuthors.map((author, index) => (
            <div key={author.author} className="flex items-center gap-4">
              <div className="w-8 h-8 bg-[#2E86C1] text-white rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span>{author.author}</span>
                  <span className="text-sm text-gray-500">{author.count} заявок</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#2E86C1] h-2 rounded-full"
                    style={{
                      width: `${(author.count / statistics.totalTickets) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Детальная таблица статистики */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3>Детальная статистика</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Показатель</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Значение</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Описание</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Всего заявок</td>
                <td className="px-6 py-4 whitespace-nowrap">{statistics.totalTickets}</td>
                <td className="px-6 py-4 text-sm text-gray-500">Общее количество заявок в системе</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Новые заявки</td>
                <td className="px-6 py-4 whitespace-nowrap text-[#2E86C1]">{statistics.newTickets}</td>
                <td className="px-6 py-4 text-sm text-gray-500">Заявки ожидающие обработки</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Заявки в работе</td>
                <td className="px-6 py-4 whitespace-nowrap text-[#F39C12]">{statistics.inProgressTickets}</td>
                <td className="px-6 py-4 text-sm text-gray-500">Заявки на которыми ведется работа</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Завершенные заявки</td>
                <td className="px-6 py-4 whitespace-nowrap text-[#27AE60]">{statistics.completedTickets}</td>
                <td className="px-6 py-4 text-sm text-gray-500">Успешно завершенные заявки</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Процент завершения</td>
                <td className="px-6 py-4 whitespace-nowrap">{statistics.completionRate}%</td>
                <td className="px-6 py-4 text-sm text-gray-500">Доля завершенных заявок от общего числа</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Среднее время обработки</td>
                <td className="px-6 py-4 whitespace-nowrap">{statistics.avgProcessingTime} дней</td>
                <td className="px-6 py-4 text-sm text-gray-500">Среднее время от создания до завершения</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
