import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Plus, X } from "lucide-react";

export default function ContactManager() {
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        title: "Contact Us",
        introduction: "",
        mapUrl: "",
        offices: []
    });

    useEffect(() => {
        fetchContact();
    }, []);

    const fetchContact = async () => {
        try {
            const { data } = await axios.get("/api/contact-page");
            if (data) {
                setFormData({
                    title: data.title || "Contact Us",
                    introduction: data.introduction || "",
                    mapUrl: data.mapUrl || "",
                    offices: data.offices?.length ? data.offices : []
                });
            }
        } catch (err) {
            console.log("No contact data yet");
        }
    };

    // --- Office helpers ---
    const addOffice = () => {
        setFormData(prev => ({
            ...prev,
            offices: [...prev.offices, { title: "", address: "", phones: [""], emails: [{ label: "", email: "" }] }]
        }));
    };

    const removeOffice = (i) => {
        setFormData(prev => ({ ...prev, offices: prev.offices.filter((_, idx) => idx !== i) }));
    };

    const updateOffice = (i, field, value) => {
        const updated = [...formData.offices];
        updated[i] = { ...updated[i], [field]: value };
        setFormData(prev => ({ ...prev, offices: updated }));
    };

    // --- Phone helpers within office ---
    const addPhone = (officeIdx) => {
        const updated = [...formData.offices];
        updated[officeIdx] = { ...updated[officeIdx], phones: [...updated[officeIdx].phones, ""] };
        setFormData(prev => ({ ...prev, offices: updated }));
    };

    const updatePhone = (officeIdx, phoneIdx, value) => {
        const updated = [...formData.offices];
        const phones = [...updated[officeIdx].phones];
        phones[phoneIdx] = value;
        updated[officeIdx] = { ...updated[officeIdx], phones };
        setFormData(prev => ({ ...prev, offices: updated }));
    };

    const removePhone = (officeIdx, phoneIdx) => {
        const updated = [...formData.offices];
        updated[officeIdx] = { ...updated[officeIdx], phones: updated[officeIdx].phones.filter((_, i) => i !== phoneIdx) };
        setFormData(prev => ({ ...prev, offices: updated }));
    };

    // --- Email helpers within office ---
    const addEmail = (officeIdx) => {
        const updated = [...formData.offices];
        updated[officeIdx] = { ...updated[officeIdx], emails: [...updated[officeIdx].emails, { label: "", email: "" }] };
        setFormData(prev => ({ ...prev, offices: updated }));
    };

    const updateEmail = (officeIdx, emailIdx, field, value) => {
        const updated = [...formData.offices];
        const emails = [...updated[officeIdx].emails];
        emails[emailIdx] = { ...emails[emailIdx], [field]: value };
        updated[officeIdx] = { ...updated[officeIdx], emails };
        setFormData(prev => ({ ...prev, offices: updated }));
    };

    const removeEmail = (officeIdx, emailIdx) => {
        const updated = [...formData.offices];
        updated[officeIdx] = { ...updated[officeIdx], emails: updated[officeIdx].emails.filter((_, i) => i !== emailIdx) };
        setFormData(prev => ({ ...prev, offices: updated }));
    };

    // --- Submit ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put("/api/contact-page", formData);
            setMessage("Contact page saved successfully!");
        } catch (err) {
            setMessage("Error saving: " + (err.response?.data?.message || err.message));
        }
        setSaving(false);
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Contact Page Manager</h1>
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                >
                    <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {message && (
                <div className={`p-3 rounded-lg text-sm ${message.includes("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                    {message}
                </div>
            )}

            {/* Page Title & Introduction */}
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                <h2 className="text-lg font-semibold">Page Settings</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                    <input
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Introduction Text</label>
                    <textarea
                        value={formData.introduction}
                        onChange={(e) => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
                        rows={3}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="Get in Touch - We welcome you to visit us..."
                    />
                </div>
            </div>

            {/* Google Map Embed URL */}
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                <h2 className="text-lg font-semibold">Location Map</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed URL</label>
                    <input
                        value={formData.mapUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, mapUrl: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                    <p className="text-xs text-gray-400 mt-1">Paste the embed URL from Google Maps (Share → Embed a map → copy the src URL)</p>
                </div>
                {formData.mapUrl && (
                    <div className="border rounded-lg overflow-hidden h-48">
                        <iframe src={formData.mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Map Preview" />
                    </div>
                )}
            </div>

            {/* Offices */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Office Locations</h2>
                    <button type="button" onClick={addOffice} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus size={16} /> Add Office
                    </button>
                </div>

                {formData.offices.map((office, oi) => (
                    <div key={oi} className="border rounded-lg p-4 mb-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-gray-500">Office {oi + 1}</span>
                            <button type="button" onClick={() => removeOffice(oi)} className="text-red-400 hover:text-red-600">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Office Title</label>
                                <input
                                    value={office.title}
                                    onChange={(e) => updateOffice(oi, "title", e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                    placeholder="e.g. Corporate Office"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea
                                    value={office.address}
                                    onChange={(e) => updateOffice(oi, "address", e.target.value)}
                                    rows={2}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                />
                            </div>

                            {/* Phones */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
                                    <button type="button" onClick={() => addPhone(oi)} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                        <Plus size={14} /> Add
                                    </button>
                                </div>
                                {office.phones.map((phone, pi) => (
                                    <div key={pi} className="flex gap-2 mb-1">
                                        <input
                                            value={phone}
                                            onChange={(e) => updatePhone(oi, pi, e.target.value)}
                                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                            placeholder="+91 XXXXXXXXXX"
                                        />
                                        <button type="button" onClick={() => removePhone(oi, pi)} className="text-red-400 hover:text-red-600"><X size={16} /></button>
                                    </div>
                                ))}
                            </div>

                            {/* Emails */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Emails</label>
                                    <button type="button" onClick={() => addEmail(oi)} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                        <Plus size={14} /> Add
                                    </button>
                                </div>
                                {office.emails.map((em, ei) => (
                                    <div key={ei} className="flex gap-2 mb-1">
                                        <input
                                            value={em.label}
                                            onChange={(e) => updateEmail(oi, ei, "label", e.target.value)}
                                            className="w-32 border rounded-lg px-3 py-2 text-sm"
                                            placeholder="Label"
                                        />
                                        <input
                                            value={em.email}
                                            onChange={(e) => updateEmail(oi, ei, "email", e.target.value)}
                                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                            placeholder="email@example.com"
                                        />
                                        <button type="button" onClick={() => removeEmail(oi, ei)} className="text-red-400 hover:text-red-600"><X size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </form>
    );
}
