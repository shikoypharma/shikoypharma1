import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: Date,
    location: String,
    description: String,
    images: [String]
}, { timestamps: true });

export const Event = mongoose.model('Event', eventSchema);
