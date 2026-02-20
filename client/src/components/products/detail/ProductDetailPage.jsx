import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { Card } from "@/components/ui/card";

export default function ProductDetailPage() {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Product by Slug
        const { data: prodData } = await axios.get(`/api/products/slug/${slug}`);
        setProduct(prodData);

        // 2. Fetch Category Data (optional, for context)
        // If we have category name from params, we can try to fetch category details
        if (category) {
          try {
            const { data: catData } = await axios.get(`/api/product-categories/slug/${category}`);
            setCategoryData(catData);
          } catch (err) {
            console.warn("Category fetch failed", err);
            // Fallback: create minimal category object from product data if available
            if (prodData && prodData.category) {
              setCategoryData({ name: prodData.category });
            }
          }
        }

        // 3. Fetch Related Products (same category)
        if (prodData && prodData.category) {
          const { data: related } = await axios.get(`/api/products/category/${encodeURIComponent(prodData.category)}`);
          setRelatedProducts(related.filter(p => p._id !== prodData._id));
        }

      } catch (error) {
        console.error("Error fetching product details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, category]);


  if (loading) {
    return (
      <PageLayout title="Loading...">
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading product details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!product) {
    return (
      <PageLayout title="Product Not Found">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-10 text-center space-y-4"
        >
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
            Product not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            ← Go Back
          </button>
        </motion.div>
      </PageLayout>
    );
  }

  // Fallback category name if categoryData is missing
  const categoryName = categoryData?.name || product.category || category;

  return (
    <PageLayout title={product.name}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 text-sm text-gray-600"
        >
          <button
            onClick={() => navigate("/products")}
            className="hover:text-blue-600 transition-colors"
          >
            Products
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(`/products/${category}`)}
            className="hover:text-blue-600 transition-colors"
          >
            {categoryName}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 overflow-hidden border-l-4 border-blue-600 sticky top-24">
              <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={product.images?.[0] || "/product-placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/product-placeholder.png";
                  }}
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >

            <div>
              <p className="text-sm font-medium text-blue-600 mb-2">
                {categoryName}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-base text-gray-700">{product.composition}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <span className="text-sm font-medium text-blue-600">
                Putups: {product.packing || "N/A"}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                About {product.name}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description || `${product.name} is a high-quality pharmaceutical product designed for ${categoryName?.toLowerCase() || 'general'} use. It contains ${product.composition}.`}
              </p>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Overview
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {categoryData?.description || "This product is part of our extensive range of high-quality pharmaceutical formulations."}
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => navigate(`/products/${category}`)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              ← Back to {categoryName}
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
            Other products in {categoryName}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 8).map((relatedProduct, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => {
                  const productSlug = relatedProduct.slug || relatedProduct.name.toLowerCase().replace(/\s+/g, "-");
                  navigate(`/products/${category}/${productSlug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <Card className="p-4 h-full overflow-hidden border-l-4 border-blue-600 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-full h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mb-3">
                    <img
                      src={relatedProduct.images?.[0] || "/product-placeholder.png"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/product-placeholder.png";
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-1">
                    {relatedProduct.composition}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
