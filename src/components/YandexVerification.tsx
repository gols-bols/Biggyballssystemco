import { useEffect } from 'react';

export function YandexVerification() {
  useEffect(() => {
    // Добавляем мета-тег для верификации Яндекс.Вебмастера
    const metaTag = document.createElement('meta');
    metaTag.name = 'yandex-verification';
    metaTag.content = '9653b135babb0503';
    document.head.appendChild(metaTag);

    // Очистка при размонтировании
    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

  return null;
}
