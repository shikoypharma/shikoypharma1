import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Lazy-initialize storage so env vars from dotenv are available
let upload;
function getUpload() {
    if (!upload) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: 'shikoypharma_uploads',
                allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            },
        });

        upload = multer({ storage });
    }
    return upload;
}

router.post('/', (req, res) => {
    const uploader = getUpload();
    uploader.single('image')(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ message: 'Upload failed', error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }
        // Return the Cloudinary URL
        res.send(req.file.path);
    });
});

export default router;
