import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Plus, X, Upload } from "lucide-react";

const ChairmanDeskForm = () => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "From The Chairman's Desk",
        data: {
            name: "",
            designation: "",
            message: [""],
            image: ""
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/content/chairman");
            if (data) {
                setFormData({
                    title: data.title || "From The Chairman's Desk",
                    data: {
                        name: data.data?.name || "",
                        designation: data.data?.designation || "",
                        message: data.data?.message || [""],
                        image: data.data?.image || ""
                    }
                });
            }
        } catch (error) {
            console.log("No existing data found, using defaults");
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("image", file);

        setUploading(true);
        try {
            const { data } = await axios.post("/api/upload", uploadData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setFormData(prev => ({
                ...prev,
                data: { ...prev.data, image: data }
            }));
        } catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    const handleMessageChange = (index, value) => {
        const newMessage = [...formData.data.message];
        newMessage[index] = value;
        setFormData(prev => ({
            ...prev,
            data: { ...prev.data, message: newMessage }
        }));
    };

    const addParagraph = () => {
        setFormData(prev => ({
            ...prev,
            data: { ...prev.data, message: [...prev.data.message, ""] }
        }));
    };

    const removeParagraph = (index) => {
        const newMessage = formData.data.message.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            data: { ...prev.data, message: newMessage }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put("/api/content/chairman", formData);
            alert("Chairman's Desk updated successfully!");
        } catch (error) {
            console.error("Error saving data", error);
            alert("Failed to save data");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chairman Name</label>
                    <input
                        type="text"
                        value={formData.data.name}
                        onChange={(e) => setFormData({ ...formData, data: { ...formData.data, name: e.target.value } })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    <input
                        type="text"
                        value={formData.data.designation}
                        onChange={(e) => setFormData({ ...formData, data: { ...formData.data, designation: e.target.value } })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chairman's Photo</label>
                <div className="flex flex-col gap-3">
                    {formData.data.image && (
                        <div className="relative w-32 group">
                            <img
                                src={formData.data.image}
                                alt="Chairman"
                                className="w-32 h-32 object-cover rounded-full border"
                            />
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, data: { ...prev.data, image: "" } }))}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove Photo"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer hover:bg-gray-50 w-fit">
                        <Upload size={18} />
                        <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                    </label>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Message Content</label>
                    <button type="button" onClick={addParagraph} className="text-sm text-blue-600 flex items-center gap-1">
                        <Plus size={16} /> Add Paragraph
                    </button>
                </div>
                <div className="space-y-4">
                    {formData.data.message.map((para, index) => (
                        <div key={index} className="flex gap-2">
                            <textarea
                                value={para}
                                onChange={(e) => handleMessageChange(index, e.target.value)}
                                rows={3}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                placeholder={`Paragraph ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeParagraph(index)}
                                className="text-red-500 hover:text-red-700 self-start mt-2"
                                disabled={formData.data.message.length === 1}
                            >
                                <X size={20} />
                            </button>
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

export default ChairmanDeskForm;
