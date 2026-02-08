import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';
import { Container, FileCheck, Anchor, Truck, ClipboardCheck } from 'lucide-react';

export default function ExporterProcess({ exportProcess }) {
    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <SectionHeader title="Export Process & Documentation" subtitle="A streamlined approach to international trade" />

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Steps */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Container className="w-6 h-6 text-blue-600" />
                            Application Steps
                        </h3>
                        <div className="space-y-4 relative pl-8 border-l-2 border-slate-100">
                            {exportProcess.steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-blue-100 border-2 border-white ring-2 ring-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600">
                                        {index + 1}
                                    </span>
                                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg text-sm hover:bg-white hover:shadow-md transition-all border border-slate-100">
                                        {step}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-slate-800 text-slate-300 rounded-2xl p-8 lg:p-10">
                        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                            <FileCheck className="w-6 h-6 text-green-400" />
                            Required Documents
                        </h3>
                        <div className="grid gap-3">
                            {exportProcess.documents.map((doc, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                                >
                                    <ClipboardCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    <span className="text-sm">{doc}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
