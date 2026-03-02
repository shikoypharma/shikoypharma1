import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Upload, X, Plus } from "lucide-react";

const GlobalManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        navbar: { logo: "", contact: { phone: "", email: "" } },
        topbar: { socials: [], links: [], contact: { phone: "", email: "" } },
        footer: {
            description: "",
            products: [],
            quickLinks: [],
            contact: {
                phones: [],
                emails: { domestic: "", export: "" }
            },
            addresses: { manufacturing: "", corporate: "" },
            socials: [],
            copyrightText: ""
        }
    });

    useEffect(() => {
        fetchGlobalData();
    }, []);

    const fetchGlobalData = async () => {
        try {
            const { data } = await axios.get("/api/global");
            if (data) {
                setFormData(prev => ({
                    ...prev,
                    ...data,
                    footer: {
                        ...prev.footer,
                        ...data.footer,
                        contact: {
                            phones: data.footer?.contact?.phones || [],
                            emails: {
                                domestic: data.footer?.contact?.emails?.domestic || "",
                                export: data.footer?.contact?.emails?.export || ""
                            }
                        },
                        addresses: {
                            manufacturing: data.footer?.addresses?.manufacturing || "",
                            corporate: data.footer?.addresses?.corporate || ""
                        },
                        products: data.footer?.products || [],
                        quickLinks: data.footer?.quickLinks || [],
                        socials: data.footer?.socials || [],
                    }
                }));
            }
        } catch (error) {
            console.error("Error fetching global data", error);
        }
        setLoading(false);
    };

    // --- Logo Upload ---
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const uploadData = new FormData();
        uploadData.append("image", file);
        setUploading(true);
        try {
            const { data } = await axios.post("/api/upload", uploadData, { headers: { "Content-Type": "multipart/form-data" } });
            setFormData(prev => ({ ...prev, navbar: { ...prev.navbar, logo: data.url || data.secure_url || data } }));
        } catch (error) {
            console.error("Image upload failed", error);
        }
        setUploading(false);
    };

    // --- Generic helpers ---
    const updateFooterField = (field, value) => {
        setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
    };

    // --- Link list helpers (for products and quickLinks) ---
    const addLinkItem = (field) => {
        setFormData(prev => ({
            ...prev,
            footer: { ...prev.footer, [field]: [...prev.footer[field], { label: "", href: "" }] }
        }));
    };
    const updateLinkItem = (field, index, key, value) => {
        const updated = [...formData.footer[field]];
        updated[index] = { ...updated[index], [key]: value };
        updateFooterField(field, updated);
    };
    const removeLinkItem = (field, index) => {
        updateFooterField(field, formData.footer[field].filter((_, i) => i !== index));
    };

    // --- Phone helpers ---
    const addPhone = () => {
        setFormData(prev => ({
            ...prev,
            footer: { ...prev.footer, contact: { ...prev.footer.contact, phones: [...prev.footer.contact.phones, ""] } }
        }));
    };
    const updatePhone = (index, value) => {
        const updated = [...formData.footer.contact.phones];
        updated[index] = value;
        setFormData(prev => ({
            ...prev,
            footer: { ...prev.footer, contact: { ...prev.footer.contact, phones: updated } }
        }));
    };
    const removePhone = (index) => {
        setFormData(prev => ({
            ...prev,
            footer: { ...prev.footer, contact: { ...prev.footer.contact, phones: prev.footer.contact.phones.filter((_, i) => i !== index) } }
        }));
    };

    // --- Social helpers ---
    const addSocial = () => {
        setFormData(prev => ({
            ...prev,
            footer: { ...prev.footer, socials: [...prev.footer.socials, { platform: "", url: "" }] }
        }));
    };
    const updateSocial = (index, field, value) => {
        const updated = [...formData.footer.socials];
        updated[index] = { ...updated[index], [field]: value };
        updateFooterField("socials", updated);
    };
    const removeSocial = (index) => {
        updateFooterField("socials", formData.footer.socials.filter((_, i) => i !== index));
    };

    // --- Submit ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put("/api/global", formData);
            setMessage("Footer data saved successfully!");
        } catch (error) {
            console.error("Error saving", error);
            setMessage("Error saving: " + (error.response?.data?.message || error.message));
        }
        setSaving(false);
        setTimeout(() => setMessage(""), 3000);
    };

    if (loading) return <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Footer & Global Manager</h1>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                    {message}
                </div>
            )}

            <div className="space-y-6">

                {/* Navbar / Logo */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Navbar & Logo</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                            <div className="flex items-center gap-4">
                                {formData.navbar.logo && (
                                    <img src={formData.navbar.logo} alt="Logo" className="h-16 w-auto border rounded bg-gray-50" />
                                )}
                                <label className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 flex items-center gap-2 text-sm">
                                    <Upload size={16} />
                                    {uploading ? "Uploading..." : "Upload Logo"}
                                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" disabled={uploading} />
                                </label>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Main Phone</label>
                                <input
                                    type="text"
                                    value={formData.navbar.contact?.phone || ""}
                                    onChange={(e) => setFormData(prev => ({ ...prev, navbar: { ...prev.navbar, contact: { ...prev.navbar.contact, phone: e.target.value } } }))}
                                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Main Email</label>
                                <input
                                    type="text"
                                    value={formData.navbar.contact?.email || ""}
                                    onChange={(e) => setFormData(prev => ({ ...prev, navbar: { ...prev.navbar, contact: { ...prev.navbar.contact, email: e.target.value } } }))}
                                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Contact Details</h2>

                    {/* Phones */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
                            <button type="button" onClick={addPhone} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                <Plus size={16} /> Add Phone
                            </button>
                        </div>
                        {formData.footer.contact.phones.map((phone, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input
                                    value={phone}
                                    onChange={(e) => updatePhone(i, e.target.value)}
                                    className="flex-1 min-w-0 rounded-lg border px-3 py-2 text-sm"
                                    placeholder="+91 XXXXXXXXXX"
                                />
                                <button type="button" onClick={() => removePhone(i)} className="text-red-400 hover:text-red-600"><X size={18} /></button>
                            </div>
                        ))}
                    </div>

                    {/* Emails */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Domestic Email</label>
                            <input
                                value={formData.footer.contact.emails.domestic}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    footer: { ...prev.footer, contact: { ...prev.footer.contact, emails: { ...prev.footer.contact.emails, domestic: e.target.value } } }
                                }))}
                                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                                placeholder="info@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Export Email</label>
                            <input
                                value={formData.footer.contact.emails.export}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    footer: { ...prev.footer, contact: { ...prev.footer.contact, emails: { ...prev.footer.contact.emails, export: e.target.value } } }
                                }))}
                                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                                placeholder="export@company.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Addresses */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Addresses</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Manufacturing Address</label>
                            <textarea
                                value={formData.footer.addresses.manufacturing}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    footer: { ...prev.footer, addresses: { ...prev.footer.addresses, manufacturing: e.target.value } }
                                }))}
                                rows={3}
                                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Corporate Address</label>
                            <textarea
                                value={formData.footer.addresses.corporate}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    footer: { ...prev.footer, addresses: { ...prev.footer.addresses, corporate: e.target.value } }
                                }))}
                                rows={3}
                                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Product Links */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Footer Product Links</h2>
                        <button type="button" onClick={() => addLinkItem("products")} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    {formData.footer.products.map((item, i) => (
                        <div key={i} className="flex gap-3 items-center mb-2">
                            <input
                                value={item.label}
                                onChange={(e) => updateLinkItem("products", i, "label", e.target.value)}
                                className="flex-1 min-w-0 rounded-lg border px-3 py-2 text-sm"
                                placeholder="Label (e.g. Antidepressants)"
                            />
                            <input
                                value={item.href}
                                onChange={(e) => updateLinkItem("products", i, "href", e.target.value)}
                                className="flex-1 min-w-0 rounded-lg border px-3 py-2 text-sm"
                                placeholder="Link (e.g. /products/anti-depressants)"
                            />
                            <button type="button" onClick={() => removeLinkItem("products", i)} className="text-red-400 hover:text-red-600"><X size={18} /></button>
                        </div>
                    ))}
                </div>

                {/* Footer Quick Links */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Footer Quick Links</h2>
                        <button type="button" onClick={() => addLinkItem("quickLinks")} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    {formData.footer.quickLinks.map((item, i) => (
                        <div key={i} className="flex gap-3 items-center mb-2">
                            <input
                                value={item.label}
                                onChange={(e) => updateLinkItem("quickLinks", i, "label", e.target.value)}
                                className="flex-1 min-w-0 rounded-lg border px-3 py-2 text-sm"
                                placeholder="Label (e.g. Corporate Profile)"
                            />
                            <input
                                value={item.href}
                                onChange={(e) => updateLinkItem("quickLinks", i, "href", e.target.value)}
                                className="flex-1 min-w-0 rounded-lg border px-3 py-2 text-sm"
                                placeholder="Link (e.g. /about/corporate-profile)"
                            />
                            <button type="button" onClick={() => removeLinkItem("quickLinks", i)} className="text-red-400 hover:text-red-600"><X size={18} /></button>
                        </div>
                    ))}
                </div>

                {/* Footer Social Links */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Footer Social Links</h2>
                        <button type="button" onClick={addSocial} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    {formData.footer.socials.map((social, i) => (
                        <div key={i} className="flex gap-3 items-center mb-2">
                            <input
                                value={social.platform}
                                onChange={(e) => updateSocial(i, "platform", e.target.value)}
                                className="w-40 rounded-lg border px-3 py-2 text-sm"
                                placeholder="Platform"
                            />
                            <input
                                value={social.url}
                                onChange={(e) => updateSocial(i, "url", e.target.value)}
                                className="flex-1 min-w-0 rounded-lg border px-3 py-2 text-sm"
                                placeholder="URL"
                            />
                            <button type="button" onClick={() => removeSocial(i)} className="text-red-400 hover:text-red-600"><X size={18} /></button>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Copyright Text</h2>
                    <input
                        value={formData.footer.copyrightText || ""}
                        onChange={(e) => updateFooterField("copyrightText", e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-sm"
                        placeholder="© 2025 Company Name. All rights reserved."
                    />
                </div>

            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t mt-8 z-20 flex justify-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                >
                    <Save size={18} />
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
};

export default GlobalManager;
