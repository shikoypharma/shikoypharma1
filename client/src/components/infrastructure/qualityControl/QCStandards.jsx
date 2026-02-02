import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function QCStandards({ standards }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-16"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Quality Standards & Certifications
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We adhere to international quality standards and certifications
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((standard, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <Card className="p-6 h-full bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {standard.name}
                </h3>
                <p className="text-sm font-semibold text-blue-700 mb-3">
                  {standard.description}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {standard.details}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
