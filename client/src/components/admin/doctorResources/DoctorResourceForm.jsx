import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, X, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DoctorResourceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        category: "",
        rows: []
    });

    useEffect(() => {
        if (isEdit) {
            fetchResource();
        }
    }, [id]);

    const fetchResource = async () => {
        try {
            const { data } = await axios.get(`/api/doctor-resources/${id}`);
            setFormData(data);
        } catch (error) {
            console.error("Error fetching resource", error);
            alert("Failed to fetch resource");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addRow = () => {
        setFormData(prev => ({
            ...prev,
            rows: [...prev.rows, { genericName: "", brandName: "" }]
        }));
    };

    const updateRow = (index, field, value) => {
        const newRows = [...formData.rows];
        newRows[index][field] = value;
        setFormData({ ...formData, rows: newRows });
    };

    const removeRow = (index) => {
        setFormData(prev => ({
            ...prev,
            rows: prev.rows.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`/api/doctor-resources/${id}`, formData);
                alert("Resource updated successfully");
            } else {
                await axios.post("/api/doctor-resources", formData);
                alert("Resource created successfully");
            }
            navigate("/admin/doctor-resources");
        } catch (error) {
            console.error("Error saving resource", error);
            alert("Failed to save resource");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{isEdit ? "Edit Doctor Resource" : "Add Doctor Resource"}</h2>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    required
                />
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Medicines (Rows)</label>
                    <button type="button" onClick={addRow} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus size={16} /> Add Medicine
                    </button>
                </div>
                <div className="space-y-2">
                    {formData.rows.map((row, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={row.genericName}
                                onChange={(e) => updateRow(index, "genericName", e.target.value)}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                placeholder="Generic Name"
                            />
                            <input
                                type="text"
                                value={row.brandName}
                                onChange={(e) => updateRow(index, "brandName", e.target.value)}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                placeholder="Brand Name"
                            />
                            <button type="button" onClick={() => removeRow(index)} className="text-red-500 hover:text-red-700">
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Resource"}
                </button>
            </div>
        </form>
    );
};

export default DoctorResourceForm;
