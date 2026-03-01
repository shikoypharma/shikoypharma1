import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/pageLayout/pageLayout';
import { SectionHeader } from '@/components/shared/section-components';
import { contactData as staticData } from '@/data/contact/contact.data';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
    const [data, setData] = useState(staticData);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const { data: res } = await axios.get("/api/contact-page");
                if (res) {
                    setData({
                        title: res.title || staticData.title,
                        introduction: res.introduction || staticData.introduction,
                        offices: res.offices?.length ? res.offices : staticData.offices,
                        mapUrl: res.mapUrl || staticData.mapUrl,
                        form: staticData.form,
                    });
                }
            } catch (err) {
                // Fallback to static data
            }
        };
        fetchContact();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            await axios.post("/api/inquiry", {
                name: form.name || "",
                email: form.email || "",
                phone: form.phone || "",
                location: form.location || "",
                message: form.message || "",
                type: "contact",
                source: "contact",
            });
            setSuccess(true);
            setForm({});
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send message. Please try again.");
        }
        setLoading(false);
    };

    return (
        <PageLayout title={data.title}>
            <section className="py-1">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Get in Touch" subtitle={data.introduction} />

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            {data.offices.map((office, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
                                >
                                    <h3 className="text-xl font-bold mb-4 text-slate-800 border-b border-slate-100 pb-2">{office.title}</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <p className="text-slate-600 text-sm">{office.address}</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <div className="space-y-1">
                                                {office.phones.map((phone, idx) => (
                                                    <p key={idx} className="text-slate-600 text-sm hover:text-blue-600 cursor-pointer">{phone}</p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <div className="space-y-1">
                                                {office.emails.map((email, idx) => (
                                                    <p key={idx} className="text-slate-600 text-sm">
                                                        <span className="font-medium text-slate-700">{email.label}:</span> <a href={`mailto:${email.email}`} className="hover:text-blue-600">{email.email}</a>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
                            >
                                <h3 className="text-2xl font-bold mb-6 text-slate-800">{data.form.title}</h3>

                                {success && (
                                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                                        Thank you! Your message has been sent. We will get back to you soon.
                                    </div>
                                )}
                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.form.fields.map((field, index) => (
                                        <div key={index} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                            </label>
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    name={field.name}
                                                    rows={4}
                                                    value={form[field.name] || ""}
                                                    onChange={handleChange}
                                                    required={field.required}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={form[field.name] || ""}
                                                    onChange={handleChange}
                                                    required={field.required}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <div className="md:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <Send className="w-4 h-4" />
                                            {loading ? "Sending..." : "Send Message"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-96 w-full bg-slate-100 relative">
                <iframe
                    src={data.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                />
            </section>
        </PageLayout>
    );
}
