function Paginations({ currentPage, totalPages, onPageChange }) {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px'
          }}>
            {/* Previous Button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              style={{
                margin: '0 10px',
                padding: '5px 15px',
                cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                backgroundColor: '#007BFF',  // Blue color
                color: currentPage <= 1 ? '#aaa' : '#fff',  // Gray out text if disabled
                border: 'none',
                transition: 'background-color 0.3s'  // Smooth transition on hover
              }}
              onMouseEnter={(e) => {
                if (currentPage <= 1) {
                  e.currentTarget.style.backgroundColor = '#0056b3';  // Darker blue
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage <= 1) {
                  e.currentTarget.style.backgroundColor = '#007BFF';  // Original blue
                }
              }}
            >
              Prev
            </button>
  
        {/* Display page numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius: '5px',
                backgroundColor: pageNumber === currentPage ? '#007BFF' : '#f7f7f7',
                color: pageNumber === currentPage ? '#ffffff' : '#000000',
                border: 'none'
              }}
            >
              {pageNumber}
            </button>
          );
        })}
  
        {/* Next Button */}
        <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        style={{
          margin: '0 10px',
          padding: '5px 15px',
          cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
          borderRadius: '5px',
          backgroundColor: '#007BFF',  // Blue color
          color: currentPage >= totalPages ? '#aaa' : '#fff',  // Gray out text if disabled
          border: 'none',
          transition: 'background-color 0.3s'  // Smooth transition on hover
        }}
        onMouseEnter={(e) => {
          if (currentPage >= totalPages) {
            e.currentTarget.style.backgroundColor = '#0056b3';  // Darker blue
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage >= totalPages) {
            e.currentTarget.style.backgroundColor = '#007BFF';  // Original blue
          }
        }}
      >
        Next
      </button>
      </div>
    );
  }
  

  export default Paginations;
