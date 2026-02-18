import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Plus, X, Upload } from "lucide-react";

const CertificationsForm = () => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "Certifications",
        data: {
            description: "",
            certifications: []
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/content/certifications");
            if (data) {
                setFormData({
                    title: data.title || "Certifications",
                    data: {
                        description: data.data?.description || "",
                        certifications: data.data?.certifications || []
                    }
                });
            }
        } catch (error) {
            console.log("No existing data found, using defaults");
        }
    };

    const handleCertificationChange = (index, field, value) => {
        const newCerts = [...formData.data.certifications];
        newCerts[index] = { ...newCerts[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            data: { ...prev.data, certifications: newCerts }
        }));
    };

    const handleImageUpload = async (index, file) => {
        const uploadData = new FormData();
        uploadData.append("image", file);

        setUploading(true);
        try {
            const { data } = await axios.post("/api/upload", uploadData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            handleCertificationChange(index, "image", data);
        } catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    const addCertification = () => {
        setFormData(prev => ({
            ...prev,
            data: {
                ...prev.data,
                certifications: [...prev.data.certifications, { title: "", description: "", image: "" }]
            }
        }));
    };

    const removeCertification = (index) => {
        const newCerts = formData.data.certifications.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            data: { ...prev.data, certifications: newCerts }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put("/api/content/certifications", formData);
            alert("Certifications updated successfully!");
        } catch (error) {
            console.error("Error saving data", error);
            alert("Failed to save data");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intro Description</label>
                <textarea
                    value={formData.data.description}
                    onChange={(e) => setFormData({ ...formData, data: { ...formData.data, description: e.target.value } })}
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">Certifications</label>
                    <button type="button" onClick={addCertification} className="text-sm text-blue-600 flex items-center gap-1">
                        <Plus size={16} /> Add Certification
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {formData.data.certifications.map((cert, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50 relative group">
                            <button
                                type="button"
                                onClick={() => removeCertification(index)}
                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="h-20 w-20 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative group/img">
                                        {cert.image ? (
                                            <>
                                                <img src={cert.image} alt="Certificate" className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleCertificationChange(index, "image", "")}
                                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity text-white"
                                                    title="Remove"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                        )}
                                    </div>
                                    <label className="text-xs text-blue-600 cursor-pointer hover:underline">
                                        {uploading ? "..." : "Change Image"}
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => e.target.files[0] && handleImageUpload(index, e.target.files[0])}
                                            accept="image/*"
                                            disabled={uploading}
                                        />
                                    </label>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={cert.title}
                                    onChange={(e) => handleCertificationChange(index, "title", e.target.value)}
                                    className="w-full rounded border-gray-300 border p-2 text-sm"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={cert.description}
                                    onChange={(e) => handleCertificationChange(index, "description", e.target.value)}
                                    rows={2}
                                    className="w-full rounded border-gray-300 border p-2 text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
                <Save size={18} />
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
};

export default CertificationsForm;
