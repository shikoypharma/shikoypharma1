import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/admin/layout/AdminLayout";
import PrivateRoute from "./components/admin/layout/PrivateRoute";

// Admin Pages
import AdminLogin from "./components/admin/AdminLogin";
import Dashboard from "./components/admin/pages/Dashboard";
import ProductManager from "./components/admin/pages/ProductManager";
import AddProduct from "./components/admin/products/AddProduct";
import EditProduct from "./components/admin/products/EditProduct";
import DoctorResourceManager from "./components/admin/pages/DoctorResourceManager";
import DoctorResourceForm from "./components/admin/doctorResources/DoctorResourceForm";
import InquiryManager from "./components/admin/pages/InquiryManager";
import CategoryManager from "./components/admin/pages/CategoryManager";
import CategoryForm from "./components/admin/categories/CategoryForm";
import GlobalManager from "./components/admin/pages/GlobalManager";
import GalleryManager from "./components/admin/pages/GalleryManager";
import GalleryForm from "./components/admin/gallery/GalleryForm";
import CareerManager from "./components/admin/pages/CareerManager";
import CareerForm from "./components/admin/career/CareerForm";
import ExpertiseManager from "./components/admin/pages/ExpertiseManager";
import ExpertiseForm from "./components/admin/expertise/ExpertiseForm";
import AboutManager from "./components/admin/pages/AboutManager";
import HomeManager from "./components/admin/pages/HomeManager";
import ContactManager from "./components/admin/pages/ContactManager";

// Public Pages
import Home from "./pages/Home";
import CorporateProfile from "./components/about/corporate/CorporateProfile";
import ChairmanDesk from "./components/about/chairman/Chairman";
import Mission from "./components/about/mission/Mission";
import Certifications from "./components/about/certifications/Certifications";
import CoreTeam from "./components/about/coreTeam/CoreTeam";
import OurAssociates from "./components/about/associates/OurAssociates";
import Products from "./components/products/list/Products";
import ProductCategory from "./components/products/list/ProductCategory";
import ProductDetailPage from "./components/products/detail/ProductDetailPage";
import ProductDetails from "./components/products/detail/ProductDetails";
import QualityControl from "./components/infrastructure/qualityControl/QualityControl";
import OperationsPage from "./components/infrastructure/operations/OperationPage";
import RdFd from "./components/infrastructure/r&d/R&D";
import ForDoctorsHcps from "./components/doctorsHCP/DoctorsHCP";
import ThirdParty from "./components/expertise/thirdparty/ThirdParty";
import PCDFranchise from "./components/expertise/pcd-pharma/PCDFranchise";
import PharmaExporter from "./components/expertise/pharma-exporter/PharmaExporter";
import Gallery from "./components/gallery/Gallery";
import Contact from "./components/contact/Contact";
import Career from "./components/career/Career";
import ProductGallery from "./components/gallery/ProductGallery";
import ScrollToTop from "./components/shared/ScrollToTop";
import ScrollToTopButton from "./components/shared/ScrollToTopButton";

const Section = ({ title }) => (
  <div className="h-[70vh] flex items-center justify-center text-3xl font-semibold">
    web section: {title}
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <ScrollToTopButton />

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about/corporate-profile" element={<CorporateProfile />} />
          <Route path="/about/chairman-desk" element={<ChairmanDesk />} />
          <Route path="/about/mission" element={<Mission />} />
          <Route path="/about/certifications" element={<Certifications />} />
          <Route path="/about/core-team" element={<CoreTeam />} />
          <Route path="/about/associates" element={<OurAssociates />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:slug" element={<ProductDetailPage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/infrastructure/quality-control" element={<QualityControl />} />
          <Route path="/infrastructure/operations" element={<OperationsPage />} />
          <Route path="/infrastructure/rnd" element={<RdFd />} />
          <Route path="/doctors" element={<ForDoctorsHcps />} />
          <Route path="/services/third-party-manufacturing" element={<ThirdParty />} />
          <Route path="/services/pcd-pharma-franchise" element={<PCDFranchise />} />
          <Route path="/services/pharmaceutical-exporter" element={<PharmaExporter />} />
          <Route path="/products/cardiac" element={<Section title="Cardiac Products" />} />
          <Route path="/infrastructure" element={<Section title="Infrastructure" />} />
          <Route path="/hcp" element={<Section title="Doctors / HCPs" />} />
          <Route path="/events" element={<Section title="Events" />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/product-gallery" element={<ProductGallery />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />

            <Route path="categories" element={<CategoryManager />} />
            <Route path="categories/add" element={<CategoryForm />} />
            <Route path="categories/edit/:id" element={<CategoryForm />} />


            <Route path="doctor-resources" element={<DoctorResourceManager />} />
            <Route path="doctor-resources/add" element={<DoctorResourceForm />} />
            <Route path="doctor-resources/edit/:id" element={<DoctorResourceForm />} />

            <Route path="inquiries" element={<InquiryManager />} />

            <Route path="global" element={<GlobalManager />} />
            <Route path="home" element={<HomeManager />} />

            <Route path="gallery" element={<GalleryManager />} />
            <Route path="gallery/add" element={<GalleryForm />} />
            <Route path="gallery/edit/:id" element={<GalleryForm />} />

            <Route path="career" element={<CareerManager />} />
            <Route path="career/add" element={<CareerForm />} />
            <Route path="career/edit/:id" element={<CareerForm />} />

            <Route path="expertise" element={<ExpertiseManager />} />
            <Route path="expertise/add" element={<ExpertiseForm />} />
            <Route path="expertise/edit/:id" element={<ExpertiseForm />} />

            <Route path="about" element={<AboutManager />} />
            <Route path="contact" element={<ContactManager />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
