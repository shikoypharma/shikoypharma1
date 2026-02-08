import { Home } from '../models/Home.js';

export const getHomeData = async (req, res) => {
    try {
        const homeData = await Home.findOne();
        res.status(200).json(homeData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createHomeData = async (req, res) => {
    try {
        const existingHome = await Home.findOne();
        if (existingHome) {
            return res.status(400).json({ message: "Home data already exists. Use update instead." });
        }
        const newHome = new Home(req.body);
        const savedHome = await newHome.save();
        res.status(201).json(savedHome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateHomeData = async (req, res) => {
    try {
        const updatedHome = await Home.findOneAndUpdate(
            {},
            req.body,
            { new: true, runValidators: true, upsert: true }
        );
        res.status(200).json(updatedHome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
