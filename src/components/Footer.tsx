export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Информация о системе */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              © 2025 Система управления заявками IT-отдела колледжа
            </p>
          </div>

          {/* Социальные сети */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Мы в социальных сетях:</span>
            <div className="flex gap-3">
              {/* ВКонтакте */}
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0077FF] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="ВКонтакте"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .373.169.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.492-.085.745-.576.745z"/>
                </svg>
              </a>

              {/* Телеграм */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0088CC] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Телеграм"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
