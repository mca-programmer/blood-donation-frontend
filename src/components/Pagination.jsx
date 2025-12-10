// src/components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map(n => n + 1);

  return (
    <div className="flex space-x-2 justify-center mt-4">
      {pages.map(page => (
        <button
          key={page}
          className={`btn btn-sm ${page === currentPage ? "btn-primary" : "btn-outline"}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
