import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
    type: { type: String, enum: ['corporate', 'chairman', 'mission', 'team', 'associates', 'certifications'], required: true, unique: true },
    title: String,
    heroImage: String,
    content: {
        description: [String], 
        mission: { title: String, description: String },
        vision: { title: String, description: String },
        values: [{ title: String, description: String }]
    },
    teamMembers: [{
        name: String,
        designation: String,
        image: String,
        bio: String
    }],
    images: [{
        src: String,
        alt: String,
        caption: String
    }]
}, { timestamps: true });

export const About = mongoose.model('About', aboutSchema);
