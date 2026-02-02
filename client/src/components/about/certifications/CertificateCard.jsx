import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CertificateCard({ certificate, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="border-l-4 border-blue-600 shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden flex flex-col">
        {certificate.image && (
          <div className="h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-100">
            <img
              src={certificate.image}
              alt={certificate.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-4 lg:p-6 grow flex flex-col justify-center">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
            {certificate.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {certificate.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
