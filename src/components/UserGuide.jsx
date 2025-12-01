import { useState } from 'react';

export function UserGuide({ onBack }) {
  const [activeSection, setActiveSection] = useState('intro');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const sections = [
    { id: 'intro', title: '📘 Введение', icon: '📘' },
    { id: 'auth', title: '🔐 Авторизация', icon: '🔐' },
    { id: 'dashboard', title: '🏠 Главная страница', icon: '🏠' },
    { id: 'create', title: '➕ Создание заявки', icon: '➕' },
    { id: 'view', title: '👁️ Просмотр заявок', icon: '👁️' },
    { id: 'notifications', title: '🔔 Уведомления', icon: '🔔' },
    { id: 'admin', title: '⚙️ Админ-панель', icon: '⚙️' },
    { id: 'statistics', title: '📊 Статистика', icon: '📊' },
    { id: 'security', title: '🔒 Безопасность', icon: '🔒' },
    { id: 'faq', title: '❓ FAQ', icon: '❓' },
  ];

  const faqData = [
    {
      q: 'Как сбросить пароль?',
      a: 'В текущей версии системы смена пароля выполняется администратором. Обратитесь в IT-отдел для сброса пароля.',
    },
    {
      q: 'Почему моя заявка еще не взята в работу?',
      a: 'Заявки обрабатываются в порядке приоритета. Высокоприоритетные заявки обрабатываются в первую очередь. Если ваша заявка срочная, установите приоритет "Высокий" при создании.',
    },
    {
      q: 'Могу ли я редактировать уже созданную заявку?',
      a: 'Нет, после создания заявки её нельзя отредактировать. Однако вы можете добавить комментарии или создать новую заявку с уточнениями.',
    },
    {
      q: 'Как долго хранятся данные о заявках?',
      a: 'Все данные хранятся в локальном хранилище браузера бессрочно. При очистке кеша браузера данные будут удалены.',
    },
    {
      q: 'Что делать, если я случайно вышел из системы?',
      a: 'Просто войдите снова, используя свои учетные данные. Все данные сохраняются и будут доступны после повторной авторизации.',
    },
    {
      q: 'Можно ли экспортировать данные?',
      a: 'Да, на странице статистики доступна кнопка "Экспорт данных", которая позволяет выгрузить все заявки в формате JSON.',
    },
    {
      q: 'Как изменить роль с USER на ADMIN?',
      a: 'Используйте кнопку "Сменить роль" в навигационной панели. Это демонстрационная функция для тестирования системы.',
    },
    {
      q: 'Поддерживает ли система мобильные устройства?',
      a: 'Да, система полностью адаптивна и оптимизирована для работы на смартфонах, планшетах и десктопах.',
    },
  ];

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '30px 20px',
      fontFamily: 'Roboto, sans-serif',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    backButton: {
      padding: '10px 18px',
      fontSize: '14px',
      fontWeight: '600',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      background: '#ffffff',
      color: '#555',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    title: {
      fontSize: '36px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      margin: 0,
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: '30px',
      alignItems: 'start',
    },
    sidebar: {
      background: '#ffffff',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: '1px solid #e0e0e0',
      position: 'sticky',
      top: '20px',
    },
    sidebarTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#7f8c8d',
      textTransform: 'uppercase',
      marginBottom: '15px',
      letterSpacing: '0.5px',
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    navItem: {
      padding: '12px 15px',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#2c3e50',
    },
    navItemActive: {
      background: '#2E86C1',
      color: '#ffffff',
    },
    content: {
      background: '#ffffff',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: '1px solid #e0e0e0',
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    sectionSubtitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#2E86C1',
      marginTop: '30px',
      marginBottom: '15px',
    },
    text: {
      fontSize: '15px',
      lineHeight: '1.8',
      color: '#555',
      marginBottom: '15px',
    },
    stepList: {
      listStyle: 'none',
      padding: 0,
      margin: '20px 0',
    },
    step: {
      display: 'flex',
      gap: '15px',
      marginBottom: '20px',
      alignItems: 'flex-start',
    },
    stepNumber: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: '#2E86C1',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: '700',
      flexShrink: 0,
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '8px',
    },
    stepText: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.6',
    },
    infoBox: {
      background: '#EBF5FB',
      border: '2px solid #2E86C1',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      marginBottom: '20px',
    },
    infoBoxTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2E86C1',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    warningBox: {
      background: '#FEF5E7',
      border: '2px solid #F39C12',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      marginBottom: '20px',
    },
    warningBoxTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#F39C12',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    successBox: {
      background: '#EAFAF1',
      border: '2px solid #27AE60',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      marginBottom: '20px',
    },
    successBoxTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#27AE60',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginTop: '20px',
      marginBottom: '20px',
    },
    featureCard: {
      background: '#f8f9fa',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e0e0e0',
    },
    featureIcon: {
      fontSize: '32px',
      marginBottom: '10px',
    },
    featureTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '8px',
    },
    featureText: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.5',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      marginBottom: '20px',
    },
    tableHeader: {
      background: '#f8f9fa',
      borderBottom: '2px solid #e0e0e0',
    },
    tableCell: {
      padding: '12px 15px',
      textAlign: 'left',
      fontSize: '14px',
      color: '#2c3e50',
      borderBottom: '1px solid #f0f0f0',
    },
    tableCellHeader: {
      padding: '12px 15px',
      textAlign: 'left',
      fontSize: '13px',
      fontWeight: '600',
      color: '#7f8c8d',
      textTransform: 'uppercase',
    },
    badge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
    },
    badgeBlue: {
      background: '#E3F2FD',
      color: '#1976D2',
    },
    badgeYellow: {
      background: '#FFF9C4',
      color: '#F57C00',
    },
    badgeGreen: {
      background: '#C8E6C9',
      color: '#388E3C',
    },
    badgeRed: {
      background: '#FFEBEE',
      color: '#C62828',
    },
    faqItem: {
      background: '#f8f9fa',
      borderRadius: '12px',
      marginBottom: '15px',
      border: '1px solid #e0e0e0',
      overflow: 'hidden',
    },
    faqQuestion: {
      padding: '18px 20px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#2c3e50',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background 0.2s',
    },
    faqAnswer: {
      padding: '0 20px 18px',
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.7',
    },
    code: {
      background: '#f8f9fa',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '13px',
      fontFamily: 'monospace',
      color: '#E74C3C',
      border: '1px solid #e0e0e0',
    },
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'intro':
        return (
          <>
            <h2 style={styles.sectionTitle}>📘 Введение</h2>
            <p style={styles.text}>
              Добро пожаловать в <strong>Систему управления заявками IT-отдела колледжа</strong>! 
              Это интерактивная платформа для создания, отслеживания и управления заявками на техническую поддержку.
            </p>

            <div style={styles.infoBox}>
              <div style={styles.infoBoxTitle}>
                💡 Цель системы
              </div>
              <p style={{...styles.text, marginBottom: 0}}>
                Система разработана для оптимизации процесса обработки заявок в IT-отделе, 
                обеспечения прозрачности работы и быстрого решения технических проблем студентов и сотрудников.
              </p>
            </div>

            <h3 style={styles.sectionSubtitle}>🎯 Основные возможности</h3>
            
            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>➕</div>
                <div style={styles.featureTitle}>Создание заявок</div>
                <p style={styles.featureText}>
                  Быстрое создание заявок с выбором категории, приоритета и подробным описанием проблемы.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📊</div>
                <div style={styles.featureTitle}>Отслеживание статуса</div>
                <p style={styles.featureText}>
                  Просматривайте статус своих заявок в реальном времени: новая, в работе, завершена.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔔</div>
                <div style={styles.featureTitle}>Уведомления</div>
                <p style={styles.featureText}>
                  Получайте мгновенные уведомления об изменениях статуса и новых заявках.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>⚙️</div>
                <div style={styles.featureTitle}>Админ-панель</div>
                <p style={styles.featureText}>
                  Управляйте всеми заявками, назначайте исполнителей и изменяйте статусы (для администраторов).
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔐</div>
                <div style={styles.featureTitle}>Безопасность</div>
                <p style={styles.featureText}>
                  SHA-256 хеширование паролей, защита от XSS, rate limiting и автоматический выход.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📱</div>
                <div style={styles.featureTitle}>Адаптивный дизайн</div>
                <p style={styles.featureText}>
                  Работайте с системой на любом устройстве: компьютере, планшете или смартфоне.
                </p>
              </div>
            </div>

            <h3 style={styles.sectionSubtitle}>👥 Роли пользователей</h3>

            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableCellHeader}>Роль</th>
                  <th style={styles.tableCellHeader}>Описание</th>
                  <th style={styles.tableCellHeader}>Возможности</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>
                    <span style={{...styles.badge, ...styles.badgeBlue}}>USER</span>
                  </td>
                  <td style={styles.tableCell}>Обычный пользователь (студент/сотрудник)</td>
                  <td style={styles.tableCell}>Создание и просмотр своих заявок</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>
                    <span style={{...styles.badge, ...styles.badgeGreen}}>ADMIN</span>
                  </td>
                  <td style={styles.tableCell}>Администратор IT-отдела</td>
                  <td style={styles.tableCell}>Полный доступ + управление всеми заявками</td>
                </tr>
              </tbody>
            </table>
          </>
        );

      case 'auth':
        return (
          <>
            <h2 style={styles.sectionTitle}>🔐 Авторизация</h2>
            <p style={styles.text}>
              Для доступа к системе необходимо авторизоваться с использованием учетных данных, 
              предоставленных администратором IT-отдела.
            </p>

            <h3 style={styles.sectionSubtitle}>Вход в систему</h3>

            <ul style={styles.stepList}>
              <li style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Откройте страницу входа</div>
                  <p style={styles.stepText}>
                    При первом посещении системы вы автоматически попадете на страницу авторизации.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Введите логин</div>
                  <p style={styles.stepText}>
                    В поле "Логин" введите ваше имя пользователя (например: <span style={styles.code}>user</span> или <span style={styles.code}>admin</span>).
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Введите пароль</div>
                  <p style={styles.stepText}>
                    В поле "Пароль" введите ваш пароль. Для безопасности символы будут скрыты.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>4</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Нажмите "Войти"</div>
                  <p style={styles.stepText}>
                    После ввода данных нажмите кнопку "Войти в систему". При успешной авторизации вы будете перенаправлены на главную страницу.
                  </p>
                </div>
              </li>
            </ul>

            <div style={styles.infoBox}>
              <div style={styles.infoBoxTitle}>
                🧪 Тестовые учетные записи
              </div>
              <p style={styles.text}>
                Для демонстрации и тестирования доступны следующие аккаунты:
              </p>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.tableCellHeader}>Логин</th>
                    <th style={styles.tableCellHeader}>Пароль</th>
                    <th style={styles.tableCellHeader}>Роль</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.tableCell}><span style={styles.code}>admin</span></td>
                    <td style={styles.tableCell}><span style={styles.code}>admin123</span></td>
                    <td style={styles.tableCell}><span style={{...styles.badge, ...styles.badgeGreen}}>ADMIN</span></td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}><span style={styles.code}>user</span></td>
                    <td style={styles.tableCell}><span style={styles.code}>user123</span></td>
                    <td style={styles.tableCell}><span style={{...styles.badge, ...styles.badgeBlue}}>USER</span></td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}><span style={styles.code}>petrov</span></td>
                    <td style={styles.tableCell}><span style={styles.code}>petrov123</span></td>
                    <td style={styles.tableCell}><span style={{...styles.badge, ...styles.badgeBlue}}>USER</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={styles.warningBox}>
              <div style={styles.warningBoxTitle}>
                ⚠️ Безопасность
              </div>
              <ul style={{...styles.text, marginBottom: 0}}>
                <li>Не передавайте свои учетные данные третьим лицам</li>
                <li>Выходите из системы при завершении работы на общедоступных компьютерах</li>
                <li>Система автоматически выйдет через 30 минут бездействия</li>
                <li>После 5 неудачных попыток входа аккаунт блокируется на 15 минут</li>
              </ul>
            </div>
          </>
        );

      case 'dashboard':
        return (
          <>
            <h2 style={styles.sectionTitle}>🏠 Главная страница (Dashboard)</h2>
            <p style={styles.text}>
              Главная страница — это центр управления системой, где отображается вся ключевая информация о ваших заявках.
            </p>

            <h3 style={styles.sectionSubtitle}>Элементы интерфейса</h3>

            <ul style={styles.stepList}>
              <li style={styles.step}>
                <div style={styles.stepNumber}>📊</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Статистика заявок</div>
                  <p style={styles.stepText}>
                    В верхней части страницы отображаются карточки со статистикой: 
                    общее количество заявок, новые, в работе и завершенные.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>🔍</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Поиск и фильтры</div>
                  <p style={styles.stepText}>
                    Используйте строку поиска и фильтры по статусу, приоритету и категории 
                    для быстрого нахождения нужных заявок.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>📋</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Таблица заявок</div>
                  <p style={styles.stepText}>
                    Основная таблица отображает все ваши заявки с информацией: ID, тема, статус, 
                    приоритет, категория и дата создания. На мобильных устройствах таблица 
                    трансформируется в удобные карточки.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>➕</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Кнопка создания заявки</div>
                  <p style={styles.stepText}>
                    Используйте кнопку "Создать заявку" для подачи новой заявки на техническую поддержку.
                  </p>
                </div>
              </li>
            </ul>

            <div style={styles.successBox}>
              <div style={styles.successBoxTitle}>
                ✅ Быстрые действия
              </div>
              <p style={{...styles.text, marginBottom: 0}}>
                • Кликните на любую заявку для просмотра полной информации<br/>
                • Используйте пагинацию для навигации по страницам<br/>
                • Сбросьте фильтры кнопкой "Сбросить" для просмотра всех заявок
              </p>
            </div>
          </>
        );

      case 'create':
        return (
          <>
            <h2 style={styles.sectionTitle}>➕ Создание заявки</h2>
            <p style={styles.text}>
              Создание заявки — это простой процесс, который позволяет вам быстро сообщить о технической проблеме.
            </p>

            <h3 style={styles.sectionSubtitle}>Пошаговая инструкция</h3>

            <ul style={styles.stepList}>
              <li style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Откройте форму создания</div>
                  <p style={styles.stepText}>
                    Нажмите кнопку "➕ Создать заявку" на главной странице или в меню навигации.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Введите тему заявки</div>
                  <p style={styles.stepText}>
                    Кратко опишите суть проблемы (минимум 5 символов). 
                    Например: "Не работает проектор в аудитории 301".
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Опишите проблему подробно</div>
                  <p style={styles.stepText}>
                    Предоставьте максимально подробную информацию о проблеме (минимум 10 символов). 
                    Укажите шаги для воспроизведения, сообщения об ошибках и другие важные детали.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>4</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Выберите категорию</div>
                  <p style={styles.stepText}>
                    Выберите подходящую категорию из списка:
                    <br/>• <strong>Оборудование</strong> — проблемы с техникой
                    <br/>• <strong>Доступы</strong> — проблемы с доступом к системам
                    <br/>• <strong>Программное обеспечение</strong> — проблемы с ПО
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>5</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Установите приоритет</div>
                  <p style={styles.stepText}>
                    Выберите приоритет заявки:
                    <br/>• <span style={{...styles.badge, ...styles.badgeRed}}>Высокий</span> — критические проблемы, блокирующие работу
                    <br/>• <span style={{...styles.badge, ...styles.badgeYellow}}>Средний</span> — важные проблемы, требующие внимания
                    <br/>• <span style={{...styles.badge, ...styles.badgeGreen}}>Низкий</span> — некритичные проблемы
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>6</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Отправьте заявку</div>
                  <p style={styles.stepText}>
                    Проверьте введенные данные и нажмите кнопку "Создать заявку". 
                    Вы получите уведомление об успешном создании и уникальный номер заявки.
                  </p>
                </div>
              </li>
            </ul>

            <div style={styles.infoBox}>
              <div style={styles.infoBoxTitle}>
                💡 Советы по созданию заявок
              </div>
              <ul style={{...styles.text, marginBottom: 0}}>
                <li>Используйте понятные и информативные темы</li>
                <li>Включайте скриншоты при необходимости (описывайте словами)</li>
                <li>Указывайте номер аудитории или рабочего места</li>
                <li>Опишите, что вы уже пытались сделать для решения проблемы</li>
                <li>Не создавайте дубликаты заявок</li>
              </ul>
            </div>

            <div style={styles.warningBox}>
              <div style={styles.warningBoxTitle}>
                ⚠️ Важно
              </div>
              <p style={{...styles.text, marginBottom: 0}}>
                После создания заявки вы НЕ сможете её отредактировать. Убедитесь, 
                что вся информация указана корректно перед отправкой.
              </p>
            </div>
          </>
        );

      case 'view':
        return (
          <>
            <h2 style={styles.sectionTitle}>👁️ Просмотр заявок</h2>
            <p style={styles.text}>
              Просмотр заявок позволяет вам отслеживать статус и детали ваших обращений в техническую поддержку.
            </p>

            <h3 style={styles.sectionSubtitle}>Статусы заявок</h3>

            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={{...styles.badge, ...styles.badgeBlue, fontSize: '14px', marginBottom: '10px'}}>Новая</div>
                <p style={styles.featureText}>
                  Заявка создана и ожидает принятия в работу специалистом IT-отдела.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={{...styles.badge, ...styles.badgeYellow, fontSize: '14px', marginBottom: '10px'}}>В работе</div>
                <p style={styles.featureText}>
                  Заявка принята специалистом и находится в процессе выполнения.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={{...styles.badge, ...styles.badgeGreen, fontSize: '14px', marginBottom: '10px'}}>Завершена</div>
                <p style={styles.featureText}>
                  Проблема решена, заявка закрыта. Вы можете просмотреть результат работы.
                </p>
              </div>
            </div>

            <h3 style={styles.sectionSubtitle}>Работа с таблицей заявок</h3>

            <ul style={styles.stepList}>
              <li style={styles.step}>
                <div style={styles.stepNumber}>🔍</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Поиск заявок</div>
                  <p style={styles.stepText}>
                    Введите в строку поиска ID заявки, ключевые слова из темы или описания. 
                    Поиск работает в режиме реального времени.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>🎯</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Фильтрация</div>
                  <p style={styles.stepText}>
                    Используйте выпадающие списки для фильтрации по статусу, приоритету и категории. 
                    Можно комбинировать несколько фильтров одновременно.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>📄</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Просмотр деталей</div>
                  <p style={styles.stepText}>
                    Кликните на любую строку в таблице, чтобы открыть модальное окно с подробной информацией о заявке.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>📑</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Пагинация</div>
                  <p style={styles.stepText}>
                    Навигация по страницам доступна в нижней части таблицы. 
                    На одной странице отображается до 10 заявок.
                  </p>
                </div>
              </li>
            </ul>

            <div style={styles.successBox}>
              <div style={styles.successBoxTitle}>
                📱 Мобильная версия
              </div>
              <p style={{...styles.text, marginBottom: 0}}>
                На мобильных устройствах (экран ≤900px) таблица автоматически преобразуется 
                в удобные карточки с полной информацией о каждой заявке.
              </p>
            </div>
          </>
        );

      case 'notifications':
        return (
          <>
            <h2 style={styles.sectionTitle}>🔔 Уведомления</h2>
            <p style={styles.text}>
              Система уведомлений информирует вас о важных событиях в реальном времени.
            </p>

            <h3 style={styles.sectionSubtitle}>Типы уведомлений</h3>

            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>✅</div>
                <div style={styles.featureTitle}>Создание заявки</div>
                <p style={styles.featureText}>
                  Вы получите уведомление при успешном создании новой заявки с её номером.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔄</div>
                <div style={styles.featureTitle}>Изменение статуса</div>
                <p style={styles.featureText}>
                  Уведомление приходит, когда администратор меняет статус вашей заявки.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>👨‍💼</div>
                <div style={styles.featureTitle}>Назначение исполнителя</div>
                <p style={styles.featureText}>
                  Вы узнаете, когда вашей заявке будет назначен ответственный специалист.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🆕</div>
                <div style={styles.featureTitle}>Новая заявка (для админов)</div>
                <p style={styles.featureText}>
                  Администраторы получают уведомления о каждой новой заявке в системе.
                </p>
              </div>
            </div>

            <h3 style={styles.sectionSubtitle}>Центр уведомлений</h3>

            <ul style={styles.stepList}>
              <li style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Открытие центра</div>
                  <p style={styles.stepText}>
                    Нажмите на иконку колокольчика 🔔 в верхней панели навигации. 
                    Красный бейдж показывает количество непрочитанных уведомлений.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Просмотр уведомлений</div>
                  <p style={styles.stepText}>
                    В центре уведомлений отображается список всех уведомлений с временными метками. 
                    Новые уведомления выделены цветом.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Отметка как прочитанное</div>
                  <p style={styles.stepText}>
                    Используйте кнопку "✓ Отметить прочитанным" для отдельного уведомления 
                    или "Прочитать все" для всех уведомлений сразу.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>4</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Очистка истории</div>
                  <p style={styles.stepText}>
                    Кнопка "Очистить всё" удаляет все уведомления из центра.
                  </p>
                </div>
              </li>
            </ul>

            <div style={styles.infoBox}>
              <div style={styles.infoBoxTitle}>
                🔊 Звуковые уведомления
              </div>
              <p style={{...styles.text, marginBottom: 0}}>
                Система воспроизводит звуковой сигнал при получении нового уведомления. 
                Вы можете отключить звук в настройках уведомлений (иконка шестеренки ⚙️).
              </p>
            </div>

            <div style={styles.successBox}>
              <div style={styles.successBoxTitle}>
                ⚙️ Настройки уведомлений
              </div>
              <p style={styles.text}>
                Доступные опции:
              </p>
              <ul style={{...styles.text, marginBottom: 0}}>
                <li><strong>Звук</strong> — включить/выключить звуковые сигналы</li>
                <li><strong>Toast-уведомления</strong> — всплывающие уведомления в углу экрана</li>
                <li><strong>Автопрочтение</strong> — автоматически отмечать уведомления как прочитанные через 5 секунд</li>
              </ul>
            </div>
          </>
        );

      case 'admin':
        return (
          <>
            <h2 style={styles.sectionTitle}>⚙️ Админ-панель</h2>
            <p style={styles.text}>
              Админ-панель предоставляет расширенные возможности управления всеми заявками в системе. 
              Доступна только пользователям с ролью <span style={{...styles.badge, ...styles.badgeGreen}}>ADMIN</span>.
            </p>

            <h3 style={styles.sectionSubtitle}>Возможности администратора</h3>

            <ul style={styles.stepList}>
              <li style={styles.step}>
                <div style={styles.stepNumber}>📊</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Полная статистика</div>
                  <p style={styles.stepText}>
                    Просматривайте общую статистику по всем заявкам в системе: 
                    общее количество, новые, в работе и завершенные.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>🔍</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Расширенный поиск</div>
                  <p style={styles.stepText}>
                    Ищите заявки по ID, теме, описанию, автору или категории. 
                    Комбинируйте несколько фильтров для точного поиска.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>✏️</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Изменение статуса</div>
                  <p style={styles.stepText}>
                    Обновляйте статус любой заявки: Новая → В работе → Завершена. 
                    Пользователь получит уведомление об изменении.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>👤</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Назначение исполнителя</div>
                  <p style={styles.stepText}>
                    Назначайте ответственного специалиста для каждой заявки. 
                    Это помогает распределить нагрузку и отслеживать ответственность.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>📱</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Адаптивный интерфейс</div>
                  <p style={styles.stepText}>
                    На мобильных устройствах таблица превращается в удобные карточки 
                    с полной информацией и возможностью редактирования.
                  </p>
                </div>
              </li>
            </ul>

            <h3 style={styles.sectionSubtitle}>Редактирование заявки</h3>

            <ol style={{...styles.text, marginLeft: '20px'}}>
              <li style={{marginBottom: '10px'}}>
                Найдите нужную заявку в таблице с помощью поиска или фильтров
              </li>
              <li style={{marginBottom: '10px'}}>
                Нажмите кнопку "Изменить" в строке заявки
              </li>
              <li style={{marginBottom: '10px'}}>
                В модальном окне выберите новый статус из выпадающего списка
              </li>
              <li style={{marginBottom: '10px'}}>
                При необходимости введите имя исполнителя
              </li>
              <li style={{marginBottom: '10px'}}>
                Нажмите "Сохранить" для применения изменений
              </li>
            </ol>

            <div style={styles.warningBox}>
              <div style={styles.warningBoxTitle}>
                ⚠️ Важно для администраторов
              </div>
              <ul style={{...styles.text, marginBottom: 0}}>
                <li>Все изменения фиксируются в логах безопасности с отметкой времени</li>
                <li>Пользователь получает уведомление о каждом изменении статуса</li>
                <li>Удаление заявок не предусмотрено для сохранения истории</li>
                <li>Своевременно обновляйте статусы для улучшения качества обслуживания</li>
              </ul>
            </div>
          </>
        );

      case 'statistics':
        return (
          <>
            <h2 style={styles.sectionTitle}>📊 Статистика</h2>
            <p style={styles.text}>
              Раздел статистики предоставляет визуальное представление данных о заявках 
              с помощью графиков и диаграмм.
            </p>

            <h3 style={styles.sectionSubtitle}>Доступные метрики</h3>

            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📈</div>
                <div style={styles.featureTitle}>Динамика заявок</div>
                <p style={styles.featureText}>
                  Линейный график показывает количество созданных заявок по дням недели.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🥧</div>
                <div style={styles.featureTitle}>Распределение по статусам</div>
                <p style={styles.featureText}>
                  Круговая диаграмма отображает соотношение заявок в разных статусах.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📊</div>
                <div style={styles.featureTitle}>Заявки по категориям</div>
                <p style={styles.featureText}>
                  Столбчатая диаграмма показывает количество заявок по каждой категории.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>⚡</div>
                <div style={styles.featureTitle}>Распределение по приоритету</div>
                <p style={styles.featureText}>
                  Визуализация количества заявок с разными уровнями приоритета.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>👥</div>
                <div style={styles.featureTitle}>Топ авторов</div>
                <p style={styles.featureText}>
                  Список пользователей, создавших наибольшее количество заявок.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>⏱️</div>
                <div style={styles.featureTitle}>Среднее время обработки</div>
                <p style={styles.featureText}>
                  Статистика по времени выполнения заявок для анализа эффективности.
                </p>
              </div>
            </div>

            <h3 style={styles.sectionSubtitle}>Экспорт данных</h3>

            <ul style={styles.stepList}>
              <li style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Нажмите "Экспорт данных"</div>
                  <p style={styles.stepText}>
                    Кнопка расположена в верхней части страницы статистики.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Скачайте файл</div>
                  <p style={styles.stepText}>
                    Система автоматически сгенерирует JSON-файл со всеми заявками 
                    и предложит его скачать.
                  </p>
                </div>
              </li>

              <li style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepTitle}>Используйте данные</div>
                  <p style={styles.stepText}>
                    Экспортированные данные можно использовать для анализа в Excel, 
                    создания отчетов или резервного копирования.
                  </p>
                </div>
              </li>
            </ul>

            <div style={styles.infoBox}>
              <div style={styles.infoBoxTitle}>
                📱 Адаптивная статистика
              </div>
              <p style={{...styles.text, marginBottom: 0}}>
                На мобильных устройствах графики автоматически адаптируются под размер экрана 
                для удобного просмотра. Вы можете взаимодействовать с графиками: 
                наводить курсор для просмотра точных значений.
              </p>
            </div>
          </>
        );

      case 'security':
        return (
          <>
            <h2 style={styles.sectionTitle}>🔒 Безопасность</h2>
            <p style={styles.text}>
              Система управления заявками использует многоуровневую систему безопасности 
              для защиты данных пользователей.
            </p>

            <h3 style={styles.sectionSubtitle}>Механизмы защиты</h3>

            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔐</div>
                <div style={styles.featureTitle}>SHA-256 хеширование</div>
                <p style={styles.featureText}>
                  Все пароли хешируются алгоритмом SHA-256 перед сохранением. 
                  Пароли в открытом виде не хранятся.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🛡️</div>
                <div style={styles.featureTitle}>Защита от XSS</div>
                <p style={styles.featureText}>
                  Все пользовательские данные санитизируются для предотвращения 
                  межсайтового скриптинга.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>⏱️</div>
                <div style={styles.featureTitle}>Rate Limiting</div>
                <p style={styles.featureText}>
                  Ограничение количества попыток входа (5 попыток) 
                  с блокировкой на 15 минут.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>⏰</div>
                <div style={styles.featureTitle}>Автоматический выход</div>
                <p style={styles.featureText}>
                  Система автоматически завершает сеанс после 30 минут бездействия.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📝</div>
                <div style={styles.featureTitle}>Логирование</div>
                <p style={styles.featureText}>
                  Все действия фиксируются в логах безопасности с временными метками.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔑</div>
                <div style={styles.featureTitle}>Валидация данных</div>
                <p style={styles.featureText}>
                  Строгая проверка всех вводимых данных на клиенте и сервере.
                </p>
              </div>
            </div>

            <h3 style={styles.sectionSubtitle}>Логи безопасности</h3>

            <p style={styles.text}>
              Раздел "Логи безопасности" доступен всем пользователям и отображает:
            </p>

            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableCellHeader}>Тип события</th>
                  <th style={styles.tableCellHeader}>Описание</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}><span style={{...styles.badge, ...styles.badgeGreen}}>LOGIN</span></td>
                  <td style={styles.tableCell}>Успешная авторизация</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}><span style={{...styles.badge, ...styles.badgeRed}}>LOGOUT</span></td>
                  <td style={styles.tableCell}>Выход из системы</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}><span style={{...styles.badge, ...styles.badgeBlue}}>TICKET_CREATE</span></td>
                  <td style={styles.tableCell}>Создание новой заявки</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}><span style={{...styles.badge, ...styles.badgeYellow}}>TICKET_UPDATE</span></td>
                  <td style={styles.tableCell}>Изменение заявки администратором</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}><span style={{...styles.badge, ...styles.badgeRed}}>FAILED_LOGIN</span></td>
                  <td style={styles.tableCell}>Неудачная попытка входа</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}><span style={{...styles.badge, ...styles.badgeYellow}}>AUTO_LOGOUT</span></td>
                  <td style={styles.tableCell}>Автоматический выход по таймауту</td>
                </tr>
              </tbody>
            </table>

            <div style={styles.warningBox}>
              <div style={styles.warningBoxTitle}>
                🔒 Рекомендации по безопасности
              </div>
              <ul style={{...styles.text, marginBottom: 0}}>
                <li>Используйте сложные пароли (минимум 8 символов)</li>
                <li>Не используйте один и тот же пароль для разных систем</li>
                <li>Всегда выходите из системы на общедоступных компьютерах</li>
                <li>Не передавайте свои учетные данные другим лицам</li>
                <li>Регулярно проверяйте логи безопасности на наличие подозрительной активности</li>
                <li>Сообщайте администратору о любых проблемах с безопасностью</li>
              </ul>
            </div>

            <div style={styles.infoBox}>
              <div style={styles.infoBoxTitle}>
                ℹ️ Хранение данных
              </div>
              <p style={{...styles.text, marginBottom: 0}}>
                Все данные системы хранятся локально в браузере (localStorage). 
                При очистке кеша браузера данные будут удалены. Для долгосрочного 
                хранения рекомендуется регулярно экспортировать данные.
              </p>
            </div>
          </>
        );

      case 'faq':
        return (
          <>
            <h2 style={styles.sectionTitle}>❓ Часто задаваемые вопросы (FAQ)</h2>
            <p style={styles.text}>
              Ответы на наиболее распространенные вопросы пользователей системы.
            </p>

            <div style={{ marginTop: '30px' }}>
              {faqData.map((item, index) => (
                <div key={index} style={styles.faqItem}>
                  <div
                    style={{
                      ...styles.faqQuestion,
                      background: expandedFaq === index ? '#EBF5FB' : 'transparent',
                    }}
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span style={{ fontSize: '20px', color: '#2E86C1' }}>
                      {expandedFaq === index ? '−' : '+'}
                    </span>
                  </div>
                  {expandedFaq === index && (
                    <div style={styles.faqAnswer}>{item.a}</div>
                  )}
                </div>
              ))}
            </div>

            <div style={styles.successBox}>
              <div style={styles.successBoxTitle}>
                💬 Нужна дополнительная помощь?
              </div>
              <p style={{...styles.text, marginBottom: 0}}>
                Если вы не нашли ответ на свой вопрос, создайте заявку в категории 
                "Программное обеспечение" с подробным описанием проблемы. 
                Специалисты IT-отдела ответят в ближайшее время.
              </p>
            </div>

            <h3 style={styles.sectionSubtitle}>📞 Контакты</h3>

            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📧</div>
                <div style={styles.featureTitle}>Email поддержки</div>
                <p style={styles.featureText}>
                  <span style={styles.code}>support@college-it.ru</span>
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📞</div>
                <div style={styles.featureTitle}>Телефон IT-отдела</div>
                <p style={styles.featureText}>
                  <span style={styles.code}>+7 (495) 123-45-67</span>
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🏢</div>
                <div style={styles.featureTitle}>Кабинет IT-отдела</div>
                <p style={styles.featureText}>
                  Корпус А, 2 этаж, кабинет 205
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>⏰</div>
                <div style={styles.featureTitle}>Режим работы</div>
                <p style={styles.featureText}>
                  Пн-Пт: 9:00 - 18:00<br/>
                  Обед: 13:00 - 14:00
                </p>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @media (max-width: 900px) {
          .guide-layout {
            grid-template-columns: 1fr !important;
          }
          .guide-sidebar {
            position: static !important;
          }
          .guide-content {
            padding: 25px !important;
          }
        }

        @media (max-width: 480px) {
          .guide-title {
            font-size: 28px !important;
          }
          .guide-content {
            padding: 20px !important;
          }
          .guide-section-title {
            font-size: 24px !important;
          }
        }
      `}</style>

      <div style={styles.header}>
        <button
          onClick={onBack}
          style={styles.backButton}
          onMouseEnter={(e) => {
            e.target.style.background = '#f5f5f5';
            e.target.style.borderColor = '#2E86C1';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#ffffff';
            e.target.style.borderColor = '#e0e0e0';
          }}
        >
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>
        <h1 style={styles.title} className="guide-title">📚 Руководство пользователя</h1>
      </div>

      <div style={styles.layout} className="guide-layout">
        <aside style={styles.sidebar} className="guide-sidebar">
          <div style={styles.sidebarTitle}>Содержание</div>
          <ul style={styles.navList}>
            {sections.map(section => (
              <li
                key={section.id}
                style={{
                  ...styles.navItem,
                  ...(activeSection === section.id ? styles.navItemActive : {}),
                }}
                onClick={() => setActiveSection(section.id)}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.target.style.background = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {section.icon} {section.title.replace(/^.+?\s/, '')}
              </li>
            ))}
          </ul>
        </aside>

        <main style={styles.content} className="guide-content guide-section-title">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
