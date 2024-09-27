import { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPaginationItems = () => {
    const items = [];

    // Add "Previous" button
    if (currentPage > 1) {
      items.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Prev
        </button>
      );
    }

    // Show page numbers only on larger screens
    if (!isSmallScreen) {
      // Calculate start and end page
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);

      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }

      // Add page numbers
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-2 px-4 py-2 rounded ${
              currentPage === i
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {i}
          </button>
        );
      }
    }

    // Add "Next" button
    if (currentPage < totalPages) {
      items.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      );
    }

    return items;
  };

  return <div className="flex justify-center my-4">{getPaginationItems()}</div>;
};

export default Pagination;
