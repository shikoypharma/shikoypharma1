import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ProductSegmentCard({ segment, index }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-l-4 border-blue-600 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="h-40 sm:h-48 overflow-hidden bg-gray-100">
          <img
            src={segment.image}
            alt={segment.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-center text-blue-700">
            {segment.name}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-600 leading-relaxed">
            {segment.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
