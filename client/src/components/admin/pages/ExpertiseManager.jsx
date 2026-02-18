import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit, Plus, Award } from "lucide-react";
import { Link } from "react-router-dom";

const ExpertiseManager = () => {
    const [expertise, setExpertise] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExpertise();
    }, []);

    const fetchExpertise = async () => {
        try {
            const { data } = await axios.get("/api/expertise");
            setExpertise(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching expertise", error);
            setLoading(false);
        }
    };

    const deleteExpertise = async (id) => {
        if (window.confirm("Are you sure you want to delete this expertise section?")) {
            try {
                await axios.delete(`/api/expertise/${id}`);
                setExpertise(expertise.filter((e) => e._id !== id));
            } catch (error) {
                console.error("Error deleting expertise", error);
                alert("Failed to delete expertise");
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Expertise Manager</h1>
                <Link to="/admin/expertise/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} />
                    Add Expertise
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expertise.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {(item.hero && item.hero.image) && (
                            <img src={item.hero.image} alt={item.type} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2 uppercase flex items-center gap-2">
                                <Award size={20} />
                                {item.type}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.hero?.title}</p>

                            <div className="flex justify-end gap-2">
                                <Link to={`/admin/expertise/edit/${item._id}`} className="text-indigo-600 hover:text-indigo-900 p-2">
                                    <Edit size={20} />
                                </Link>
                                <button
                                    onClick={() => deleteExpertise(item._id)}
                                    className="text-red-600 hover:text-red-900 p-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpertiseManager;
