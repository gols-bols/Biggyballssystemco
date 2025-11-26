import { useState } from 'react';

export function CreateTicket({ onBack, onSave, currentUser }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
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
      status: 'Новая',
      author: currentUser,
      assignedTo: null,
    };

    onSave(newTicket);
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '30px 20px',
      fontFamily: 'Roboto, sans-serif',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '30px',
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
      fontSize: '28px',
      fontWeight: '700',
      fontFamily: 'Montserrat, sans-serif',
      color: '#2c3e50',
      margin: '0 0 5px 0',
    },
    subtitle: {
      fontSize: '14px',
      color: '#7f8c8d',
      margin: 0,
    },
    card: {
      background: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      padding: '30px',
      border: '1px solid #e0e0e0',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
    },
    required: {
      color: '#E74C3C',
      marginLeft: '4px',
    },
    input: {
      padding: '12px 16px',
      fontSize: '14px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.3s',
      fontFamily: 'Roboto, sans-serif',
    },
    textarea: {
      padding: '12px 16px',
      fontSize: '14px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      resize: 'vertical',
      fontFamily: 'Roboto, sans-serif',
      minHeight: '120px',
    },
    select: {
      padding: '12px 16px',
      fontSize: '14px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.3s',
      fontFamily: 'Roboto, sans-serif',
      background: '#ffffff',
      cursor: 'pointer',
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '10px',
    },
    button: {
      flex: 1,
      padding: '14px 20px',
      fontSize: '15px',
      fontWeight: '600',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontFamily: 'Roboto, sans-serif',
    },
    submitButton: {
      background: '#27AE60',
      color: '#ffffff',
      border: '2px solid #27AE60',
      boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)',
    },
  };

  return (
    <div style={styles.container}>
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
        <div>
          <h1 style={styles.title}>✍️ Создание заявки</h1>
          <p style={styles.subtitle}>Заполните форму для создания заявки в IT-отдел</p>
        </div>
      </div>

      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="title" style={styles.label}>
              Тема заявки<span style={styles.required}>*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              style={styles.input}
              placeholder="Кратко опишите проблему"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="description" style={styles.label}>
              Описание<span style={styles.required}>*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              style={styles.textarea}
              placeholder="Подробно опишите проблему..."
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="category" style={styles.label}>
              Категория<span style={styles.required}>*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              style={styles.select}
              required
            >
              <option value="">Выберите категорию</option>
              <option value="Оборудование">Оборудование</option>
              <option value="Доступы">Доступы</option>
              <option value="Программное обеспечение">Программное обеспечение</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="priority" style={styles.label}>
              Приоритет<span style={styles.required}>*</span>
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              onFocus={(e) => e.target.style.border = '2px solid #2E86C1'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              style={styles.select}
              required
            >
              <option value="">Выберите приоритет</option>
              <option value="Низкий">Низкий</option>
              <option value="Средний">Средний</option>
              <option value="Высокий">Высокий</option>
            </select>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={onBack}
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.background = '#f5f5f5';
                e.target.style.borderColor = '#E74C3C';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = '#e0e0e0';
              }}
            >
              Отмена
            </button>
            <button
              type="submit"
              style={{...styles.button, ...styles.submitButton}}
              onMouseEnter={(e) => e.target.style.background = '#1e8449'}
              onMouseLeave={(e) => e.target.style.background = '#27AE60'}
            >
              ✅ Создать заявку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
