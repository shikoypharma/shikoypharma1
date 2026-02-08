import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/layout/pageLayout/pageLayout';
import { SectionHeader } from '@/components/shared/section-components';
import { galleryData } from '@/data/gallery/gallery.data';
import { X } from 'lucide-react';

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <PageLayout title={galleryData.title}>
            <section className="py-1">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Our Gallery" subtitle={galleryData.description} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryData.images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer aspect-video bg-slate-200"
                                onClick={() => setSelectedImage(image)}
                            >
                                {/* Fallback for missing images */}
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                                    <span className="text-sm font-medium">{image.caption}</span>
                                </div>

                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100 md:opacity-100" // Show alt text/placeholder if loading fails mostly
                                    onError={(e) => { e.target.style.display = 'none'; }} // Hide broken image links
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <p className="text-white font-medium">{image.caption}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    className="max-w-full max-h-[80vh] object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `<div class='p-20 text-white text-center'>Image not available<br/><span class='text-sm text-slate-400'>${selectedImage.caption}</span></div>`;
                                    }}
                                />
                            </div>
                            <p className="mt-4 text-white text-lg font-medium">{selectedImage.caption}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageLayout>
    );
}
