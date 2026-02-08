import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-components';
import { Check, Star, Shield, Users, Award, Box } from 'lucide-react';

const icons = {
    "ISO 9001:2008 CERTIFIED": Star,
    "OUR QUALITY APPROACH": Shield,
    "DEDICATED WORKFORCE": Users,
    "ETHICS AND COMPLIANCE": Check,
    "PACKAGING": Box,
    "AWARDS & ACHIEVEMENTS": Award
};

export default function PCDWhyChoose({ whyChooseUs, benefits }) {
    return (
        <section className="py-10 bg-slate-50">
            <div className="container mx-auto px-4">
                {/* Why Choose Us Grid */}
                <SectionHeader title={whyChooseUs.title} subtitle="Excellence in every aspect of our business" />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {whyChooseUs.items.map((item, index) => {
                        const Icon = icons[item.title] || Star;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-3 text-slate-800">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Benefits Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200">
                    <h3 className="text-2xl font-bold mb-8 text-center">{benefits.title}</h3>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {benefits.items.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex gap-4"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5 text-green-600" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                                    <p className="text-slate-600 text-sm">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
