import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductForm from "./ProductForm";

const EditProduct = () => {
    const { id } = useParams();
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
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
            <ProductForm initialData={product} isEdit={true} />
        </div>
    );
};

export default EditProduct;
