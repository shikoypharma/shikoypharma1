import mongoose from 'mongoose';

const expertiseSchema = new mongoose.Schema({
    type: { type: String, enum: ['pcd', 'third-party', 'exporter'], required: true, unique: true },
    hero: {
        title: String,
        subtitle: String,
        image: String
    },
    intro: {
        title: String,
        content: [String],
        features: [String]
    },
    process: {
        title: String,
        steps: [{
            title: String,
            description: String
        }]
    },
    benefits: {
        title: String,
        items: [{
            title: String,
            description: String
        }]
    },
    whyChoose: {
        title: String,
        reasons: [{
            title: String,
            description: String,
            icon: String
        }]
    }
}, { timestamps: true });

export const Expertise = mongoose.model('Expertise', expertiseSchema);
