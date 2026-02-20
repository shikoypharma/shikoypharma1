import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit, Plus, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const GalleryManager = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGalleries();
    }, []);

    const fetchGalleries = async () => {
        try {
            const { data } = await axios.get("/api/gallery");
            setGalleries(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching galleries", error);
            setLoading(false);
        }
    };

    const deleteGallery = async (id) => {
        if (window.confirm("Are you sure you want to delete this gallery item?")) {
            try {
                await axios.delete(`/api/gallery/${id}`);
                setGalleries(galleries.filter((g) => g._id !== id));
            } catch (error) {
                console.error("Error deleting gallery item", error);
                alert("Failed to delete gallery item");
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    const corporateGallery = galleries.filter(g => g.type === 'corporate');
    const productGallery = galleries.filter(g => g.type === 'product');

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gallery Manager</h1>
                <Link to="/admin/gallery/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} />
                    Add Item
                </Link>
            </div>

            <div className="space-y-8">
                {/* Corporate Gallery */}
                <div>
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Corporate Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {corporateGallery.map(item => (
                            <GalleryItemCard key={item._id} item={item} onDelete={deleteGallery} />
                        ))}
                    </div>
                    {corporateGallery.length === 0 && <p className="text-gray-500 italic">No corporate items.</p>}
                </div>

                {/* Product Gallery */}
                <div>
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Product Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productGallery.map(item => (
                            <GalleryItemCard key={item._id} item={item} onDelete={deleteGallery} />
                        ))}
                    </div>
                    {productGallery.length === 0 && <p className="text-gray-500 italic">No product items.</p>}
                </div>
            </div>
        </div>
    );
};

const GalleryItemCard = ({ item, onDelete }) => {
    const mainImage = item.images && item.images.length > 0 ? item.images[0].src : null;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {mainImage ? (
                <img src={mainImage} alt={item.title} className="w-full h-48 object-cover" />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    <ImageIcon size={32} />
                </div>
            )}
            <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{item.title || "Untitled"}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.images?.length || 0} images</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="flex justify-end gap-2">
                    <Link to={`/admin/gallery/edit/${item._id}`} className="text-indigo-600 hover:text-indigo-900 p-2">
                        <Edit size={20} />
                    </Link>
                    <button
                        onClick={() => onDelete(item._id)}
                        className="text-red-600 hover:text-red-900 p-2"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GalleryManager;
