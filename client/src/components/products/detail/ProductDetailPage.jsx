import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { Card } from "@/components/ui/card";
import { PRODUCT_CATEGORIES_DATA } from "@/data/products/productCategories.data";

export default function ProductDetailPage() {
  const { category, slug } = useParams();
  const navigate = useNavigate();

  const categoryData = PRODUCT_CATEGORIES_DATA[category];
  const product = categoryData?.products?.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!categoryData || !product) {
    return (
      <PageLayout title="Product Not Found">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 text-center space-y-4"
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

  return (
    <PageLayout title={product.name}>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
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
            {categoryData.name}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 overflow-hidden border-l-4 border-blue-600 sticky top-24">
              <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </Card>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title and Category */}
            <div>
              <p className="text-sm font-medium text-blue-600 mb-2">
                {categoryData.name}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-base text-gray-700">{product.composition}</p>
            </div>

            {/* Strength Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <span className="text-sm font-medium text-blue-600">
                Strength: {product.strength}
              </span>
            </motion.div>

            {/* About Product */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                About {product.name}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.name} is a {product.strength} formulation of{" "}
                {product.composition}. It belongs to the{" "}
                <span className="font-medium text-blue-600">
                  {categoryData.name}
                </span>{" "}
                category of medications.
              </p>
            </motion.div>

            {/* Category Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What are {categoryData.name.toLowerCase()}?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {categoryData.description}
              </p>
            </motion.div>

            {/* How It Works */}
            {categoryData.howItWorks && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-green-50 rounded-lg border-l-4 border-green-600"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How does it work?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {categoryData.howItWorks}
                </p>
              </motion.div>
            )}

            {/* Benefits */}
            {categoryData.benefits && categoryData.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-600"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-2">
                  {categoryData.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => navigate(`/products/${category}`)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              ← Back to {categoryData.name}
            </motion.button>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
            Other products in {categoryData.name}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryData.products?.slice(0, 8).map((relatedProduct, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => {
                  const productSlug = relatedProduct.name
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  navigate(`/products/${category}/${productSlug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <Card className="p-4 h-full overflow-hidden border-l-4 border-blue-600 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                  {relatedProduct.image && (
                    <div className="w-full h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mb-3">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-1">
                    {relatedProduct.strength}
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
