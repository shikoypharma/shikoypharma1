import { useState, useEffect } from "react";
import axios from "axios";
import { Save } from "lucide-react";

const MissionVisionForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "Mission, Vision & Business Values",
        data: {
            mission: { title: "Our Mission", description: "" },
            vision: { title: "Our Vision", description: "" },
            values: { title: "Business Values", description: "" }
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/content/mission");
            if (data) {
                setFormData({
                    title: data.title || "Mission, Vision & Business Values",
                    data: {
                        mission: data.data?.mission || { title: "Our Mission", description: "" },
                        vision: data.data?.vision || { title: "Our Vision", description: "" },
                        values: data.data?.values || { title: "Business Values", description: "" }
                    }
                });
            }
        } catch (error) {
            console.log("No existing data found, using defaults");
        }
    };

    const handleSectionChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            data: {
                ...prev.data,
                [section]: {
                    ...prev.data[section],
                    [field]: value
                }
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put("/api/content/mission", formData);
            alert("Mission & Vision updated successfully!");
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

            <div className="grid md:grid-cols-3 gap-6">
                {/* Mission */}
                <div className="p-4 border rounded bg-gray-50 space-y-4">
                    <h3 className="font-semibold text-gray-700">Mission</h3>
                    <div>
                        <label className="block text-xs font-medium text-gray-500">Title</label>
                        <input
                            type="text"
                            value={formData.data.mission.title}
                            onChange={(e) => handleSectionChange("mission", "title", e.target.value)}
                            className="w-full rounded border-gray-300 border p-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500">Description</label>
                        <textarea
                            value={formData.data.mission.description}
                            onChange={(e) => handleSectionChange("mission", "description", e.target.value)}
                            rows={6}
                            className="w-full rounded border-gray-300 border p-2 text-sm"
                        />
                    </div>
                </div>

                {/* Vision */}
                <div className="p-4 border rounded bg-gray-50 space-y-4">
                    <h3 className="font-semibold text-gray-700">Vision</h3>
                    <div>
                        <label className="block text-xs font-medium text-gray-500">Title</label>
                        <input
                            type="text"
                            value={formData.data.vision.title}
                            onChange={(e) => handleSectionChange("vision", "title", e.target.value)}
                            className="w-full rounded border-gray-300 border p-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500">Description</label>
                        <textarea
                            value={formData.data.vision.description}
                            onChange={(e) => handleSectionChange("vision", "description", e.target.value)}
                            rows={6}
                            className="w-full rounded border-gray-300 border p-2 text-sm"
                        />
                    </div>
                </div>

                {/* Values */}
                <div className="p-4 border rounded bg-gray-50 space-y-4">
                    <h3 className="font-semibold text-gray-700">Values</h3>
                    <div>
                        <label className="block text-xs font-medium text-gray-500">Title</label>
                        <input
                            type="text"
                            value={formData.data.values.title}
                            onChange={(e) => handleSectionChange("values", "title", e.target.value)}
                            className="w-full rounded border-gray-300 border p-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500">Description</label>
                        <textarea
                            value={formData.data.values.description}
                            onChange={(e) => handleSectionChange("values", "description", e.target.value)}
                            rows={6}
                            className="w-full rounded border-gray-300 border p-2 text-sm"
                        />
                    </div>
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

export default MissionVisionForm;
