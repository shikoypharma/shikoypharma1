import { DoctorResource } from '../models/DoctorResource.js';

export const createDoctorResource = async (req, res) => {
    try {
        const newResource = new DoctorResource(req.body);
        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getDoctorResources = async (req, res) => {
    try {
        const resources = await DoctorResource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDoctorResourceById = async (req, res) => {
    try {
        const resource = await DoctorResource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: "Resource not found" });
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDoctorResource = async (req, res) => {
    try {
        const updatedResource = await DoctorResource.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedResource) return res.status(404).json({ message: "Resource not found" });
        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteDoctorResource = async (req, res) => {
    try {
        const deletedResource = await DoctorResource.findByIdAndDelete(req.params.id);
        if (!deletedResource) return res.status(404).json({ message: "Resource not found" });
        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
