import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Plus, X, Upload } from "lucide-react";

const AssociatesForm = () => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "Our Associates",
        data: {
            description: "",
            associates: []
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/content/associates");
            if (data) {
                setFormData({
                    title: data.title || "Our Associates",
                    data: {
                        description: data.data?.description || "",
                        associates: data.data?.associates || []
                    }
                });
            }
        } catch (error) {
            console.log("No existing data found, using defaults");
        }
    };

    const handleAssociateChange = (index, field, value) => {
        const newAssociates = [...formData.data.associates];
        newAssociates[index] = { ...newAssociates[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            data: { ...prev.data, associates: newAssociates }
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
            handleAssociateChange(index, "image", data);
        } catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    const addAssociate = () => {
        setFormData(prev => ({
            ...prev,
            data: {
                ...prev.data,
                associates: [...prev.data.associates, { name: "", type: "", image: "" }]
            }
        }));
    };

    const removeAssociate = (index) => {
        const newAssociates = formData.data.associates.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            data: { ...prev.data, associates: newAssociates }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put("/api/content/associates", formData);
            alert("Associates updated successfully!");
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
                    <label className="block text-sm font-medium text-gray-700">Associates</label>
                    <button type="button" onClick={addAssociate} className="text-sm text-blue-600 flex items-center gap-1">
                        <Plus size={16} /> Add Associate
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {formData.data.associates.map((associate, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50 relative group">
                            <button
                                type="button"
                                onClick={() => removeAssociate(index)}
                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="h-20 w-20 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative group/img">
                                        {associate.image ? (
                                            <>
                                                <img src={associate.image} alt="Associate" className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleAssociateChange(index, "image", "")}
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
                                        {uploading ? "..." : "Change Logo"}
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
                                    placeholder="Name"
                                    value={associate.name}
                                    onChange={(e) => handleAssociateChange(index, "name", e.target.value)}
                                    className="w-full rounded border-gray-300 border p-2 text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Type / Description"
                                    value={associate.type}
                                    onChange={(e) => handleAssociateChange(index, "type", e.target.value)}
                                    className="w-full rounded border-gray-300 border p-2 text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t mt-4 z-20 flex justify-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                    <Save size={18} />
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
};

export default AssociatesForm;
