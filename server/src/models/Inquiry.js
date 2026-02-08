import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    message: String,
    subject: String,
    type: { type: String, enum: ['contact', 'career', 'franchise', 'export'], default: 'contact' },
    status: { type: String, default: 'new' }
}, { timestamps: true });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
