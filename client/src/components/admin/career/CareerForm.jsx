import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, X, Save, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const CareerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        intro: "",
        departments: [],
        jobs: []
    });

    useEffect(() => {
        if (isEdit) {
            fetchCareer();
        }
    }, [id]);

    const fetchCareer = async () => {
        try {
            const { data } = await axios.get(`/api/career/${id}`);
            setFormData(data);
        } catch (error) {
            console.error("Error fetching career", error);
            alert("Failed to fetch career");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Departments
    const addDepartment = () => {
        setFormData(prev => ({ ...prev, departments: [...prev.departments, ""] }));
    };

    const updateDepartment = (index, value) => {
        const newDepts = [...formData.departments];
        newDepts[index] = value;
        setFormData({ ...formData, departments: newDepts });
    };

    const removeDepartment = (index) => {
        setFormData(prev => ({
            ...prev,
            departments: prev.departments.filter((_, i) => i !== index)
        }));
    };

    // Jobs
    const addJob = () => {
        setFormData(prev => ({
            ...prev,
            jobs: [...prev.jobs, { title: "", department: "", location: "", experience: "", description: "" }]
        }));
    };

    const updateJob = (index, field, value) => {
        const newJobs = [...formData.jobs];
        newJobs[index][field] = value;
        setFormData({ ...formData, jobs: newJobs });
    };

    const removeJob = (index) => {
        setFormData(prev => ({
            ...prev,
            jobs: prev.jobs.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`/api/career/${id}`, formData);
                alert("Career updated successfully");
            } else {
                await axios.post("/api/career", formData);
                alert("Career created successfully");
            }
            navigate("/admin/career");
        } catch (error) {
            console.error("Error saving career", error);
            alert("Failed to save career");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
                <button type="button" onClick={() => navigate(-1)} className="mr-4 text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold">{isEdit ? "Edit Career Section" : "Add Career Section"}</h2>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Title (e.g., Careers at Shikoy)</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Intro</label>
                <textarea
                    name="intro"
                    value={formData.intro}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Departments</label>
                    <button type="button" onClick={addDepartment} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus size={16} /> Add Dept
                    </button>
                </div>
                <div className="space-y-2">
                    {formData.departments.map((dept, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={dept}
                                onChange={(e) => updateDepartment(index, e.target.value)}
                                className="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                placeholder="Department Name"
                            />
                            <button type="button" onClick={() => removeDepartment(index)} className="text-red-500 hover:text-red-700">
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Job Openings</label>
                    <button type="button" onClick={addJob} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus size={16} /> Add Job
                    </button>
                </div>
                <div className="space-y-4">
                    {formData.jobs.map((job, index) => (
                        <div key={index} className="border p-4 rounded bg-gray-50 relative">
                            <button type="button" onClick={() => removeJob(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                <X size={20} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                <input
                                    type="text"
                                    value={job.title}
                                    onChange={(e) => updateJob(index, "title", e.target.value)}
                                    placeholder="Job Title"
                                    className="border p-2 rounded w-full"
                                />
                                <input
                                    type="text"
                                    value={job.department}
                                    onChange={(e) => updateJob(index, "department", e.target.value)}
                                    placeholder="Department"
                                    className="border p-2 rounded w-full"
                                />
                                <input
                                    type="text"
                                    value={job.location}
                                    onChange={(e) => updateJob(index, "location", e.target.value)}
                                    placeholder="Location"
                                    className="border p-2 rounded w-full"
                                />
                                <input
                                    type="text"
                                    value={job.experience}
                                    onChange={(e) => updateJob(index, "experience", e.target.value)}
                                    placeholder="Experience"
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <textarea
                                value={job.description}
                                onChange={(e) => updateJob(index, "description", e.target.value)}
                                placeholder="Job Description"
                                rows={2}
                                className="border p-2 rounded w-full"
                            />
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
                    {loading ? "Saving..." : "Save Career"}
                </button>
            </div>
        </form>
    );
};

export default CareerForm;
