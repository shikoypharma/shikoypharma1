import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { Card } from "@/components/ui/card";
import ProductFilters from "./ProductFilters";
import ProductPagination from "./ProductPagination";

export default function ProductCategory() {
  const { category: categorySlug } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComposition, setSelectedComposition] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Category Details by Slug
        const { data: catData } = await axios.get(`/api/product-categories/slug/${categorySlug}`);
        setCategoryData(catData);

        // 2. Fetch Products by Category Name (assuming product.category matches categoryData.name)
        if (catData) {
          const { data: prodData } = await axios.get(`/api/products/category/${encodeURIComponent(catData.name)}`);
          setProducts(prodData);
        }
      } catch (error) {
        console.error("Error fetching category or products", error);
        // If category not found by slug, it might be a direct category name match attempt or handle error
      }
      setLoading(false);
    };
    fetchData();
  }, [categorySlug]);

  const uniqueCompositions = useMemo(() => {
    if (!products) return [];
    // Ensure composition exists
    return [...new Set(products.filter(p => p.composition).map((p) => p.composition))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.composition && product.composition.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesComposition = selectedComposition === "all" || product.composition === selectedComposition;
      return matchesSearch && matchesComposition;
    });
  }, [products, searchQuery, selectedComposition]);


  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedComposition("all");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <PageLayout title="Loading...">
        <div className="p-20 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!categoryData) {
    return (
      <PageLayout title="Category Not Found">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-10 text-center"
        >
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">Category not found</h2>
        </motion.div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={categoryData.name}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 space-y-6"
      >
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            What are {categoryData.name.toLowerCase()}?
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {categoryData.description}
          </p>
        </div>

        {categoryData.howItWorks && (
          <div className="space-y-4 mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold text-gray-900">How do {categoryData.name.toLowerCase()} work?</h3>
            <p className="text-gray-700 leading-relaxed">
              {categoryData.howItWorks}
            </p>
          </div>
        )}

        {categoryData.benefits && categoryData.benefits.length > 0 && (
          <div className="space-y-4 mt-8">
            <h3 className="text-2xl font-bold text-gray-900">What are the potential benefits?</h3>
            <ul className="space-y-3">
              {categoryData.benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="text-green-500 font-bold mt-1 shrink-0">✓</span>
                  <span className="text-base leading-relaxed">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Our {categoryData.name} Products
        </h2>

        <ProductFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showCompositionFilter={true}
          selectedComposition={selectedComposition}
          setSelectedComposition={setSelectedComposition}
          compositions={uniqueCompositions}
          filteredCount={filteredProducts.length}
          paginatedCount={paginatedProducts.length}
          onReset={handleReset}
          setCurrentPage={setCurrentPage}
        />

        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts?.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    className="p-0 h-full overflow-hidden border-l-4 border-blue-600 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => {
                      // Assuming product detail page still matches
                      const productSlug = product.slug || product.name.toLowerCase().replace(/\s+/g, "-");
                      navigate(`/products/${categorySlug}/${productSlug}`);
                    }}
                  >
                    {product.images && product.images.length > 0 ? (
                      <div className="w-full h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/product-placeholder.png";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-100 overflow-hidden flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.composition}
                      </p>
                      <p className="text-xs font-medium text-blue-600 pt-2 border-t border-gray-100">
                        {product.brand || ""}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-10 text-center"
          >
            <p className="text-xl text-gray-600 font-medium">No products found for this category.</p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </motion.div>
    </PageLayout>
  );
}
