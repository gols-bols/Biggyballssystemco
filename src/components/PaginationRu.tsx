interface PaginationRuProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationRu({ currentPage, totalPages, onPageChange }: PaginationRuProps) {
  return (
    <nav role="navigation" aria-label="pagination" className="mx-auto flex w-full justify-center">
      <ul className="flex flex-row items-center gap-1">
        {/* Предыдущая страница */}
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
            className={`inline-flex items-center justify-center gap-1 px-2.5 h-9 rounded-md text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 ${
              currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Назад</span>
          </button>
        </li>

        {/* Номера страниц */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Показываем первую, последнюю, текущую и соседние страницы
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <li key={page}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`inline-flex items-center justify-center size-9 rounded-md text-sm transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'border bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {page}
                </a>
              </li>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <li key={page}>
                <span className="flex size-9 items-center justify-center">
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  <span className="sr-only">Ещё страницы</span>
                </span>
              </li>
            );
          }
          return null;
        })}

        {/* Следующая страница */}
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center justify-center gap-1 px-2.5 h-9 rounded-md text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 ${
              currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }`}
          >
            <span className="hidden sm:inline">Вперед</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
