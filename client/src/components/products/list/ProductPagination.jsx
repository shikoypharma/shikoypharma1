import { motion } from "framer-motion";

export default function ProductPagination({ currentPage, totalPages, onPageChange }) {
  const handlePreviousClick = () => {
    onPageChange(Math.max(1, currentPage - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextClick = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageClick = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 flex justify-center items-center gap-2"
    >
      {/* Previous Button */}
      <button
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        ← Previous
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-2 rounded-lg font-medium transition-all ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </motion.div>
  );
}
