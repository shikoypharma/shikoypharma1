import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import PageLayout from '@/components/layout/pageLayout/pageLayout';
import { SectionHeader } from '@/components/shared/section-components';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const { data } = await axios.get("/api/gallery");
            setGalleryItems(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching gallery", error);
            setLoading(false);
        }
    };

    // Flatten all images from all gallery items into a single list with metadata
    const allImages = React.useMemo(() => {
        const images = [];
        galleryItems.forEach(item => {
            if (item.images && item.images.length > 0) {
                item.images.forEach(img => {
                    images.push({
                        ...img,
                        parentId: item._id,
                        parentTitle: item.title,
                        type: item.type
                    });
                });
            }
        });
        return images;
    }, [galleryItems]);

    const categories = ['All', 'Corporate', 'Events'];

    const filteredImages = filter === 'All'
        ? allImages
        : allImages.filter(img => {
            if (filter === 'Corporate') return img.type === 'corporate';
            if (filter === 'Events') return img.type !== 'corporate'; // Assuming non-corporate are events
            return true;
        });

    if (loading) {
        return (
            <PageLayout title="Gallery">
                <div className="p-20 text-center">Loading gallery...</div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="Gallery">
            <section className="py-1">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Media Gallery" subtitle="Moments from our events and corporate life." />

                    {/* Simple Filter */}
                    <div className="flex justify-center gap-4 mb-8">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {filteredImages.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer aspect-square bg-white"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image.src || image} // Handle if image is object or string
                                        alt={image.alt || "Gallery Image"}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <ZoomIn className="text-white w-8 h-8" />
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-sm font-medium truncate">{image.parentTitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            No images found.
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img
                            src={selectedImage.src || selectedImage}
                            alt={selectedImage.alt || "Gallery Image"}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                        <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                            <h3 className="text-xl font-bold">{selectedImage.parentTitle}</h3>
                            <p className="text-gray-300 text-sm mt-1">{selectedImage.alt}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageLayout>
    );
}
