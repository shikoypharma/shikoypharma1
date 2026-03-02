import ProductForm from "./ProductForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex items-center mb-6">
                <button type="button" onClick={() => navigate(-1)} className="mr-4 text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold">Add New Product</h1>
            </div>
            <ProductForm />
        </div>
    );
};

export default AddProduct;
