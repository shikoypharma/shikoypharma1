import { useState, useEffect } from "react";
import axios from "axios";
import { Upload, X, Plus, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ initialData = {}, isEdit = false }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "",
        brand: "",
        description: "",
        composition: "",
        packing: "",
        images: [],
        features: [],
        specifications: [],
        ...initialData
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (initialData && initialData._id) {
            setFormData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData?._id]);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/api/product-categories");
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories", error);
            // Optional: alert("Failed to fetch categories");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Auto-generate slug from name if not manually edited
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

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            const { data } = await axios.post("/api/upload", formData, config);

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, data]
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

    // Features Management
    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    // Specifications Management
    const addSpecification = () => {
        setFormData(prev => ({
            ...prev,
            specifications: [...prev.specifications, { label: "", value: "" }]
        }));
    };

    const updateSpecification = (index, field, value) => {
        const newSpecs = [...formData.specifications];
        newSpecs[index][field] = value;
        setFormData({ ...formData, specifications: newSpecs });
    };

    const removeSpecification = (index) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await axios.put(`/api/products/${initialData._id}`, formData);
                alert("Product updated successfully");
            } else {
                await axios.post("/api/products", formData);
                alert("Product created successfully");
            }
            navigate("/admin/products");
        } catch (error) {
            console.error("Error saving product", error);
            alert(error.response?.data?.message || "Failed to save product");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-md">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label className="block text-sm font-medium text-gray-700">Label</label>
                    <select
                        name="label"
                        value={formData.label || "General"}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    >
                        {['Neuro', 'Psychiatric', 'Diabetic', 'Derma', 'Cardiac', 'General'].map(label => (
                            <option key={label} value={label}>{label}</option>
                        ))}
                    </select>
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
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
            </div>

            {/* Tech Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Composition</label>
                    <input
                        type="text"
                        name="composition"
                        value={formData.composition}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Packing</label>
                    <input
                        type="text"
                        name="packing"
                        value={formData.packing}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    />
                </div>
            </div>

            {/* Images */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <div className="flex flex-wrap gap-4">
                    {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                            <img src={img} alt={`Product ${index}`} className="h-24 w-24 object-cover rounded border" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                    <label className="h-24 w-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500">
                        <Upload size={24} className="text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">{uploading ? 'Uploading...' : 'Upload'}</span>
                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                    </label>
                </div>
            </div>

            {/* Features */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    <button type="button" onClick={addFeature} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus size={16} /> Add Feature
                    </button>
                </div>
                <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => updateFeature(index, e.target.value)}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                placeholder="Feature description"
                            />
                            <button type="button" onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700">
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Specifications */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Specifications</label>
                    <button type="button" onClick={addSpecification} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus size={16} /> Add Spec
                    </button>
                </div>
                <div className="space-y-2">
                    {formData.specifications.map((spec, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={spec.label}
                                onChange={(e) => updateSpecification(index, "label", e.target.value)}
                                className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                placeholder="Label"
                            />
                            <input
                                type="text"
                                value={spec.value}
                                onChange={(e) => updateSpecification(index, "value", e.target.value)}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                placeholder="Value"
                            />
                            <button type="button" onClick={() => removeSpecification(index)} className="text-red-500 hover:text-red-700">
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
                    {loading ? "Saving..." : "Save Product"}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
