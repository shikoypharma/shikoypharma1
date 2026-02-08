import mongoose from 'mongoose';

const globalSchema = new mongoose.Schema({
    navbar: {
        logo: String,
        contact: { phone: String, email: String }
    },
    footer: {
        description: String,
        contactInfo: {
            address: String,
            phones: [String],
            emails: [String],
            website: String
        },
        socials: [{
            platform: String,
            url: String
        }]
    },
    topbar: {
        socials: [{ name: String, url: String }],
        contact: { phone: String, email: String }
    }
}, { timestamps: true });

export const Global = mongoose.model('Global', globalSchema);
