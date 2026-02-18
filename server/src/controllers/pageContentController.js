import PageContent from '../models/PageContent.js';

// @desc    Get page content by section
// @route   GET /api/content/:section
// @access  Public
const getContent = async (req, res) => {
    try {
        const { section } = req.params;
        const content = await PageContent.findOne({ section });

        if (content) {
            res.json(content);
        } else {
            // Return null or specific message if not found, instead of 404 to allow frontend to handle "create new" scenario gracefully if needed, 
            // but 404 is standard for "resource not found". 
            // For this use case, if content is missing, frontend might want to show default/static content or empty state.
            res.status(404).json({ message: 'Content not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update or Create page content
// @route   PUT /api/content/:section
// @access  Private/Admin
const updateContent = async (req, res) => {
    try {
        const { section } = req.params;
        const { title, data } = req.body;

        let content = await PageContent.findOne({ section });

        if (content) {
            content.title = title || content.title;
            content.data = data || content.data;
            content.lastUpdated = Date.now();
            const updatedContent = await content.save();
            res.json(updatedContent);
        } else {
            // Create new if not exists
            const newContent = await PageContent.create({
                section,
                title,
                data
            });
            res.status(201).json(newContent);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getContent, updateContent };
