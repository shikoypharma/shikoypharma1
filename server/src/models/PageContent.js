import mongoose from 'mongoose';

const pageContentSchema = mongoose.Schema({
    section: {
        type: String,
        required: true,
        unique: true, // e.g., 'corporate', 'chairman', 'mission'
    },
    title: {
        type: String,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Flexible structure for different content types
        required: true,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});

const PageContent = mongoose.model('PageContent', pageContentSchema);

export default PageContent;
