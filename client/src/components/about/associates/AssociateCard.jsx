import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AssociateCard({ associate, index }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="border-l-4 border-blue-600 shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden flex flex-col">
        {associate.image && (
          <div className="h-32 sm:h-40 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
            <img
              src={associate.image}
              alt={associate.name}
              className="max-w-[90%] max-h-[90%] object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-4 text-center grow flex flex-col justify-center">
          <h3 className="text-base lg:text-lg font-semibold text-blue-700 mb-2">
            {associate.name}
          </h3>
          <p className="text-xs lg:text-sm text-gray-500 font-medium">
            {associate.type}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
