import express from 'express';
import {
    getGlobalData,
    createGlobalData,
    updateGlobalData
} from '../controllers/globalController.js';
import {
    getHomeData,
    createHomeData,
    updateHomeData
} from '../controllers/homeController.js';
import {
    getProducts,
    createProduct,
    getProductBySlug,
    getProductById,
    getProductsByCategory,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import {
    getAbout,
    createAbout,
    getAboutById,
    updateAbout,
    deleteAbout
} from '../controllers/aboutController.js';
import {
    getCareers,
    createCareer,
    getCareerById,
    updateCareer,
    deleteCareer
} from '../controllers/careerController.js';
import {
    getExpertise,
    createExpertise,
    getExpertiseById,
    updateExpertise,
    deleteExpertise
} from '../controllers/expertiseController.js';
import {
    getGallery,
    createGallery,
    getGalleryById,
    updateGallery,
    deleteGallery
} from '../controllers/galleryController.js';
import {
    getInfrastructure,
    createInfrastructure,
    getInfrastructureById,
    updateInfrastructure,
    deleteInfrastructure
} from '../controllers/infrastructureController.js';
import {
    getInquiries,
    createInquiry,
    getInquiryById,
    updateInquiryStatus,
    deleteInquiry
} from '../controllers/inquiryController.js';
import {
    getDoctorResources,
    createDoctorResource,
    getDoctorResourceById,
    updateDoctorResource,
    deleteDoctorResource
} from '../controllers/doctorResourceController.js';
import {
    getProductCategories,
    createProductCategory,
    getProductCategoryBySlug,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory
} from '../controllers/productCategoryController.js';
import {
    getContactPage,
    createContactPage,
    updateContactPage
} from '../controllers/contactPageController.js';
import {
    login,
    logout,
    getMe
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import {
    getContent,
    updateContent
} from '../controllers/pageContentController.js';


const router = express.Router();

// Auth Routes
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/me', protect, getMe);

// Global Routes
router.get('/global', getGlobalData);
router.post('/global', protect, isAdmin, createGlobalData);
router.put('/global', protect, isAdmin, updateGlobalData);

// Home Routes
router.get('/home', getHomeData);
router.post('/home', protect, isAdmin, createHomeData);
router.put('/home', protect, isAdmin, updateHomeData);

// Product Routes
router.get('/products', getProducts);
router.post('/products', protect, isAdmin, createProduct);
router.get('/products/slug/:slug', getProductBySlug); // Explicit path for slug
router.get('/products/:slug', getProductBySlug); // Keep existing for backward compatibility if needed, but risky with :id
router.get('/products/id/:id', getProductById);
router.get('/products/category/:category', getProductsByCategory);
router.put('/products/:id', protect, isAdmin, updateProduct);
router.delete('/products/:id', protect, isAdmin, deleteProduct);

// About Routes
router.get('/about', getAbout);
router.get('/about/:id', getAboutById);
router.post('/about', protect, isAdmin, createAbout);
router.put('/about/:id', protect, isAdmin, updateAbout);
router.delete('/about/:id', protect, isAdmin, deleteAbout);

// Career Routes
router.get('/career', getCareers);
router.get('/career/:id', getCareerById);
router.post('/career', protect, isAdmin, createCareer);
router.put('/career/:id', protect, isAdmin, updateCareer);
router.delete('/career/:id', protect, isAdmin, deleteCareer);

// Expertise Routes
router.get('/expertise', getExpertise);
router.get('/expertise/:id', getExpertiseById);
router.post('/expertise', protect, isAdmin, createExpertise);
router.put('/expertise/:id', protect, isAdmin, updateExpertise);
router.delete('/expertise/:id', protect, isAdmin, deleteExpertise);

// Gallery Routes
router.get('/gallery', getGallery);
router.get('/gallery/:id', getGalleryById);
router.post('/gallery', protect, isAdmin, createGallery);
router.put('/gallery/:id', protect, isAdmin, updateGallery);
router.delete('/gallery/:id', protect, isAdmin, deleteGallery);

// Infrastructure Routes
router.get('/infrastructure', getInfrastructure);
router.get('/infrastructure/:id', getInfrastructureById);
router.post('/infrastructure', protect, isAdmin, createInfrastructure);
router.put('/infrastructure/:id', protect, isAdmin, updateInfrastructure);
router.delete('/infrastructure/:id', protect, isAdmin, deleteInfrastructure);

// Inquiry Routes
router.get('/inquiry', protect, isAdmin, getInquiries); // Protect listening inquiries
router.post('/inquiry', createInquiry); // Public submit
router.get('/inquiry/:id', protect, isAdmin, getInquiryById);
router.put('/inquiry/:id/status', protect, isAdmin, updateInquiryStatus);
router.delete('/inquiry/:id', protect, isAdmin, deleteInquiry);

// Doctor Resource Routes
router.get('/doctor-resources', getDoctorResources);
router.get('/doctor-resources/:id', getDoctorResourceById);
router.post('/doctor-resources', protect, isAdmin, createDoctorResource);
router.put('/doctor-resources/:id', protect, isAdmin, updateDoctorResource);
router.delete('/doctor-resources/:id', protect, isAdmin, deleteDoctorResource);

// Product Category Routes
router.get('/product-categories', getProductCategories);
router.get('/product-categories/slug/:slug', getProductCategoryBySlug);
router.get('/product-categories/:id', getProductCategoryById);
router.post('/product-categories', protect, isAdmin, createProductCategory);
router.put('/product-categories/:id', protect, isAdmin, updateProductCategory);
router.delete('/product-categories/:id', protect, isAdmin, deleteProductCategory);


// Contact Page Routes
router.get('/contact-page', getContactPage);
router.post('/contact-page', protect, isAdmin, createContactPage);
router.put('/contact-page', protect, isAdmin, updateContactPage);

// Page Content Routes
router.get('/content/:section', getContent);
router.put('/content/:section', protect, isAdmin, updateContent);

export default router;
