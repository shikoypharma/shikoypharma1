import { Global } from '../models/Global.js';

export const getGlobalData = async (req, res) => {
    try {
        const globalData = await Global.findOne();
        res.status(200).json(globalData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createGlobalData = async (req, res) => {
    try {
        const existingGlobal = await Global.findOne();
        if (existingGlobal) {
            return res.status(400).json({ message: "Global data already exists. Use update instead." });
        }
        const newGlobal = new Global(req.body);
        const savedGlobal = await newGlobal.save();
        res.status(201).json(savedGlobal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateGlobalData = async (req, res) => {
    try {
        const updatedGlobal = await Global.findOneAndUpdate(
            {},
            req.body,
            { new: true, runValidators: true, upsert: true }
        );
        res.status(200).json(updatedGlobal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
