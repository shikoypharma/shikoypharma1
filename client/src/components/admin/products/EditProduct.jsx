import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import ProductForm from "./ProductForm";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Since the ID is passed, we use the ID endpoint.
                // Note: The existing routes use /products/id/:id for ID lookup.
                const { data } = await axios.get(`/api/products/id/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <div className="flex items-center mb-6">
                <button type="button" onClick={() => navigate(-1)} className="mr-4 text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold">Edit Product</h1>
            </div>
            <ProductForm initialData={product} isEdit={true} />
        </div>
    );
};

export default EditProduct;
