import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { PRODUCTS_DATA } from "@/data/products/products.data";
import { slugify } from "@/lib/slugify";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProductImageSection from "./ProductImageSection";
import ProductInfo from "./ProductInfo";

export default function ProductDetails() {
  const { slug } = useParams();

  const product = PRODUCTS_DATA.products.find((p) => slugify(p.brand || p.name) === slug);

  if (!product) {
    return (
      <PageLayout title="Product Not Found">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-10 text-center"
        >
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">Product not found</h2>
          <p className="mt-4 text-gray-600">Try browsing the <Link to="/products" className="text-blue-600 hover:underline font-semibold">products list</Link>.</p>
        </motion.div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={product.name}>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <ProductImageSection image={product.image} productName={product.name} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <ProductInfo product={product} />
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="p-6 sticky top-24 border-l-4 border-blue-600 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get in Touch</h3>
            <p className="text-sm text-gray-600 mb-6">Have questions about this product? Submit your enquiry below.</p>

            <ProductEnquiryForm productName={product.brand || product.name} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500"
            >
              <p className="font-medium text-gray-700 mb-2">Direct Contact:</p>
              <p>📞 +91 78760 78855</p>
            </motion.div>
          </Card>
        </motion.aside>
      </div>
    </PageLayout>
  );
}

function ProductEnquiryForm({ productName }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, product: productName };
    console.log("Enquiry submitted:", payload);

    setTimeout(() => {
      alert("Thank you! Your enquiry has been submitted. We'll contact you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Input
          name="name"
          placeholder="Full Name *"
          value={form.name}
          onChange={handleChange}
          required
          disabled={loading}
          className="focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
      >
        <Input
          name="email"
          type="email"
          placeholder="Email Address *"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
          className="focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <Input
          name="phone"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={handleChange}
          required
          disabled={loading}
          className="focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        <Textarea
          name="message"
          placeholder={`Your message about ${productName}...`}
          value={form.message}
          onChange={handleChange}
          required
          disabled={loading}
          className="min-h-24 resize-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Enquiry"}
      </motion.button>
    </form>
  );
}
