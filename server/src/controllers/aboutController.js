import { About } from '../models/About.js';

export const createAbout = async (req, res) => {
    try {
        const newAbout = new About(req.body);
        const savedAbout = await newAbout.save();
        res.status(201).json(savedAbout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAbout = async (req, res) => {
    try {
        const about = await About.find();
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAboutById = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        if (!about) return res.status(404).json({ message: "About section not found" });
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAbout = async (req, res) => {
    try {
        const updatedAbout = await About.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedAbout) return res.status(404).json({ message: "About section not found" });
        res.status(200).json(updatedAbout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAbout = async (req, res) => {
    try {
        const deletedAbout = await About.findByIdAndDelete(req.params.id);
        if (!deletedAbout) return res.status(404).json({ message: "About section not found" });
        res.status(200).json({ message: "About section deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
