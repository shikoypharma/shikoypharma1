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

const router = express.Router();

// Global Routes
router.get('/global', getGlobalData);
router.post('/global', createGlobalData);
router.put('/global', updateGlobalData);

// Home Routes
router.get('/home', getHomeData);
router.post('/home', createHomeData);
router.put('/home', updateHomeData);

// Product Routes
router.get('/products', getProducts);
router.post('/products', createProduct);
router.get('/products/slug/:slug', getProductBySlug); // Explicit path for slug
router.get('/products/:slug', getProductBySlug); // Keep existing for backward compatibility if needed, but risky with :id
router.get('/products/id/:id', getProductById);
router.get('/products/category/:category', getProductsByCategory);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// About Routes
router.get('/about', getAbout);
router.post('/about', createAbout);
router.get('/about/:id', getAboutById);
router.put('/about/:id', updateAbout);
router.delete('/about/:id', deleteAbout);

// Career Routes
router.get('/career', getCareers);
router.post('/career', createCareer);
router.get('/career/:id', getCareerById);
router.put('/career/:id', updateCareer);
router.delete('/career/:id', deleteCareer);

// Expertise Routes
router.get('/expertise', getExpertise);
router.post('/expertise', createExpertise);
router.get('/expertise/:id', getExpertiseById);
router.put('/expertise/:id', updateExpertise);
router.delete('/expertise/:id', deleteExpertise);

// Gallery Routes
router.get('/gallery', getGallery);
router.post('/gallery', createGallery);
router.get('/gallery/:id', getGalleryById);
router.put('/gallery/:id', updateGallery);
router.delete('/gallery/:id', deleteGallery);

// Infrastructure Routes
router.get('/infrastructure', getInfrastructure);
router.post('/infrastructure', createInfrastructure);
router.get('/infrastructure/:id', getInfrastructureById);
router.put('/infrastructure/:id', updateInfrastructure);
router.delete('/infrastructure/:id', deleteInfrastructure);

// Inquiry Routes
router.get('/inquiry', getInquiries);
router.post('/inquiry', createInquiry);
router.get('/inquiry/:id', getInquiryById);
router.put('/inquiry/:id/status', updateInquiryStatus);
router.delete('/inquiry/:id', deleteInquiry);

// Doctor Resource Routes
router.get('/doctor-resources', getDoctorResources);
router.post('/doctor-resources', createDoctorResource);
router.get('/doctor-resources/:id', getDoctorResourceById);
router.put('/doctor-resources/:id', updateDoctorResource);
router.delete('/doctor-resources/:id', deleteDoctorResource);

// Product Category Routes
router.get('/product-categories', getProductCategories);
router.post('/product-categories', createProductCategory);
router.get('/product-categories/slug/:slug', getProductCategoryBySlug);
router.get('/product-categories/:id', getProductCategoryById);
router.put('/product-categories/:id', updateProductCategory);
router.delete('/product-categories/:id', deleteProductCategory);

// Event Routes
router.get('/events', getEvents);
router.post('/events', createEvent);
router.get('/events/:id', getEventById);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Contact Page Routes
router.get('/contact-page', getContactPage);
router.post('/contact-page', createContactPage);
router.put('/contact-page', updateContactPage);

export default router;
