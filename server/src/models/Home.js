import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema({
    hero: {
        slides: [{
            id: Number,
            image: String,
            heading: String,
            subheading: String
        }]
    },
    about: {
        title: String,
        description: String,
        image: String,
        highlights: [String]
    },
    services: {
        title: String,
        items: [{
            icon: String,
            title: String,
            description: String
        }]
    },
    associates: {
        title: String,
        logos: [{
            src: String,
            alt: String
        }]
    },
    globalPresence: {
        title: String,
        description: String,
        mapImage: String,
        stats: [{
            value: String,
            label: String
        }]
    }
}, { timestamps: true });

export const Home = mongoose.model('Home', homeSchema);
