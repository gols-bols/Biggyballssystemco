export function Footer() {
  const handleResetData = () => {
    if (window.confirm('⚠️ Вы уверены, что хотите сбросить все данные?\n\nЭто удалит все заявки и пользователей!')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const styles = {
    footer: {
      background: '#ffffff',
      borderTop: '2px solid #e0e0e0',
      marginTop: 'auto',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '25px 20px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    text: {
      fontSize: '14px',
      color: '#555',
      margin: 0,
    },
    smallText: {
      fontSize: '12px',
      color: '#7f8c8d',
      margin: 0,
    },
    resetButton: {
      background: 'none',
      border: 'none',
      color: '#E74C3C',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontSize: '12px',
      padding: 0,
    },
    social: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    socialText: {
      fontSize: '14px',
      color: '#555',
    },
    socialIcons: {
      display: 'flex',
      gap: '12px',
    },
    socialLink: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      transition: 'all 0.3s',
    },
    vk: {
      background: '#0077FF',
    },
    telegram: {
      background: '#0088CC',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.info}>
          <p style={styles.text}>
            © 2025 Система управления заявками IT-отдела колледжа
          </p>
          <p style={styles.smallText}>
            💾 LocalStorage базаданных •{' '}
            <button
              onClick={handleResetData}
              style={styles.resetButton}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Сбросить данные
            </button>
          </p>
        </div>

        <div style={styles.social}>
          <span style={styles.socialText}>Мы в соцсетях:</span>
          <div style={styles.socialIcons}>
            <a
              href="https://vk.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{...styles.socialLink, ...styles.vk}}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
              aria-label="ВКонтакте"
            >
              <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .373.169.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.492-.085.745-.576.745z"/>
              </svg>
            </a>

            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{...styles.socialLink, ...styles.telegram}}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
              aria-label="Телеграм"
            >
              <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
