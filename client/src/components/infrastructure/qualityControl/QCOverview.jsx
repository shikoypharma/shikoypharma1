import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function QCOverview({ data }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-16"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.highlights.map((highlight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Card className="p-6 h-full border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-3">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">
                  {highlight.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
