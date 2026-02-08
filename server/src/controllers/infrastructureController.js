import { Infrastructure } from '../models/Infrastructure.js';

export const createInfrastructure = async (req, res) => {
    try {
        const newInfrastructure = new Infrastructure(req.body);
        const savedInfrastructure = await newInfrastructure.save();
        res.status(201).json(savedInfrastructure);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getInfrastructure = async (req, res) => {
    try {
        const infrastructure = await Infrastructure.find();
        res.status(200).json(infrastructure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInfrastructureById = async (req, res) => {
    try {
        const infrastructure = await Infrastructure.findById(req.params.id);
        if (!infrastructure) return res.status(404).json({ message: "Infrastructure entry not found" });
        res.status(200).json(infrastructure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInfrastructure = async (req, res) => {
    try {
        const updatedInfrastructure = await Infrastructure.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedInfrastructure) return res.status(404).json({ message: "Infrastructure entry not found" });
        res.status(200).json(updatedInfrastructure);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteInfrastructure = async (req, res) => {
    try {
        const deletedInfrastructure = await Infrastructure.findByIdAndDelete(req.params.id);
        if (!deletedInfrastructure) return res.status(404).json({ message: "Infrastructure entry not found" });
        res.status(200).json({ message: "Infrastructure entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
