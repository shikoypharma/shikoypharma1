import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/navbar/Navbar.jsx";
import TopBar from "./components/layout/topstrip/Topbar";
import Home from "./pages/Home";
import Footer from "./components/layout/footer/Footer";
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
    <>
      <ScrollToTop />
      <ScrollToTopButton />

      <TopBar />
      <Navbar />

      <Routes>
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
      </Routes>
      <Footer />
    </>
  );
}
