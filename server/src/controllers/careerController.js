import { Career } from '../models/Career.js';

export const createCareer = async (req, res) => {
    try {
        const newCareer = new Career(req.body);
        const savedCareer = await newCareer.save();
        res.status(201).json(savedCareer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCareers = async (req, res) => {
    try {
        const careers = await Career.find();
        res.status(200).json(careers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCareerById = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) return res.status(404).json({ message: "Career entry not found" });
        res.status(200).json(career);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCareer = async (req, res) => {
    try {
        const updatedCareer = await Career.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCareer) return res.status(404).json({ message: "Career entry not found" });
        res.status(200).json(updatedCareer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCareer = async (req, res) => {
    try {
        const deletedCareer = await Career.findByIdAndDelete(req.params.id);
        if (!deletedCareer) return res.status(404).json({ message: "Career entry not found" });
        res.status(200).json({ message: "Career entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
