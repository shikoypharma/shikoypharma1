import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { motion } from "framer-motion";
import { slugify } from "@/lib/slugify";
import ProductFilters from "./ProductFilters";
import ProductTableRow from "./ProductTableRow";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products", error);
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.filter(Boolean).sort();
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Filter by Category
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;

      // Filter by Search Query
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.composition && p.composition.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    });
  }, [query, selectedCategory, products]);

  const handleReset = () => {
    setQuery("");
    setSelectedCategory("All");
  };

  if (loading) return <div className="p-10 text-center">Loading products...</div>;

  return (
    <PageLayout title="Our Products">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-blue-50 rounded-lg"
      >
        <p className="text-sm text-gray-700">Browse our product catalog. Use search and filters to quickly find items.</p>
      </motion.div>

      <ProductFilters
        searchQuery={query}
        setSearchQuery={setQuery}
        showCategoryFilter={true}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        filteredCount={filtered.length}
        paginatedCount={filtered.length} // Simplified for now since pagination wasn't fully implemented in parent
        onReset={handleReset}
        setCurrentPage={() => { }}
      />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-linear-to-r from-blue-600 to-blue-700 text-white">
              <th className="px-4 sm:px-6 py-4 text-left font-semibold">Composition</th>
              <th className="px-4 sm:px-6 py-4 text-left font-semibold">Brand Name</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p, idx) => {
                const slug = `/product/${p.slug || slugify(p.name)}`;
                return (
                  <ProductTableRow
                    key={p._id}
                    product={p}
                    slug={slug}
                    index={idx}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-8 text-center text-gray-500">
                  <p className="text-lg font-medium">No products found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
