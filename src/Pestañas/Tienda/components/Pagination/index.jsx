import { memo } from 'react';

const Pagination = memo(function Pagination({ currentPage, totalPages, onPageChange, totalItems }) {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === 1 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
          }`}
        >
          Anterior
        </button>

        {getPageNumbers().map((pageNum, index) => (
          <button
            key={index}
            onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
            className={`w-10 h-10 rounded-lg transition-colors ${
              pageNum === currentPage
                ? 'bg-[#ff6b00] text-white'
                : pageNum === '...'
                ? 'bg-transparent text-white cursor-default'
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === totalPages
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
          }`}
        >
          Siguiente
        </button>
      </div>
      <div className="text-gray-400 text-sm">
        Mostrando {Math.min(currentPage * 14, totalItems)} de {totalItems} items
      </div>
    </div>
  );
});

export default Pagination;
