import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    type: { type: String, enum: ['corporate', 'product'], required: true },
    title: String,
    description: String,
    images: [{
        src: String,
        alt: String,
        category: String 
    }]
}, { timestamps: true });

export const Gallery = mongoose.model('Gallery', gallerySchema);
