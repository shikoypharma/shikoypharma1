import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import path from "path";
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const createAdmin = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shikoypharma");
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Check if admin exists
        const adminExists = await User.findOne({ username: "admin" });

        if (adminExists) {
            console.log("Admin user already exists");
            process.exit();
        }

        // Create admin
        const user = await User.create({
            username: "admin",
            password: "password123", // Default password, should be changed
        });

        console.log(`Admin created: ${user.username}`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
