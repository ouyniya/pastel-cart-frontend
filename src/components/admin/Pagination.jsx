const Pagination = ({ currentPage, totalPages, onSuccess, setCurrentPage }) => {
  return (
    <div className="join mt-4 self-center">
      <button className="join-item btn btn-sm" onClick={() => {
        const nextPage = currentPage > 1 ? currentPage - 1 : 1;
        onSuccess?.(nextPage);
        setCurrentPage(nextPage);
      }} disabled={currentPage === 1}>
        {"<"}
      </button>

      {totalPages <= 2
        ? Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page} className={`join-item btn btn-sm ${currentPage === page ? "btn-neutral" : ""}`} onClick={() => {
              setCurrentPage(page);
              onSuccess?.(page);
            }}>{page}</button>
          ))
        : [currentPage === totalPages ? 1 : currentPage, "...", totalPages].map((page) => (
            <button key={page} className={`join-item btn btn-sm ${currentPage === page ? "btn-neutral" : ""}`} onClick={() => {
              if (page !== "...") {
                setCurrentPage(page);
                onSuccess?.(page);
              }
            }} disabled={page === "..."}>{page}</button>
          ))
      }

      <button className="join-item btn btn-sm" onClick={() => {
        const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
        onSuccess?.(nextPage);
        setCurrentPage(nextPage);
      }} disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
