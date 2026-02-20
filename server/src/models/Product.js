import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    slug: { type: String, unique: true },
    category: String,
    description: String,
    images: [String],
    features: [String],
    specifications: [{
        label: String,
        value: String
    }],
    composition: String,
    packing: String,
    brand: String,
    label: {
        type: String,
        enum: ['Neuro', 'Psychiatric', 'Diabetic', 'Derma', 'Cardiac', 'General'],
        default: 'General'
    }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
