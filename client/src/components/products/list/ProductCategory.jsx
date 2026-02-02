import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { Card } from "@/components/ui/card";
import { PRODUCT_CATEGORIES_DATA } from "@/data/products/productCategories.data";
import ProductFilters from "./ProductFilters";
import ProductPagination from "./ProductPagination";

export default function ProductCategory() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComposition, setSelectedComposition] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  const categoryData = PRODUCT_CATEGORIES_DATA[category];

  const uniqueCompositions = useMemo(() => {
    if (!categoryData?.products) return [];
    return [...new Set(categoryData.products.map((p) => p.composition))];
  }, [categoryData]);

  const filteredProducts = useMemo(() => {
    if (!categoryData?.products) return [];
    
    return categoryData.products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.composition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesComposition = selectedComposition === "all" || product.composition === selectedComposition;
      return matchesSearch && matchesComposition;
    });
  }, [categoryData, searchQuery, selectedComposition]);


  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedComposition("all");
    setCurrentPage(1);
  };

  if (!categoryData) {
    return (
      <PageLayout title="Category Not Found">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 text-center"
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
          selectedComposition={selectedComposition}
          setSelectedComposition={setSelectedComposition}
          uniqueCompositions={uniqueCompositions}
          filteredProducts={filteredProducts}
          paginatedProducts={paginatedProducts}
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
                  const productSlug = product.name.toLowerCase().replace(/\s+/g, "-");
                  navigate(`/products/${category}/${productSlug}`);
                }}
              >
                {product.image && (
                  <div className="w-full h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23e5e7eb' width='200' height='200'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
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
                    {product.strength}
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
            className="py-16 text-center"
          >
            <p className="text-xl text-gray-600 font-medium">No products found matching your filters.</p>
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
