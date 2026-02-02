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

const Section = ({ title }) => (

  <div className="h-[70vh] flex items-center justify-center text-3xl font-semibold">
    web section: {title}
  </div>
);

export default function App() {
  return (
    <>

      <TopBar/>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about/corporate-profile" element={<CorporateProfile/>} />
        <Route path="/about/chairman-desk" element={<ChairmanDesk/>} />
        <Route path="/about/mission" element={<Mission/>} />
        <Route path="/about/certifications" element={<Certifications/>} />
        <Route path="/about/core-team" element={<CoreTeam/>} />
        <Route path="/about/associates" element={<OurAssociates/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:category" element={<ProductCategory/>} />
        <Route path="/products/:category/:slug" element={<ProductDetailPage/>} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/infrastructure/quality-control" element={<QualityControl/>} />
        <Route path="/products/cardiac" element={<Section title="Cardiac Products" />} />
        <Route path="/infrastructure" element={<Section title="Infrastructure" />} />
        <Route path="/hcp" element={<Section title="Doctors / HCPs" />} />
        <Route path="/events" element={<Section title="Events" />} />
        <Route path="/gallery" element={<Section title="Gallery" />} />
        <Route path="/contact" element={<Section title="Contact" />} />
      </Routes>
      <Footer/>
    </>
  );
}
