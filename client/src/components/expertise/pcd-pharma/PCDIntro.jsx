import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';

export default function PCDIntro({ intro, neuroFranchise }) {
    return (
        <section className="py-4">
            <div className="container mx-auto px-4">
                {/* Intro Section */}
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <SectionHeader title={intro.title} />
                    <div className="space-y-6 text-slate-600 leading-relaxed text-left">
                        {intro.content.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>
                </div>

                {/* Neuro Franchise Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center bg-blue-50 rounded-3xl p-8 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-slate-800">{neuroFranchise.title}</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            {neuroFranchise.content}
                        </p>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Apply for Franchise
                        </button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg"
                    >
                        {/* Placeholder for an image */}
                        <div className="absolute inset-0 bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-xl">
                            Franchise Opportunity
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
