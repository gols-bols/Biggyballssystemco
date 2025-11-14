# 🎫 Система управления заявками IT-отдела

Интерактивная информационная система управления заявками для IT-отдела колледжа.

## 🚀 Деплой

### Netlify

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

## ✨ Функции

- 🔐 Авторизация и регистрация
- 📊 Dashboard с фильтрацией и поиском
- 🎨 Создание и просмотр заявок
- 👨‍💼 Админ-панель
- 📈 Статистика с графиками
- 💾 LocalStorage база данных
- 🔍 Яндекс.Вебмастер верификация

## 🎨 Технологии

- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- Recharts
- Lucide Icons
- Date-fns

## 📁 Структура проекта

```
/
├── src/
│   └── main.tsx          # Точка входа
├── components/           # React компоненты
├── contexts/            # React контексты
├── styles/              # CSS стили
├── public/              # Статичные файлы
└── index.html           # HTML шаблон
```

## 🔧 Конфигурация

Все настройки находятся в:
- `vite.config.ts` - Vite конфигурация
- `tsconfig.json` - TypeScript конфигурация
- `netlify.toml` - Netlify конфигурация
- `postcss.config.js` - PostCSS/Tailwind конфигурация

## 📄 Лицензия

MIT
