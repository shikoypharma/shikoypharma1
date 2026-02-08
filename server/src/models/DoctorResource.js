import mongoose from 'mongoose';

const doctorResourceSchema = new mongoose.Schema({
    category: { type: String, required: true },
    rows: [{
        original: String,
        genericName: String,
        brandName: String,
    }]
}, { timestamps: true });

export const DoctorResource = mongoose.model('DoctorResource', doctorResourceSchema);
