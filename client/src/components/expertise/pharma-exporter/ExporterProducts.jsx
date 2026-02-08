import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';

export default function ExporterProducts({ products }) {
    return (
        <section className="py-10 bg-blue-50">
            <div className="container mx-auto px-4">
                <SectionHeader title={products.title} subtitle={products.description} />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-white p-4 rounded-lg shadow-sm text-center text-sm font-medium text-slate-700 hover:text-blue-600 hover:shadow-md transition-all cursor-default border border-blue-100"
                        >
                            {category}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
