import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/Product.js';
import { ProductCategory } from './models/ProductCategory.js';

dotenv.config();

const PRODUCT_CATEGORIES_DATA = {};

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data (optional, but good for clean seed)
        // await ProductCategory.deleteMany({});
        // await Product.deleteMany({});

        for (const [slug, data] of Object.entries(PRODUCT_CATEGORIES_DATA)) {
            console.log(`Processing category: ${data.name}`);

            // Upsert Category
            const category = await ProductCategory.findOneAndUpdate(
                { slug: slug },
                {
                    name: data.name,
                    slug: slug,
                    description: data.description,
                    howItWorks: data.howItWorks,
                    benefits: data.benefits
                },
                { upsert: true, new: true }
            );

            // Determine Label
            const getLabel = (catSlug, prodName) => {
                const name = prodName.toLowerCase();
                if (catSlug === 'antipsychotic' || catSlug === 'anti-depressants' || catSlug === 'anxiolytics' || catSlug === 'anti-alcoholism') return 'Psychiatric';
                if (catSlug === 'cerebral-activators' || catSlug === 'antiparkinsonian' || catSlug === 'anticonvulsants' || catSlug === 'antimigraine') return 'Neuro';
                if (catSlug === 'dermatological') return 'Derma';
                if (catSlug === 'antidiabetics') return 'Diabetic';
                if (catSlug === 'anti-hypertensives' || catSlug === 'antiplatelets') return 'Cardiac';

                // Cardiac Diabetic Range - Split based on name/composition
                if (catSlug === 'cardiac-diabetic') {
                    if (name.includes('metformin') || name.includes('glibenclamide') || name.includes('glimepiride') || name.includes('voglibose')) return 'Diabetic';
                    return 'Cardiac';
                }

                return 'General';
            };

            // Process Products
            if (data.products && data.products.length > 0) {
                for (const prod of data.products) {
                    await Product.findOneAndUpdate(
                        { name: prod.name },
                        {
                            name: prod.name,
                            slug: prod.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                            category: category.name, // Link by name as per current Product model
                            composition: prod.composition,
                            packing: prod.strength, // Mapping strength to packing
                            brand: "Lifecare", // Default brand for seeded data
                            label: getLabel(slug, prod.name),
                            images: [prod.image] // Use the image from data
                        },
                        { upsert: true, new: true }
                    );
                }
                console.log(`Processed ${data.products.length} products for ${data.name}`);
            }
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
