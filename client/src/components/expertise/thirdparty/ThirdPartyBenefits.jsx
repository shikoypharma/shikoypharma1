import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ThirdPartyBenefits({ products }) {
    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={products.title}
                    subtitle="Partner with a leader in pharmaceutical manufacturing"
                />

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            {products.description}
                        </p>
                        <a
                            href={products.brochureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
                        >
                            Download Brochure
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {products.features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                            >
                                <CheckCircle2 className="w-8 h-8 text-green-500 mb-4" />
                                <h4 className="font-bold text-slate-800 mb-2">{feature.title}</h4>
                                <p className="text-sm text-slate-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
