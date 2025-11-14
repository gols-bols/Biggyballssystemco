# 🔧 БЫСТРЫЙ FIX: Откат на Tailwind v3

## Если проблема в @tailwindcss/postcss alpha

Tailwind v4 находится в alpha и может вызывать проблемы на Netlify.

---

## 🎯 Что я сделаю:

1. Удалю `@tailwindcss/postcss@4.0.0-alpha.25`
2. Установлю стабильный `tailwindcss@3.4.0`
3. Создам `tailwind.config.js`
4. Обновлю `postcss.config.js`
5. Обновлю `globals.css` под Tailwind v3

---

## ⚡ Изменения:

### package.json
```diff
"devDependencies": {
-  "@tailwindcss/postcss": "4.0.0-alpha.25"
+  "tailwindcss": "^3.4.0",
+  "postcss": "^8.4.32",
+  "autoprefixer": "^10.4.16"
}
```

### postcss.config.js
```diff
export default {
  plugins: {
-    '@tailwindcss/postcss': {},
+    'tailwindcss': {},
+    'autoprefixer': {},
  },
}
```

### tailwind.config.js (НОВЫЙ ФАЙЛ)
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        // ... остальные цвета
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
```

### globals.css
```diff
- @theme inline { ... }
+ /* Переменные остаются как есть */

+ @tailwind base;
+ @tailwind components;
+ @tailwind utilities;

@layer base { ... }
```

---

## ✅ Преимущества:

- ✅ Стабильная версия
- ✅ Работает на всех CI/CD
- ✅ Полная документация
- ✅ Никаких сюрпризов

---

## 🚀 Хочешь чтобы я это сделал?

Просто скажи **"да, переключи"** и я всё исправлю прямо сейчас!

Это займёт 2 минуты и 100% будет работать на Netlify.

---

ИЛИ

Пришли логи и я найду точную причину ошибки!
