import { CERTIFICATIONS_DATA } from "@/data/about/certifications.data";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { motion } from "framer-motion";
import CertificateCard from "./CertificateCard";

export default function Certifications() {
  const { certifications } = CERTIFICATIONS_DATA;

  return (
    <PageLayout title="Certifications">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 lg:p-6 bg-blue-50 rounded-lg"
      >
        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
          {CERTIFICATIONS_DATA.description}
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications?.map((cert, index) => (
          <CertificateCard key={index} certificate={cert} index={index} />
        ))}
      </div>
    </PageLayout>
  );
}
