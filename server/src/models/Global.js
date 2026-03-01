import mongoose from 'mongoose';

const globalSchema = new mongoose.Schema({
    navbar: {
        logo: String,
        contact: { phone: String, email: String }
    },
    topbar: {
        socials: [{ name: String, url: String }],
        links: [{ label: String, path: String, highlight: { type: Boolean, default: false } }],
        contact: { phone: String, email: String }
    },
    footer: {
        description: String,
        products: [{ label: String, href: String }],
        quickLinks: [{ label: String, href: String }],
        contact: {
            phones: [String],
            emails: {
                domestic: String,
                export: String
            }
        },
        addresses: {
            manufacturing: String,
            corporate: String
        },
        socials: [{
            platform: String,
            url: String
        }],
        copyrightText: String
    }
}, { timestamps: true });

export const Global = mongoose.model('Global', globalSchema);
