import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { slugify } from '@/lib/slugify';
import PageLayout from '@/components/layout/pageLayout/pageLayout';
import { SectionHeader } from '@/components/shared/section-components';
import { X, ExternalLink } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const LABELS = ['All', 'Neuro', 'Psychiatric', 'Diabetic', 'Derma', 'Cardiac', 'General'];

export default function ProductGallery() {
    const [searchParams] = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'All');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && LABELS.includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

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

    const filteredProducts = useMemo(() => {
        if (activeTab === 'All') return products;
        return products.filter(p => p.label === activeTab);
    }, [products, activeTab]);

    if (loading) {
        return (
            <PageLayout title="Product Gallery">
                <div className="p-20 text-center">Loading gallery...</div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="Product Gallery">
            <section className="py-1">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Product Showcase" subtitle="Explore our wide range of pharmaceutical products." />

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {LABELS.map((label) => (
                            <button
                                key={label}
                                onClick={() => setActiveTab(label)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === label
                                    ? "bg-blue-600 text-white shadow-lg scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product._id || index}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer aspect-square bg-white border border-gray-100"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    {/* Image */}
                                    <div className="absolute inset-0 p-4 flex items-center justify-center bg-white">
                                        <img
                                            src={product.images?.[0] || ""}
                                            alt={product.name}
                                            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.onerror = null; // Prevent infinite loop
                                                e.target.src = "/product-placeholder.png";
                                            }}
                                        />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                                        <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
                                        <p className="text-gray-200 text-xs mb-3">{product.composition}</p>
                                        <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                                            {product.label || "General"}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-gray-500">
                            <p className="text-xl">No products found in {activeTab}.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
                            onClick={() => setSelectedProduct(null)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
                                <img
                                    src={selectedProduct.images?.[0]}
                                    alt={selectedProduct.name}
                                    className="max-w-full max-h-[50vh] md:max-h-[60vh] object-contain drop-shadow-lg"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/product-placeholder.png";
                                    }}
                                />
                            </div>

                            {/* Info Section */}
                            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                                <div className="mb-auto">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase rounded-full tracking-wider">
                                            {selectedProduct.label || "General"}
                                        </span>
                                        <span className="text-gray-400 text-xs">|</span>
                                        <span className="text-gray-500 text-xs font-medium">
                                            {selectedProduct.category}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                        {selectedProduct.name}
                                    </h2>
                                    <p className="text-blue-600 font-medium text-lg mb-6">
                                        {selectedProduct.composition}
                                    </p>

                                    <div className="space-y-4 text-gray-600">
                                        {selectedProduct.description && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Description</h4>
                                                <p className="text-sm leading-relaxed">{selectedProduct.description}</p>
                                            </div>
                                        )}
                                        {selectedProduct.packing && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Packing</h4>
                                                <p className="text-sm">{selectedProduct.packing}</p>
                                            </div>
                                        )}
                                        {selectedProduct.brand && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Brand</h4>
                                                <p className="text-sm">{selectedProduct.brand}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to={`/products/${slugify(selectedProduct.category || 'general')}/${selectedProduct.slug || slugify(selectedProduct.name)}`}
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        View Full Details <ExternalLink size={16} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageLayout>
    );
}
