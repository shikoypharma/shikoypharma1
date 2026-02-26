import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Configure Cloudinary with env variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up the Cloudinary Storage Engine for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'shikoypharma_uploads', // The folder name in your Cloudinary console
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
    // Cloudinary automatically returns the secure URL of the uploaded image
    if (!req.file) {
        return res.status(400).send('No image provided');
    }
    // Return the Cloudinary URL. 
    res.send(req.file.path);
});

export default router;
