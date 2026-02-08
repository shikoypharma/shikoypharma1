import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="border border-slate-200 rounded-lg overflow-hidden bg-white"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="font-semibold text-slate-800 pr-8">{item.question}</span>
                {isOpen ? (
                    <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                    <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 md:p-6 pt-0 text-slate-600 bg-slate-50/50">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function PCDFAQ({ faq }) {
    return (
        <section className="py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <SectionHeader title={faq.title} subtitle="Common questions about our franchise model" />
                <div className="space-y-4">
                    {faq.items.map((item, index) => (
                        <FAQItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
