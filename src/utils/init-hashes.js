// Скрипт для генерации хешей паролей
// ЗАПУСТИТЕ ЭТОТ КОД В КОНСОЛИ БРАУЗЕРА

import { hashPassword } from './security.js';

export const generateTestHashes = async () => {
  console.log('=== ГЕНЕРАЦИЯ ХЕШЕЙ ПАРОЛЕЙ ===');
  console.log('');
  
  const passwords = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' },
    { username: 'petrov', password: 'petrov123' }
  ];

  for (const item of passwords) {
    const hash = await hashPassword(item.password);
    console.log(`${item.username} (${item.password}):`);
    console.log(hash);
    console.log('');
  }
};

// Автоматический запуск
if (typeof window !== 'undefined') {
  generateTestHashes();
}
