import { useState, useEffect } from "react";
import axios from "axios";
import { Upload, X, Save, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ExpertiseForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        type: "pcd",
        hero: { title: "", subtitle: "", image: "" },
        intro: { title: "", content: [], features: [] },
        process: { title: "", steps: [] },
        benefits: { title: "", items: [] },
        whyChoose: { title: "", reasons: [] }
    });

    useEffect(() => {
        if (isEdit) {
            fetchExpertise();
        }
    }, [id]);

    const fetchExpertise = async () => {
        try {
            const { data } = await axios.get(`/api/expertise/${id}`);
            // Ensure array structures exist to prevent crashes if old data is missing them
            data.intro.content = data.intro.content || [];
            data.intro.features = data.intro.features || [];
            data.process.steps = data.process.steps || [];
            data.benefits.items = data.benefits.items || [];
            data.whyChoose.reasons = data.whyChoose.reasons || [];
            setFormData(data);
        } catch (error) {
            console.error("Error fetching expertise", error);
            alert("Failed to fetch expertise data");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNestedChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
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
            setFormData(prev => ({
                ...prev,
                hero: { ...prev.hero, image: data }
            }));
        } catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    // Generic Array Handlers
    const addArrayItem = (section, arrayName, newItem) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [arrayName]: [...prev[section][arrayName], newItem]
            }
        }));
    };

    const updateArrayItem = (section, arrayName, index, field, value) => {
        const newArray = [...formData[section][arrayName]];
        if (typeof newArray[index] === 'object') {
            newArray[index] = { ...newArray[index], [field]: value };
        } else {
            newArray[index] = value;
        }
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [arrayName]: newArray }
        }));
    };

    const removeArrayItem = (section, arrayName, index) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [arrayName]: prev[section][arrayName].filter((_, i) => i !== index)
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`/api/expertise/${id}`, formData);
                alert("Expertise updated successfully");
            } else {
                await axios.post("/api/expertise", formData);
                alert("Expertise created successfully");
            }
            navigate("/admin/expertise");
        } catch (error) {
            console.error("Error saving expertise", error);
            alert("Failed to save expertise");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-5xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold">{isEdit ? "Edit Expertise" : "Add Expertise"}</h2>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                >
                    <option value="pcd">PCD Pharma</option>
                    <option value="third-party">Third Party Manufacturing</option>
                    <option value="exporter">Exporter</option>
                </select>
            </div>

            {/* Hero Section */}
            <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-bold mb-4">Hero Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={formData.hero.title}
                            onChange={(e) => handleNestedChange("hero", "title", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                            type="text"
                            value={formData.hero.subtitle}
                            onChange={(e) => handleNestedChange("hero", "subtitle", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                    <div className="flex items-center gap-4">
                        {formData.hero.image && (
                            <img src={formData.hero.image} alt="Hero" className="h-24 w-auto border rounded" />
                        )}
                        <label className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 flex items-center gap-2 bg-white">
                            <Upload size={16} />
                            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                        </label>
                    </div>
                </div>
            </div>

            {/* Intro Section */}
            <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-bold mb-4">Intro Section</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={formData.intro.title}
                        onChange={(e) => handleNestedChange("intro", "title", e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Content Paragraphs</label>
                        <button type="button" onClick={() => addArrayItem("intro", "content", "")} className="text-sm text-blue-600 flex items-center gap-1"><Plus size={16} /> Add Paragraph</button>
                    </div>
                    {formData.intro.content.map((para, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            <textarea value={para} onChange={(e) => updateArrayItem("intro", "content", i, null, e.target.value)} rows={2} className="flex-1 min-w-0 border p-2 rounded" />
                            <button type="button" onClick={() => removeArrayItem("intro", "content", i)} className="text-red-500"><X size={20} /></button>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Features List</label>
                        <button type="button" onClick={() => addArrayItem("intro", "features", "")} className="text-sm text-blue-600 flex items-center gap-1"><Plus size={16} /> Add Feature</button>
                    </div>
                    {formData.intro.features.map((feat, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            <input type="text" value={feat} onChange={(e) => updateArrayItem("intro", "features", i, null, e.target.value)} className="flex-1 min-w-0 border p-2 rounded" />
                            <button type="button" onClick={() => removeArrayItem("intro", "features", i)} className="text-red-500"><X size={20} /></button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Process Section */}
            <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-bold mb-4">Process Section</h3>
                <input
                    type="text"
                    value={formData.process.title}
                    onChange={(e) => handleNestedChange("process", "title", e.target.value)}
                    placeholder="Section Title"
                    className="w-full border p-2 rounded mb-4"
                />
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Steps</label>
                    <button type="button" onClick={() => addArrayItem("process", "steps", { title: "", description: "" })} className="text-sm text-blue-600 flex items-center gap-1"><Plus size={16} /> Add Step</button>
                </div>
                {formData.process.steps.map((step, i) => (
                    <div key={i} className="border p-2 rounded mb-2 bg-white relative">
                        <button type="button" onClick={() => removeArrayItem("process", "steps", i)} className="text-red-500 absolute top-2 right-2"><X size={20} /></button>
                        <input
                            type="text"
                            value={step.title}
                            onChange={(e) => updateArrayItem("process", "steps", i, "title", e.target.value)}
                            placeholder="Step Title"
                            className="w-full border p-2 rounded mb-2"
                        />
                        <textarea
                            value={step.description}
                            onChange={(e) => updateArrayItem("process", "steps", i, "description", e.target.value)}
                            placeholder="Description"
                            rows={2}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                ))}
            </div>

            {/* Benefits Section */}
            <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-bold mb-4">Benefits Section</h3>
                <input
                    type="text"
                    value={formData.benefits.title}
                    onChange={(e) => handleNestedChange("benefits", "title", e.target.value)}
                    placeholder="Section Title"
                    className="w-full border p-2 rounded mb-4"
                />
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Benefit Items</label>
                    <button type="button" onClick={() => addArrayItem("benefits", "items", { title: "", description: "" })} className="text-sm text-blue-600 flex items-center gap-1"><Plus size={16} /> Add Item</button>
                </div>
                {formData.benefits.items.map((item, i) => (
                    <div key={i} className="border p-2 rounded mb-2 bg-white relative">
                        <button type="button" onClick={() => removeArrayItem("benefits", "items", i)} className="text-red-500 absolute top-2 right-2"><X size={20} /></button>
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateArrayItem("benefits", "items", i, "title", e.target.value)}
                            placeholder="Title"
                            className="w-full border p-2 rounded mb-2"
                        />
                        <textarea
                            value={item.description}
                            onChange={(e) => updateArrayItem("benefits", "items", i, "description", e.target.value)}
                            placeholder="Description"
                            rows={2}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Expertise"}
                </button>
            </div>
        </form>
    );
};

export default ExpertiseForm;
