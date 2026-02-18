import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/api/product-categories");
            setCategories(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching categories", error);
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await axios.delete(`/api/product-categories/${id}`);
                setCategories(categories.filter((cat) => cat._id !== id));
            } catch (error) {
                console.error("Error deleting category", error);
                alert("Failed to delete category");
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Category Manager</h1>
                <Link to="/admin/categories/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} />
                    Add Category
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <div key={cat._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {cat.image && (
                            <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cat.description}</p>

                            <div className="flex justify-end gap-2">
                                <Link to={`/admin/categories/edit/${cat._id}`} className="text-indigo-600 hover:text-indigo-900 p-2">
                                    <Edit size={20} />
                                </Link>
                                <button
                                    onClick={() => deleteCategory(cat._id)}
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

export default CategoryManager;
