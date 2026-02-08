import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/layout/pageLayout/pageLayout';
import { SectionHeader } from '@/components/shared/section-components';
import { productGalleryData } from '@/data/gallery/productGallery.data';
import { X, ZoomIn } from 'lucide-react';

export default function ProductGallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...new Set(productGalleryData.images.map(img => img.category))];

    const filteredImages = filter === 'All'
        ? productGalleryData.images
        : productGalleryData.images.filter(img => img.category === filter);

    return (
        <PageLayout title={productGalleryData.title}>
            <section className="py-1">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Our Products" subtitle={productGalleryData.description} />

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredImages.map((image) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    key={image.id}
                                    className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl cursor-pointer aspect-square bg-slate-50 border border-slate-100"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    {/* Fallback Display */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                                        <span className="text-xs uppercase font-bold tracking-wider text-blue-200 mb-2">{image.category}</span>
                                        <span className="text-sm font-medium text-slate-500">{image.alt}</span>
                                    </div>

                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                                        <ZoomIn className="text-white w-8 h-8" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox Modal (Reused logic, could be extracted to shared component) */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors bg-white/10 rounded-full p-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="max-w-3xl w-full max-h-[80vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-white rounded-lg overflow-hidden shadow-2xl w-full aspect-video flex items-center justify-center bg-slate-800">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `<div class='flex flex-col items-center justify-center h-full text-white'><p class='text-xl font-bold'>${selectedImage.alt}</p><span class='text-sm text-blue-200'>${selectedImage.category} Product</span></div>`;
                                    }}
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-white text-xl font-medium">{selectedImage.alt}</p>
                                <span className="text-blue-400 text-sm uppercase tracking-wider">{selectedImage.category}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageLayout>
    );
}
