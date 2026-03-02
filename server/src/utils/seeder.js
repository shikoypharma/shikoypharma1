
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Global } from '../models/Global.js';
import { Home } from '../models/Home.js';
import { Product } from '../models/Product.js';
import { Expertise } from '../models/Expertise.js';
import { About } from '../models/About.js';
import { Infrastructure } from '../models/Infrastructure.js';
import { Gallery } from '../models/Gallery.js';
import { Career } from '../models/Career.js';
import { connectDB } from '../config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Global.deleteMany();
        await Home.deleteMany();
        await Product.deleteMany();

        await Global.create({
            navbar: {
                logo: "/logo.png",
                contact: { phone: "", email: "" }
            },
            footer: {
            }
        });

        await Home.create({
            hero: {},
            services: {},
            about: {}
        });

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Global.deleteMany();
        await Home.deleteMany();
        await Product.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
