export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: 'Оборудование' | 'Доступы' | 'Программное обеспечение';
  priority: 'Низкий' | 'Средний' | 'Высокий';
  status: 'Новая' | 'В работе' | 'Завершена';
  author: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  history: HistoryItem[];
}

export interface HistoryItem {
  timestamp: string;
  action: string;
  user: string;
}

export interface User {
  username: string;
  displayName: string;
  role: 'admin' | 'user';
}

export type Page = 'login' | 'dashboard' | 'create' | 'details' | 'admin' | 'statistics';
