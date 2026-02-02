import { FOOTER_DATA } from "@/data/layout/footer.data";
import { motion } from "framer-motion";
import FooterSection from "./FooterSection";
import FooterContact from "./FooterContact";
import FooterAddress from "./FooterAddress";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <FooterSection title="Our Products" items={FOOTER_DATA.products} />
          <FooterSection title="Quick Links" items={FOOTER_DATA.quickLinks} />
          <FooterContact contact={FOOTER_DATA.contact} />
          <FooterAddress addresses={FOOTER_DATA.addresses} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mt-8 text-center"
        >
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Lifecare Neuro Products Ltd. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
