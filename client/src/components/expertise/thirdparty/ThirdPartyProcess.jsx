import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';

export default function ThirdPartyProcess({ process, timelines, costing, terms }) {
    return (
        <section className="py-10 bg-slate-50">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={process.title}
                    subtitle="A systematic approach to ensuring quality and efficiency"
                />

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {process.steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                    {step.id}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-slate-800">{step.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Timelines */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-sm"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-slate-800">{timelines.title}</h3>
                        <p className="text-slate-600 mb-6">{timelines.description}</p>
                        <div className="space-y-4">
                            {timelines.stages.map((stage, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="font-medium text-slate-700">{stage.stage}</span>
                                    <span className="text-blue-600 font-semibold">{stage.time}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Costing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg"
                    >
                        <h3 className="text-2xl font-bold mb-6">{costing.title}</h3>
                        <ul className="space-y-3 mb-6">
                            {costing.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-blue-50">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-200 rounded-full" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-blue-200 italic border-t border-blue-500 pt-4">
                            {costing.note}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
