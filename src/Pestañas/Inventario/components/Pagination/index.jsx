const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
          }`}
        >
          Anterior
        </button>
  
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === page
                  ? 'bg-[#ff6b00] text-white'
                  : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
          }`}
        >
          Siguiente
        </button>
      </div>
    );
  };
  
  export default Pagination;