import { useState, useEffect } from "react";
import axios from "axios";
import { Upload, X, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const GalleryForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        type: "corporate",
        title: "",
        description: "",
        images: []
    });

    useEffect(() => {
        if (isEdit) {
            fetchGallery();
        }
    }, [id]);

    const fetchGallery = async () => {
        try {
            const { data } = await axios.get(`/api/gallery/${id}`);
            setFormData(data);
        } catch (error) {
            console.error("Error fetching gallery", error);
            alert("Failed to fetch gallery");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("image", file);

        setUploading(true);
        try {
            const config = { headers: { "Content-Type": "multipart/form-data" } };
            const { data } = await axios.post("/api/upload", uploadData, config);

            // Add new image with default structure
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, { src: data, alt: "", category: "" }]
            }));
        } catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const updateImageField = (index, field, value) => {
        const newImages = [...formData.images];
        newImages[index][field] = value;
        setFormData({ ...formData, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`/api/gallery/${id}`, formData);
                alert("Gallery item updated successfully");
            } else {
                await axios.post("/api/gallery", formData);
                alert("Gallery item created successfully");
            }
            navigate("/admin/gallery");
        } catch (error) {
            console.error("Error saving gallery item", error);
            alert("Failed to save gallery item");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{isEdit ? "Edit Gallery Item" : "Add Gallery Item"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    >
                        <option value="corporate">Corporate</option>
                        <option value="product">Product</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <div className="space-y-4">
                    {formData.images.map((img, index) => (
                        <div key={index} className="flex gap-4 items-start border p-4 rounded bg-gray-50 relative">
                            <img src={img.src} alt={`Gallery ${index}`} className="h-24 w-24 object-cover rounded border" />
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">Alt Text</label>
                                    <input
                                        type="text"
                                        value={img.alt}
                                        onChange={(e) => updateImageField(index, "alt", e.target.value)}
                                        className="w-full text-sm border p-1 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">Category Tag</label>
                                    <input
                                        type="text"
                                        value={img.category}
                                        onChange={(e) => updateImageField(index, "category", e.target.value)}
                                        className="w-full text-sm border p-1 rounded"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}

                    <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                        <div className="flex flex-col items-center">
                            <Upload size={24} className="text-gray-400" />
                            <span className="text-sm text-gray-500 mt-1">{uploading ? 'Uploading...' : 'Upload Image'}</span>
                        </div>
                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                    </label>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Gallery Item"}
                </button>
            </div>
        </form>
    );
};

export default GalleryForm;
