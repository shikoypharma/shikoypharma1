import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true },
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
