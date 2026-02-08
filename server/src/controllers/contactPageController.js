import { ContactPage } from '../models/ContactPage.js';

export const getContactPage = async (req, res) => {
    try {
        const contactPage = await ContactPage.findOne();
        res.status(200).json(contactPage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createContactPage = async (req, res) => {
    try {
        const existingPage = await ContactPage.findOne();
        if (existingPage) {
            return res.status(400).json({ message: "Contact page data already exists. Use update instead." });
        }
        const newPage = new ContactPage(req.body);
        const savedPage = await newPage.save();
        res.status(201).json(savedPage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateContactPage = async (req, res) => {
    try {
        const updatedPage = await ContactPage.findOneAndUpdate(
            {},
            req.body,
            { new: true, runValidators: true, upsert: true }
        );
        res.status(200).json(updatedPage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
