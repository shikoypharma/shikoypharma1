import { useState, useEffect } from "react";
import axios from "axios";
import { FOOTER_DATA } from "@/data/layout/footer.data";
import { motion } from "framer-motion";
import FooterSection from "./FooterSection";
import FooterContact from "./FooterContact";
import FooterAddress from "./FooterAddress";

export default function Footer() {
  const [footerData, setFooterData] = useState(FOOTER_DATA);
  const [copyrightText, setCopyrightText] = useState("");
  const [productLinks, setProductLinks] = useState([]);

  useEffect(() => {
    // Fetch product categories for "Our Products" section
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/product-categories");
        if (data?.length) {
          setProductLinks(data.map(cat => ({
            label: cat.name,
            href: `/products/${cat.slug}`
          })));
        }
      } catch (err) {
        // Fallback — no product links
      }
    };

    const fetchFooter = async () => {
      try {
        const { data } = await axios.get("/api/global");
        if (data?.footer) {
          setFooterData(prev => ({
            ...prev,
            quickLinks: data.footer.quickLinks?.length ? data.footer.quickLinks : FOOTER_DATA.quickLinks,
            contact: {
              phones: data.footer.contact?.phones?.length ? data.footer.contact.phones : FOOTER_DATA.contact.phones,
              emails: {
                domestic: data.footer.contact?.emails?.domestic || FOOTER_DATA.contact.emails.domestic,
                export: data.footer.contact?.emails?.export || FOOTER_DATA.contact.emails.export,
              },
            },
            addresses: {
              manufacturing: data.footer.addresses?.manufacturing || FOOTER_DATA.addresses.manufacturing,
              corporate: data.footer.addresses?.corporate || FOOTER_DATA.addresses.corporate,
            },
          }));
          if (data.footer.copyrightText) {
            setCopyrightText(data.footer.copyrightText);
          }
        }
      } catch (err) {
        // Fallback to static data
      }
    };

    fetchCategories();
    fetchFooter();
  }, []);

  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <FooterSection title="Our Products" items={productLinks.length ? productLinks : footerData.products} />
          <FooterSection title="Quick Links" items={footerData.quickLinks} />
          <FooterContact contact={footerData.contact} />
          <FooterAddress addresses={footerData.addresses} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mt-8 text-center"
        >
          <p className="text-sm text-gray-400">
            {copyrightText || `© ${new Date().getFullYear()} Lifecare Neuro Products Ltd. All rights reserved.`}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
