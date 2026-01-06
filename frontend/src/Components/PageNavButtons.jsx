import React from "react";

export default function PageNavButtons(props) {
  const page = props.page;
  const totalPages = props.totalPages;
  const setPage = props.setPage;
  return (
    <div className="flex justify-center mt-4 items-center">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className="px-4 py-2rounded mr-2"
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-4 py-2 rounded"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
