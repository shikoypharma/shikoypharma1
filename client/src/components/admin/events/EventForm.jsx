import { useState, useEffect } from "react";
import axios from "axios";
import { Upload, X, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const EventForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        location: "",
        description: "",
        images: []
    });

    useEffect(() => {
        if (isEdit) {
            fetchEvent();
        }
    }, [id]);

    const fetchEvent = async () => {
        try {
            const { data } = await axios.get(`/api/events/${id}`);
            // Format date for input field (YYYY-MM-DD)
            if (data.date) {
                data.date = new Date(data.date).toISOString().split('T')[0];
            }
            setFormData(data);
        } catch (error) {
            console.error("Error fetching event", error);
            alert("Failed to fetch event");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`/api/events/${id}`, formData);
                alert("Event updated successfully");
            } else {
                await axios.post("/api/events", formData);
                alert("Event created successfully");
            }
            navigate("/admin/events");
        } catch (error) {
            console.error("Error saving event", error);
            alert("Failed to save event");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{isEdit ? "Edit Event" : "Add Event"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
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
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <div className="flex flex-wrap gap-4">
                    {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                            <img src={img} alt={`Event ${index}`} className="h-24 w-24 object-cover rounded border" />
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

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Event"}
                </button>
            </div>
        </form>
    );
};

export default EventForm;
