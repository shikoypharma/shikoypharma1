import { motion } from "framer-motion";

export default function ProductFilters({
  searchQuery="",
  setSearchQuery,
  selectedComposition="all",
  setSelectedComposition,
  uniqueCompositions=[],
  filteredProducts=[],
  paginatedProducts=[],
  onReset,
  setCurrentPage,
}) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCompositionChange = (e) => {
    setSelectedComposition(e.target.value);
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-6 bg-white border border-gray-200 rounded-lg"
    >
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <input
            type="text"
            placeholder="Product name or composition..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Composition
          </label>
          <select
            value={selectedComposition}
            onChange={handleCompositionChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Compositions</option>
            {uniqueCompositions.map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 font-medium">
        Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} (Showing {paginatedProducts.length} on this page)
      </div>
    </motion.div>
  );
}
