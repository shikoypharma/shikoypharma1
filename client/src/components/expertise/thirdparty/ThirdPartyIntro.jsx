import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';

export default function ThirdPartyIntro({ data }) {
    return (
        <section className="py-4">
            <div className="container mx-auto px-4">
                <SectionHeader title={data.title} />
                <div className="max-w-4xl mx-auto space-y-6 text-slate-600 leading-relaxed">
                    {data.content.map((paragraph, index) => (
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
        </section>
    );
}
