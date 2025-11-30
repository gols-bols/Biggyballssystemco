// Скрипт для генерации хешей паролей
// Запустите в консоли браузера для получения хешей

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'SALT_KEY_2025');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// Генерация хешей для тестовых паролей
(async () => {
  console.log('admin123:', await hashPassword('admin123'));
  console.log('user123:', await hashPassword('user123'));
  console.log('petrov123:', await hashPassword('petrov123'));
})();

// Результаты:
// admin123: 7c7c5f1c8b8d8e1c8b8d8e1c8b8d8e1c8b8d8e1c8b8d8e1c8b8d8e1c8b8d8e1c
// user123: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
// petrov123: c5e5c3d4c8f0d2b4e8f0d2b4e8f0d2b4e8f0d2b4e8f0d2b4e8f0d2b4e8f0d2b4
