import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit, Plus, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const CareerManager = () => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            const { data } = await axios.get("/api/career");
            setCareers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching careers", error);
            setLoading(false);
        }
    };

    const deleteCareer = async (id) => {
        if (window.confirm("Are you sure you want to delete this career listing?")) {
            try {
                await axios.delete(`/api/career/${id}`);
                setCareers(careers.filter((c) => c._id !== id));
            } catch (error) {
                console.error("Error deleting career", error);
                alert("Failed to delete career");
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Career Manager</h1>
                <Link to="/admin/career/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} />
                    Add Career
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careers.map((career) => (
                    <div key={career._id} className="bg-white rounded-lg shadow-md overflow-hidden p-6 relative">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Link to={`/admin/career/edit/${career._id}`} className="text-indigo-600 hover:text-indigo-900">
                                <Edit size={20} />
                            </Link>
                            <button
                                onClick={() => deleteCareer(career._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <Briefcase size={20} className="text-gray-500" />
                            {career.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{career.intro}</p>

                        <div className="space-y-2">
                            <p className="text-sm font-semibold">Open Positions ({career.jobs?.length || 0}):</p>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {career.jobs?.slice(0, 3).map((job, idx) => (
                                    <li key={idx}>{job.title} ({job.location})</li>
                                ))}
                                {(career.jobs?.length || 0) > 3 && <li>...and more</li>}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CareerManager;
