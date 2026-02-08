
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

const FOOTER_DATA = {
    products: ["Antidepressants", "Antibiotics", "Anti Allergic", "Anti Arthritic", "Anti Inflammatory"],
    quickLinks: ["Corporate Profile", "Our Core Team", "Certifications", "Manufacturing", "Operations", "Third Party Manufacturing", "PCD Franchise"],
    contactInfo: {
        phones: ["+91 9318058855", "+91 7876892878"],
        emails: ["info@lifecareneuro.com", "ib@lifecareneuro.com"],
        address: "70/1 Dharampur, Sai Road, Baddi, Himachal Pradesh 173205, India",
        website: "www.lifecareneuro.com"
    },
    socials: [
        { platform: "facebook", url: "https://facebook.com" },
        { platform: "twitter", url: "https://twitter.com" },
        { platform: "linkedin", url: "https://linkedin.com" }
    ]
};

const HERO_DATA = {
    slides: [
        { id: 1, image: "/hero1.webp", heading: "Lifecare Neuro Products Ltd.", subheading: "Quality Pharmaceutical Formulations" },
        { id: 2, image: "/hero1.webp", heading: "Trusted Since 1994", subheading: "Committed to Healthcare Excellence" },
        { id: 3, image: "/hero2.webp", heading: "Wide Product Portfolio", subheading: "Neuro • Psychiatry • Cardiac" }
    ]
};

const SERVICES_DATA = {
    title: "Our Expertise & Services",
    items: [
        { title: "Third Party Manufacturing", description: "High quality pharmaceutical manufacturing with WHO-GMP compliance.", icon: "🏭" },
        { title: "PCD Pharma Franchise", description: "Wide monopoly-based franchise opportunities across India.", icon: "📦" },
        { title: "Contract Manufacturing", description: "End-to-end contract manufacturing solutions.", icon: "⚙️" },
        { title: "Export Services", description: "Supplying pharma products across international markets.", icon: "🌍" }
    ]
};


const SAMPLE_PRODUCTS = [
    { name: "APROPRIDE 200", slug: "apropride-200", category: "antipsychotic", composition: "Amisulpride Tablets", packing: "10x10", images: ["/products/antipsychotics/apropride-200.jpg"] },
    { name: "APROPRIDE 50", slug: "apropride-50", category: "antipsychotic", composition: "Amisulpride Tablets", packing: "10x10", images: ["/products/antipsychotics/apropride-50.jpg"] },
    { name: "DOXYN 10", slug: "doxyn-10", category: "anti-depressants", composition: "Doxepin HCL", packing: "10x10", images: ["/products/anti-depressants/doxyn-10.jpg"] },
    { name: "DOMPERIDONE 10", slug: "domperidone-10", category: "antiemetics-vertigo", composition: "Domperidone", packing: "10x10", images: ["/products/antiemetics-vertigo/domperidone-10.jpg"] },
];

const importData = async () => {
    try {
        await Global.deleteMany();
        await Home.deleteMany();
        await Product.deleteMany();

        await Global.create({
            navbar: {
                logo: "/logo.png",
                contact: { phone: FOOTER_DATA.contactInfo.phones[0], email: FOOTER_DATA.contactInfo.emails.domestic }
            },
            footer: {
            }});

        await Home.create({
            hero: HERO_DATA,
            services: SERVICES_DATA,
            about: {
                title: "Welcome to Lifecare Neuro",
                description: "Lifecare Neuro Products Limited is a registered Indian Pharmaceutical Company engaged in the manufacturing and marketing of Pharmaceutical formulations.",
                image: "/about-home.jpg",
                highlights: ["WHO-GMP Certified", "ISO 9001:2015 Certified", "GLP Certified"]
            }
        });

        // Products
        await Product.insertMany(SAMPLE_PRODUCTS);

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
