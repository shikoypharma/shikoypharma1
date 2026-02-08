import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';
import { Globe, Flag, TrendingUp } from 'lucide-react';

export default function ExporterIntro({ intro, globalPresence }) {
    return (
        <section className="py-4">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionHeader title={intro.title} />
                        <div className="space-y-6 text-slate-600 leading-relaxed mb-8">
                            {intro.content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {intro.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                                    <p className="text-sm text-slate-700">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-blue-600 text-white rounded-3xl p-8 md:p-12 shadow-xl"
                    >
                        <Globe className="w-12 h-12 mb-6 text-blue-200" />
                        <h3 className="text-2xl font-bold mb-4">{globalPresence.title}</h3>
                        <p className="text-blue-100 mb-8 leading-relaxed">{globalPresence.description}</p>
                        <div className="flex items-center gap-4 bg-blue-700/50 p-4 rounded-xl">
                            <TrendingUp className="w-8 h-8 text-green-400" />
                            <div>
                                <p className="font-bold text-lg">138% Growth</p>
                                <p className="text-sm text-blue-200">In Pharma Exports</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
