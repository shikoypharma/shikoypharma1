
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './src/models/Product.js';

dotenv.config();

const checkLabels = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const products = await Product.find({}, 'name category label');

        console.log('\n--- Product Labels Summary ---');
        const labelCounts = {};
        products.forEach(p => {
            labelCounts[p.label] = (labelCounts[p.label] || 0) + 1;
        });
        console.table(labelCounts);

        console.log('\n--- Products with Label "Neuro" ---');
        const neuroProducts = products.filter(p => p.label === 'Neuro');
        if (neuroProducts.length > 0) {
            console.table(neuroProducts.map(p => ({ name: p.name, category: p.category })));
        } else {
            console.log('No products found with label "Neuro"');
        }

        console.log('\n--- Sample of other products ---');
        console.table(products.slice(0, 5).map(p => ({ name: p.name, category: p.category, label: p.label })));

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkLabels();
