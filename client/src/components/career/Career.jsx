import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/pageLayout/pageLayout';
import { SectionHeader } from '@/components/shared/section-components';
import { careerData } from '@/data/career/career.data';
import { Briefcase, MapPin, Clock, Upload, Send, Users } from 'lucide-react';

export default function Career() {
    return (
        <PageLayout title={careerData.title}>
            {/* Intro */}
            <section className="py-1 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h3 className="text-3xl font-bold mb-6 text-slate-800">Join Our Team</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">{careerData.intro}</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Job Listings using details/summary for cleaner look or just cards */}
                        <div className="space-y-6">
                            <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-blue-600" />
                                Current Openings
                            </h4>
                            {careerData.jobs.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h5 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{job.title}</h5>
                                            <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded inline-block mt-2">
                                                {job.department}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 bg-slate-200 px-2 py-1 rounded uppercase tracking-wider">Full Time</span>
                                    </div>

                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                                    <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-200 pt-4">
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {job.experience}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Application Form */}
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                            <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Send className="w-6 h-6 text-blue-600" />
                                Apply Now
                            </h4>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Contact No.</label>
                                        <input type="tel" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm" placeholder="Mobile Number" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm" placeholder="email@example.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Applying For</label>
                                    <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm text-slate-600">
                                        <option value="">Select Department</option>
                                        {careerData.departments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Resume</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer">
                                        <Upload className="w-8 h-8 mb-2" />
                                        <span className="text-sm">Click to upload CV (PDF, DOC)</span>
                                    </div>
                                </div>

                                <button type="button" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-lg shadow-blue-200 mt-2">
                                    Submit Application
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
