import About from "@/components/home/about/About";
import Hero from "@/components/home/hero/Hero";
import OurAssociates from "@/components/home/associates/OurAssociates";
import Services from "@/components/home/services/Services";
import ProductSegments from "@/components/home/products/Products";
import ProductRangeSlider from "@/components/home/products/ProductsRangeSlider";
import Certifications from "@/components/home/certificate/Certificate";
import GlobalPresence from "@/components/home/globalpresence/GlobalPresence";

export default function Home() {
  return (
    <>
      <Hero />
      <About/>
      <OurAssociates />
      <Services />
      <ProductSegments /> 
      <ProductRangeSlider/>
      <Certifications/>
      <GlobalPresence/>
    </>
  );
}
