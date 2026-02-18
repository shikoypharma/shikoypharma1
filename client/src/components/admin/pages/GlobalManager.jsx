import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Upload, X, Plus } from "lucide-react";

const GlobalManager = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        navbar: { logo: "", contact: { phone: "", email: "" } },
        footer: {
            description: "",
            contactInfo: { address: "", phones: [], emails: [], website: "" },
            socials: []
        },
        topbar: { socials: [], contact: { phone: "", email: "" } }
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchGlobalData();
    }, []);

    const fetchGlobalData = async () => {
        try {
            const { data } = await axios.get("/api/global");
            if (data) setFormData(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching global data", error);
            setLoading(false);
        }
    };

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const handleNestedChange = (section, subsection, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subsection]: { ...prev[section][subsection], [field]: value }
            }
        }));
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("image", file);

        setUploading(true);
        try {
            const config = { headers: { "Content-Type": "multipart/form-data" } };
            const { data } = await axios.post("/api/upload", uploadData, config);
            setFormData(prev => ({
                ...prev,
                navbar: { ...prev.navbar, logo: data }
            }));
        } catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    // Helper for arrays (phones, emails in footer)
    const updateArrayItem = (section, subsection, field, index, value) => {
        const newArray = [...formData[section][subsection][field]];
        newArray[index] = value;
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subsection]: { ...prev[section][subsection], [field]: newArray }
            }
        }));
    };

    const addArrayItem = (section, subsection, field) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subsection]: { ...prev[section][subsection], [field]: [...prev[section][subsection][field], ""] }
            }
        }));
    };

    const removeArrayItem = (section, subsection, field, index) => {
        const newArray = formData[section][subsection][field].filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subsection]: { ...prev[section][subsection], [field]: newArray }
            }
        }));
    };

    // Helper for Socials
    const addSocial = (section) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                socials: [...prev[section].socials, { platform: "", name: "", url: "" }]
            }
        }));
    };

    const updateSocial = (section, index, field, value) => {
        const newSocials = [...formData[section].socials];
        newSocials[index][field] = value;
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], socials: newSocials }
        }));
    };

    const removeSocial = (section, index) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], socials: prev[section].socials.filter((_, i) => i !== index) }
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("/api/global", formData);
            alert("Global data updated successfully");
        } catch (error) {
            console.error("Error saving global data", error);
            alert("Failed to save global data");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Global Data Manager</h1>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 flex items-center gap-2"
                >
                    <Save size={20} />
                    Save Changes
                </button>
            </div>

            <div className="space-y-6">
                {/* Navbar Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Navbar & General</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                            <div className="flex items-center gap-4">
                                {formData.navbar.logo && (
                                    <img src={formData.navbar.logo} alt="Logo" className="h-16 w-auto border rounded bg-gray-100 placeholder-transparent" />
                                )}
                                <label className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-50 flex items-center gap-2">
                                    <Upload size={16} />
                                    <span>{uploading ? 'Uploading...' : 'Upload Logo'}</span>
                                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" disabled={uploading} />
                                </label>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Main Phone</label>
                                <input
                                    type="text"
                                    value={formData.navbar.contact.phone}
                                    onChange={(e) => handleNestedChange("navbar", "contact", "phone", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Main Email</label>
                                <input
                                    type="text"
                                    value={formData.navbar.contact.email}
                                    onChange={(e) => handleNestedChange("navbar", "contact", "email", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Topbar Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Top Bar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Topbar Phone</label>
                            <input
                                type="text"
                                value={formData.topbar.contact.phone}
                                onChange={(e) => handleNestedChange("topbar", "contact", "phone", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Topbar Email</label>
                            <input
                                type="text"
                                value={formData.topbar.contact.email}
                                onChange={(e) => handleNestedChange("topbar", "contact", "email", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Social Links</label>
                            <button type="button" onClick={() => addSocial("topbar")} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                <Plus size={16} /> Add Social
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.topbar.socials.map((social, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={social.name}
                                        onChange={(e) => updateSocial("topbar", index, "name", e.target.value)}
                                        className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                        placeholder="Platform Name"
                                    />
                                    <input
                                        type="text"
                                        value={social.url}
                                        onChange={(e) => updateSocial("topbar", index, "url", e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                        placeholder="URL"
                                    />
                                    <button type="button" onClick={() => removeSocial("topbar", index)} className="text-red-500 hover:text-red-700">
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Footer</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={formData.footer.description}
                            onChange={(e) => handleChange("footer", "description", e.target.value)}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            value={formData.footer.contactInfo.address}
                            onChange={(e) => handleNestedChange("footer", "contactInfo", "address", e.target.value)}
                            rows={2}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>
                    {/* Footer Phones */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Footer Phones</label>
                            <button type="button" onClick={() => addArrayItem("footer", "contactInfo", "phones")} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                <Plus size={16} /> Add Phone
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.footer.contactInfo.phones.map((phone, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => updateArrayItem("footer", "contactInfo", "phones", index, e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                        placeholder="Phone Number"
                                    />
                                    <button type="button" onClick={() => removeArrayItem("footer", "contactInfo", "phones", index)} className="text-red-500 hover:text-red-700">
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Footer Emails */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Footer Emails</label>
                            <button type="button" onClick={() => addArrayItem("footer", "contactInfo", "emails")} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                <Plus size={16} /> Add Email
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.footer.contactInfo.emails.map((email, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => updateArrayItem("footer", "contactInfo", "emails", index, e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                        placeholder="Email Address"
                                    />
                                    <button type="button" onClick={() => removeArrayItem("footer", "contactInfo", "emails", index)} className="text-red-500 hover:text-red-700">
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Footer Website */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        <input
                            type="text"
                            value={formData.footer.contactInfo.website}
                            onChange={(e) => handleNestedChange("footer", "contactInfo", "website", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>
                    {/* Footer Socials */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Footer Social Links</label>
                            <button type="button" onClick={() => addSocial("footer")} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                <Plus size={16} /> Add Social
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.footer.socials.map((social, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={social.platform}
                                        onChange={(e) => updateSocial("footer", index, "platform", e.target.value)}
                                        className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                        placeholder="Platform"
                                    />
                                    <input
                                        type="text"
                                        value={social.url}
                                        onChange={(e) => updateSocial("footer", index, "url", e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                        placeholder="URL"
                                    />
                                    <button type="button" onClick={() => removeSocial("footer", index)} className="text-red-500 hover:text-red-700">
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </form>
    );
};

export default GlobalManager;
