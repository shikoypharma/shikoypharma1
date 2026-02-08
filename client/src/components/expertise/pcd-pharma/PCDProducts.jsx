import React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

export default function PCDProducts({ products }) {
    return (
        <section className="py-10 bg-blue-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pattern-dots"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{products.title}</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        We offer a comprehensive range of pharmaceutical products manufactured in WHO-GMP certified facilities.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {products.list.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 hover:bg-white/20 transition-colors cursor-pointer"
                        >
                            <Package className="w-4 h-4 text-blue-200" />
                            <span className="font-medium">{product}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
