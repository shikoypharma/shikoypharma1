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
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js';
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
router.post('/global', protect, createGlobalData);
router.put('/global', protect, updateGlobalData);

// Home Routes
router.get('/home', getHomeData);
router.post('/home', protect, createHomeData);
router.put('/home', protect, updateHomeData);

// Product Routes
router.get('/products', getProducts);
router.post('/products', protect, createProduct);
router.get('/products/slug/:slug', getProductBySlug); // Explicit path for slug
router.get('/products/:slug', getProductBySlug); // Keep existing for backward compatibility if needed, but risky with :id
router.get('/products/id/:id', getProductById);
router.get('/products/category/:category', getProductsByCategory);
router.put('/products/:id', protect, updateProduct);
router.delete('/products/:id', protect, deleteProduct);

// About Routes
router.get('/about', getAbout);
router.post('/about', protect, createAbout);
router.get('/about/:id', getAboutById);
router.put('/about/:id', protect, updateAbout);
router.delete('/about/:id', protect, deleteAbout);

// Career Routes
router.get('/career', getCareers);
router.post('/career', protect, createCareer);
router.get('/career/:id', getCareerById);
router.put('/career/:id', protect, updateCareer);
router.delete('/career/:id', protect, deleteCareer);

// Expertise Routes
router.get('/expertise', getExpertise);
router.post('/expertise', protect, createExpertise);
router.get('/expertise/:id', getExpertiseById);
router.put('/expertise/:id', protect, updateExpertise);
router.delete('/expertise/:id', protect, deleteExpertise);

// Gallery Routes
router.get('/gallery', getGallery);
router.post('/gallery', protect, createGallery);
router.get('/gallery/:id', getGalleryById);
router.put('/gallery/:id', protect, updateGallery);
router.delete('/gallery/:id', protect, deleteGallery);

// Infrastructure Routes
router.get('/infrastructure', getInfrastructure);
router.post('/infrastructure', protect, createInfrastructure);
router.get('/infrastructure/:id', getInfrastructureById);
router.put('/infrastructure/:id', protect, updateInfrastructure);
router.delete('/infrastructure/:id', protect, deleteInfrastructure);

// Inquiry Routes
router.get('/inquiry', protect, getInquiries); // Protect listening inquiries
router.post('/inquiry', createInquiry); // Public submit
router.get('/inquiry/:id', protect, getInquiryById);
router.put('/inquiry/:id/status', protect, updateInquiryStatus);
router.delete('/inquiry/:id', protect, deleteInquiry);

// Doctor Resource Routes
router.get('/doctor-resources', getDoctorResources);
router.post('/doctor-resources', protect, createDoctorResource);
router.get('/doctor-resources/:id', getDoctorResourceById);
router.put('/doctor-resources/:id', protect, updateDoctorResource);
router.delete('/doctor-resources/:id', protect, deleteDoctorResource);

// Product Category Routes
router.get('/product-categories', getProductCategories);
router.post('/product-categories', protect, createProductCategory);
router.get('/product-categories/slug/:slug', getProductCategoryBySlug);
router.get('/product-categories/:id', getProductCategoryById);
router.put('/product-categories/:id', protect, updateProductCategory);
router.delete('/product-categories/:id', protect, deleteProductCategory);

// Event Routes
router.get('/events', getEvents);
router.post('/events', protect, createEvent);
router.get('/events/:id', getEventById);
router.put('/events/:id', protect, updateEvent);
router.delete('/events/:id', protect, deleteEvent);

// Contact Page Routes
router.get('/contact-page', getContactPage);
router.post('/contact-page', protect, createContactPage);
router.put('/contact-page', protect, updateContactPage);

// Page Content Routes
router.get('/content/:section', getContent);
router.put('/content/:section', protect, updateContent);

export default router;
