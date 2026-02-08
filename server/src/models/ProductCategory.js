import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true }, 
    image: String,
    description: String,
    howItWorks: String,
    benefits: [String]
}, { timestamps: true });

export const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
