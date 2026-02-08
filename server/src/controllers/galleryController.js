import { Gallery } from '../models/Gallery.js';

export const createGallery = async (req, res) => {
    try {
        const newGallery = new Gallery(req.body);
        const savedGallery = await newGallery.save();
        res.status(201).json(savedGallery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find();
        res.status(200).json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGalleryById = async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (!gallery) return res.status(404).json({ message: "Gallery entry not found" });
        res.status(200).json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateGallery = async (req, res) => {
    try {
        const updatedGallery = await Gallery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedGallery) return res.status(404).json({ message: "Gallery entry not found" });
        res.status(200).json(updatedGallery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteGallery = async (req, res) => {
    try {
        const deletedGallery = await Gallery.findByIdAndDelete(req.params.id);
        if (!deletedGallery) return res.status(404).json({ message: "Gallery entry not found" });
        res.status(200).json({ message: "Gallery entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
