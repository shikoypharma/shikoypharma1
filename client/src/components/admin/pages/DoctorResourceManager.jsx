import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorResourceManager = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const { data } = await axios.get("/api/doctor-resources");
            setResources(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching resources", error);
            setLoading(false);
        }
    };

    const deleteResource = async (id) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
            try {
                await axios.delete(`/api/doctor-resources/${id}`);
                setResources(resources.filter((res) => res._id !== id));
            } catch (error) {
                console.error("Error deleting resource", error);
                alert("Failed to delete resource");
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Doctor Resources</h1>
                <Link to="/admin/doctor-resources/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} />
                    Add Resource
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Medicines Count
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {resources.map((res) => (
                            <tr key={res._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{res.category}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{res.rows?.length || 0}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link to={`/admin/doctor-resources/edit/${res._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4 inline-block">
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => deleteResource(res._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorResourceManager;
