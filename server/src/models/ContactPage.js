import mongoose from 'mongoose';

const contactPageSchema = new mongoose.Schema({
    title: { type: String, default: "Contact Us" },
    introduction: String,
    mapUrl: String,
    offices: [{
        title: String,
        address: String,
        phones: [String],
        emails: [{
            label: String,
            email: String
        }]
    }]
}, { timestamps: true });

export const ContactPage = mongoose.model('ContactPage', contactPageSchema);
