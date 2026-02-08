import { Expertise } from '../models/Expertise.js';

export const createExpertise = async (req, res) => {
    try {
        const newExpertise = new Expertise(req.body);
        const savedExpertise = await newExpertise.save();
        res.status(201).json(savedExpertise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getExpertise = async (req, res) => {
    try {
        const expertise = await Expertise.find();
        res.status(200).json(expertise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getExpertiseById = async (req, res) => {
    try {
        const expertise = await Expertise.findById(req.params.id);
        if (!expertise) return res.status(404).json({ message: "Expertise entry not found" });
        res.status(200).json(expertise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateExpertise = async (req, res) => {
    try {
        const updatedExpertise = await Expertise.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedExpertise) return res.status(404).json({ message: "Expertise entry not found" });
        res.status(200).json(updatedExpertise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteExpertise = async (req, res) => {
    try {
        const deletedExpertise = await Expertise.findByIdAndDelete(req.params.id);
        if (!deletedExpertise) return res.status(404).json({ message: "Expertise entry not found" });
        res.status(200).json({ message: "Expertise entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
