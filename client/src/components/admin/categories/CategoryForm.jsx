import { useState, useEffect } from "react";
import axios from "axios";
import { Upload, X, Plus, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const CategoryForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        image: "",
        description: "",
        howItWorks: "",
        benefits: []
    });

    useEffect(() => {
        if (isEdit) {
            fetchCategory();
        }
    }, [id]);

    const fetchCategory = async () => {
        try {
            const { data } = await axios.get(`/api/product-categories/${id}`);
            setFormData(data);
        } catch (error) {
            console.error("Error fetching category", error);
            alert("Failed to fetch category");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "name" && !isEdit) {
            setFormData(prev => ({
                ...prev,
                name: value,
                slug: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
            }));
        }
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
            setFormData(prev => ({ ...prev, image: data }));
        } catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    // Benefits Management
    const addBenefit = () => {
        setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ""] }));
    };

    const updateBenefit = (index, value) => {
        const newBenefits = [...formData.benefits];
        newBenefits[index] = value;
        setFormData({ ...formData, benefits: newBenefits });
    };

    const removeBenefit = (index) => {
        setFormData(prev => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`/api/product-categories/${id}`, formData);
                alert("Category updated successfully");
            } else {
                await axios.post("/api/product-categories", formData);
                alert("Category created successfully");
            }
            navigate("/admin/categories");
        } catch (error) {
            console.error("Error saving category", error);
            alert(error.response?.data?.message || "Failed to save category");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{isEdit ? "Edit Category" : "Add Category"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        required
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                <div className="flex items-center gap-4">
                    {formData.image && (
                        <div className="relative group">
                            <img src={formData.image} alt="Category" className="h-32 w-32 object-cover rounded border" />
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                    <label className="h-32 w-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500">
                        <Upload size={24} className="text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">{uploading ? 'Uploading...' : 'Upload'}</span>
                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                    </label>
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
                <label className="block text-sm font-medium text-gray-700">How It Works</label>
                <textarea
                    name="howItWorks"
                    value={formData.howItWorks}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Benefits</label>
                    <button type="button" onClick={addBenefit} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus size={16} /> Add Benefit
                    </button>
                </div>
                <div className="space-y-2">
                    {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={benefit}
                                onChange={(e) => updateBenefit(index, e.target.value)}
                                className="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                placeholder={`Benefit ${index + 1}`}
                            />
                            <button type="button" onClick={() => removeBenefit(index)} className="text-red-500 hover:text-red-700">
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Category"}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
