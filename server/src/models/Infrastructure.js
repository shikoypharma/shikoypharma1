import mongoose from 'mongoose';

const infrastructureSchema = new mongoose.Schema({
    type: { type: String, enum: ['quality-control', 'operations', 'rnd'], required: true, unique: true },
    title: String,
    hero: {
        title: String,
        description: String,
        image: String
    },
    sections: [{
        title: String,
        content: [String],
        image: String,
        list: [String]
    }]
}, { timestamps: true });

export const Infrastructure = mongoose.model('Infrastructure', infrastructureSchema);
