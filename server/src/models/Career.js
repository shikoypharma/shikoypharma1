import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
    title: String,
    intro: String,
    jobs: [{
        title: String,
        department: String,
        location: String,
        experience: String,
        description: String
    }],
    departments: [String]
}, { timestamps: true });

export const Career = mongoose.model('Career', careerSchema);
