import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';
import { DollarSign, Zap, Briefcase, Award } from 'lucide-react';

const icons = {
    "Economic Services": DollarSign,
    "High Productivity": Zap,
    "Exporting Services": Briefcase,
    "Competitive Prices": Award
};

export default function ExporterWhyChoose({ whyChooseUs }) {
    return (
        <section className="py-10 bg-slate-50">
            <div className="container mx-auto px-4">
                <SectionHeader title={whyChooseUs.title} subtitle="Why partner with Lifecare Neuro?" />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {whyChooseUs.items.map((item, index) => {
                        const Icon = icons[item.title] || Award;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 group"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-slate-800">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
